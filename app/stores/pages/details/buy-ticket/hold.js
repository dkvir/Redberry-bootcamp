import { useAuthStore } from "~/stores/common/auth";
import { useSeatsStore } from "./seats";

export const useHoldStore = defineStore("buyTicketHoldStore", () => {
  const authStore = useAuthStore();
  const seatsStore = useSeatsStore();

  const hold = ref(null);
  const holdLoading = ref(false);
  const holdError = ref(null);
  const conflictMessage = ref(null);
  const expiredVisibility = ref(false);
  const secondsLeft = ref(0);

  let countdownTimer = null;
  let activeSessionId = null;
  let expireCallback = null;

  const timeLeft = computed(() => {
    const m = Math.floor(secondsLeft.value / 60);
    const s = String(secondsLeft.value % 60).padStart(2, "0");
    return `${m}:${s}`;
  });

  const createHold = async (sessionId, onExpire) => {
    if (seatsStore.selectedSeats.length === 0 || holdLoading.value) {
      return false;
    }

    holdLoading.value = true;
    holdError.value = null;
    conflictMessage.value = null;

    try {
      const res = await authStore.call(`/sessions/${sessionId}/holds`, {
        method: "POST",
        body: {
          seats: seatsStore.selectedSeats.map((s) => ({
            seatId: s.seat.id,
            ticketType: s.ticketType,
          })),
        },
      });

      hold.value = res.data;
      activeSessionId = sessionId;
      expireCallback = onExpire;
      startCountdown(res.data.expiresAt);
      return true;
    } catch (err) {
      await handleError(err, sessionId);
      return false;
    } finally {
      holdLoading.value = false;
    }
  };

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
  };

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

  const stopCountdown = () => {
    clearInterval(countdownTimer);
    countdownTimer = null;
  };

  const onExpired = async () => {
    stopCountdown();
    hold.value = null;
    seatsStore.clearSelection();
    expiredVisibility.value = true;
    expireCallback?.();
    await seatsStore.fetchSeats(activeSessionId);
  };

  const dismissExpired = () => {
    expiredVisibility.value = false;
  };

  const dismissMessages = () => {
    holdError.value = null;
    conflictMessage.value = null;
  };

  const reset = () => {
    stopCountdown();
    hold.value = null;
    holdError.value = null;
    conflictMessage.value = null;
    expiredVisibility.value = false;
    secondsLeft.value = 0;
  };

  return {
    hold,
    holdLoading,
    holdError,
    conflictMessage,
    expiredVisibility,
    secondsLeft,
    timeLeft,
    createHold,
    stopCountdown,
    dismissExpired,
    dismissMessages,
    reset,
  };
});
