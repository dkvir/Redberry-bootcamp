import { useSeatsStore } from "./seats";
import { useHoldStore } from "./hold";

export const useBuyTicketStore = defineStore("buyTicketStore", () => {
  const seatsStore = useSeatsStore();
  const holdStore = useHoldStore();

  const isOpen = ref(false);
  const selectedSession = ref(null);
  const activeStep = ref(1);

  const open = async (session) => {
    holdStore.reset();
    seatsStore.reset();
    selectedSession.value = session;
    activeStep.value = 1;
    isOpen.value = true;

    await seatsStore.fetchSeats(session.id);
  };

  const close = () => {
    holdStore.stopCountdown();
    isOpen.value = false;
  };

  const setSession = (session) => {
    selectedSession.value = session;
  };

  const moveToSecondStep = async () => {
    const session = selectedSession.value;
    if (!session || seatsStore.selectedSeats.length === 0) return;

    const ok = await holdStore.createHold(session.id, () => {
      activeStep.value = 1;
    });

    if (ok) activeStep.value = 2;
  };

  return {
    isOpen,
    selectedSession,
    activeStep,
    open,
    close,
    setSession,
    moveToSecondStep,
  };
});
