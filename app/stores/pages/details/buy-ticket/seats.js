import { useAuthStore } from "~/stores/common/auth";
import { useMovieDetailsStore } from "~/stores/pages/details/movie-details";
import { useFiltersStore } from "~/stores/pages/sessions/filters";

export const useSeatsStore = defineStore("buyTicketSeatsStore", () => {
  const authStore = useAuthStore();
  const detailsStore = useMovieDetailsStore();
  const filterStore = useFiltersStore();

  const seatMap = ref(null);
  const seatsLoading = ref(false);
  const selectedSeats = ref([]);
  const alertVisibility = ref(false);

  let alertTimer = null;
  let latestSessionId = null;

  const TICKET_TYPES = [
    { key: "child", label: "Child", rate: 0.6 },
    { key: "student", label: "Student", rate: 0.75 },
    { key: "adult", label: "Adult", rate: 1 },
  ];

  const RATES = Object.fromEntries(TICKET_TYPES.map((t) => [t.key, t.rate]));

  const movie = computed(() => detailsStore.movie);

  const isChildBlocked = computed(
    () => (movie.value?.ageRating?.minAge ?? 0) >= 16,
  );

  const fetchSeats = async (sessionId) => {
    if (!sessionId) return;

    latestSessionId = sessionId;
    seatsLoading.value = true;
    try {
      const res = await authStore.call(`/sessions/${sessionId}/seats`);
      if (latestSessionId === sessionId) seatMap.value = res.data;
    } finally {
      seatsLoading.value = false;
    }
  };

  const toggleSelectedSeat = (seat) => {
    if (seat.isMine) return false;

    const index = selectedSeats.value.findIndex((s) => s.seat.id === seat.id);

    if (index !== -1) {
      selectedSeats.value.splice(index, 1);
      return;
    }

    if (seat.state !== "available" && !seat.isMine) return;

    if (selectedSeats.value.length >= filterStore.options.maxSeatsPerOrder) {
      showLimitAlert();
      return;
    }

    selectedSeats.value.push({ seat, ticketType: "adult" });
  };

  const applyHeld = (heldSeats) => {
    const byId = new Map();
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === "object") {
        if (node.id != null && "code" in node && "state" in node) {
          byId.set(node.id, node);
        }
        Object.values(node).forEach(walk);
      }
    };
    walk(seatMap.value);

    selectedSeats.value = heldSeats.map((h) => ({
      seat: byId.get(h.seatId) ?? { id: h.seatId, code: h.code, state: "held" },
      ticketType: h.ticketType.slug,
    }));
  };

  const seatPrice = (item) =>
    Math.round(
      Number(movie.value?.fromPrice ?? 0) * RATES[item.ticketType] * 100,
    ) / 100;

  const total = computed(
    () =>
      Math.round(
        selectedSeats.value.reduce((sum, s) => sum + seatPrice(s), 0) * 100,
      ) / 100,
  );

  const setTicketType = (id, type) => {
    if (type === "child" && isChildBlocked.value) return;
    const entry = selectedSeats.value.find((s) => s.seat.id === id);
    if (entry) entry.ticketType = type;
  };

  const showLimitAlert = () => {
    alertVisibility.value = true;
    clearTimeout(alertTimer);
    alertTimer = setTimeout(() => {
      alertVisibility.value = false;
    }, 1500);
  };

  const releaseContested = (codes) => {
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === "object") {
        if (codes.includes(node.code)) node.state = "sold";
        Object.values(node).forEach(walk);
      }
    };
    walk(seatMap.value);

    selectedSeats.value = selectedSeats.value.filter(
      (s) => !codes.includes(s.seat.code),
    );
  };

  const clearSelection = () => {
    selectedSeats.value = [];
  };

  const reset = () => {
    selectedSeats.value = [];
    seatMap.value = null;
  };
  return {
    seatMap,
    seatsLoading,
    selectedSeats,
    alertVisibility,
    fetchSeats,
    toggleSelectedSeat,
    applyHeld,
    setTicketType,
    releaseContested,
    clearSelection,
    reset,
    movie,
    isChildBlocked,
    seatPrice,
    total,
    TICKET_TYPES,
  };
});
