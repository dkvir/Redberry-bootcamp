import { useAuthStore } from "~/stores/common/auth";

export const useBuyTicketStore = defineStore("buyTicketStore", () => {
  const isOpen = ref(false);
  const selectedSession = ref(null);
  const activeStep = ref(1);

  const authStore = useAuthStore();

  const open = async (session) => {
    selectedSession.value = session;
    selectedSeats.value = [];
    seatMap.value = null;
    activeStep.value = 1;
    isOpen.value = true;

    await fetchSeats();
  };

  const close = () => {
    isOpen.value = false;
  };

  const moveToSecondStep = () => {
    activeStep.value = 2;
  };

  const setSession = (session) => {
    selectedSession.value = session;
  };

  //seats
  const seatMap = ref(null);
  const seatsLoading = ref(false);

  const selectedSeats = ref([]);

  const alertVisibility = ref(false);
  let alertTimer = null;

  const fetchSeats = async () => {
    const session = selectedSession.value;
    if (!session) return;

    seatsLoading.value = true;
    try {
      const res = await authStore.call(`/sessions/${session.id}/seats`);
      if (selectedSession.value?.id === session.id) {
        seatMap.value = res.data;
      }
    } finally {
      seatsLoading.value = false;
    }
  };

  const toggleSelectedSeat = (seat) => {
    if (seat.state !== "available") return;

    const index = selectedSeats.value.findIndex((s) => s.seat.id === seat.id);

    if (index !== -1) {
      selectedSeats.value.splice(index, 1);
      return;
    }

    if (selectedSeats.value.length >= 3) {
      showLimitAlert();
      return;
    }

    selectedSeats.value.push({ seat, ticketType: "adult" });
  };

  const setTicketType = (id, type, minAge) => {
    if (type == "child" && minAge <= 16) return;
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

  return {
    isOpen,
    open,
    close,
    selectedSession,
    setSession,
    activeStep,
    moveToSecondStep,
    seatMap,
    seatsLoading,
    fetchSeats,
    selectedSeats,
    alertVisibility,
    toggleSelectedSeat,
    setTicketType,
  };
});
