import { useAuthStore } from "~/stores/common/auth";
import { useSeatsStore } from "./seats";

const STORAGE_KEY = "kinoxii:holds";

const readAll = () => {
  if (!import.meta.client) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const writeAll = (map) => {
  if (!import.meta.client) return;
  if (Object.keys(map).length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const saveHoldId = (sessionId, holdId) =>
  writeAll({ ...readAll(), [sessionId]: holdId });

const removeHoldId = (sessionId) => {
  const map = readAll();
  delete map[sessionId];
  writeAll(map);
};

export const useHoldStore = defineStore("buyTicketHoldStore", () => {
  const authStore = useAuthStore();
  const seatsStore = useSeatsStore();

  const hold = ref(null);
  const holdLoading = ref(false);
  const holdError = ref(null);
  const conflictMessage = ref(null);
  const expiredVisibility = ref(false);
  const secondsLeft = ref(0);

  let messageTimer = null;
  let countdownTimer = null;
  let activeSessionId = null;
  let expireCallback = null;

  const timeLeft = computed(() => {
    const m = Math.floor(secondsLeft.value / 60);
    const s = String(secondsLeft.value % 60).padStart(2, "0");
    return `${m}:${s}`;
  });

  // returns true when a live hold was created
  const createHold = async (session, onExpire) => {
    if (seatsStore.selectedSeats.length === 0 || holdLoading.value) {
      return false;
    }

    holdLoading.value = true;
    holdError.value = null;
    conflictMessage.value = null;

    try {
      const res = await authStore.call(`/sessions/${session.id}/holds`, {
        method: "POST",
        body: {
          seats: seatsStore.selectedSeats.map((s) => ({
            seatId: s.seat.id,
            ticketType: s.ticketType,
          })),
        },
      });

      hold.value = res.data;
      activeSessionId = session.id;
      expireCallback = onExpire;
      startCountdown(res.data.expiresAt);

      if (secondsLeft.value > 0) saveHoldId(session.id, res.data.holdId);

      return secondsLeft.value > 0;
    } catch (err) {
      await handleError(err, session.id);
      return false;
    } finally {
      holdLoading.value = false;
    }
  };

  // returns true when a live hold for this session was restored
  const restore = async (sessionId, onExpire) => {
    const holdId = readAll()[sessionId];
    if (!holdId) return false;

    try {
      const res = await authStore.call(`/holds/${holdId}`);
      const data = res.data;

      if (!data.isLive || data.sessionId !== sessionId) {
        removeHoldId(sessionId);
        if (!data.isLive) expiredVisibility.value = true;
        return false;
      }

      hold.value = data;
      activeSessionId = sessionId;
      expireCallback = onExpire;
      startCountdown(data.expiresAt);

      return secondsLeft.value > 0;
    } catch (err) {
      const status = err.status ?? err.response?.status;
      if (status === 404 || status === 403) removeHoldId(sessionId);
      return false;
    }
  };

  // errors
  const handleError = async (err, sessionId) => {
    const status = err.status ?? err.response?.status;
    const body = err.data ?? err.response?._data ?? {};

    if (status === 409) {
      const codes = body.contested ?? [];
      const plural = codes.length > 1;
      conflictMessage.value = `Seat${plural ? "s" : ""} ${codes.join(", ")} ${
        plural ? "were" : "was"
      } just taken by someone else.`;

      seatsStore.releaseContested(codes);
      await seatsStore.fetchSeats(sessionId);
    } else if (status === 422) {
      holdError.value =
        body.message ?? "Could not hold your seats. Please try again.";
    } else if (status !== 401) {
      holdError.value = "Something went wrong. Please try again.";
    }

    if (holdError.value || conflictMessage.value) scheduleMessageDismiss();
  };

  // countdown
  const startCountdown = (expiresAt) => {
    stopCountdown();
    const end = new Date(expiresAt).getTime();

    const tick = () => {
      secondsLeft.value = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      if (secondsLeft.value === 0) onExpired();
    };

    tick();
    if (secondsLeft.value > 0) countdownTimer = setInterval(tick, 1000);
  };

  const matchesSelection = () => {
    if (!hold.value) return false;

    const held = hold.value.seats;
    const selected = seatsStore.selectedSeats;
    if (held.length !== selected.length) return false;

    return selected.every((s) =>
      held.some(
        (h) => h.seatId === s.seat.id && h.ticketType.slug === s.ticketType,
      ),
    );
  };

  const stopCountdown = () => {
    clearInterval(countdownTimer);
    countdownTimer = null;
  };

  const onExpired = async () => {
    stopCountdown();
    hold.value = null;
    removeHoldId(activeSessionId);
    seatsStore.clearSelection();
    expiredVisibility.value = true;
    expireCallback?.();
    await seatsStore.fetchSeats(activeSessionId);
  };

  // messages
  const dismissExpired = () => {
    expiredVisibility.value = false;
  };

  const dismissMessages = () => {
    clearTimeout(messageTimer);
    holdError.value = null;
    conflictMessage.value = null;
  };

  const scheduleMessageDismiss = () => {
    clearTimeout(messageTimer);
    messageTimer = setTimeout(dismissMessages, 5000);
  };

  const reset = () => {
    stopCountdown();
    clearTimeout(messageTimer);
    hold.value = null;
    holdError.value = null;
    conflictMessage.value = null;
    expiredVisibility.value = false;
    secondsLeft.value = 0;
  };

  const clearSaved = (sessionId = activeSessionId) => removeHoldId(sessionId);

  return {
    hold,
    holdLoading,
    holdError,
    conflictMessage,
    expiredVisibility,
    secondsLeft,
    timeLeft,
    createHold,
    restore,
    stopCountdown,
    matchesSelection,
    dismissExpired,
    dismissMessages,
    reset,
    clearSaved,
    onExpired,
    handleError,
  };
});
