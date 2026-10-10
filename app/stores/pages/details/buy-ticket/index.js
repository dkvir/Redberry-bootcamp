import { useSeatsStore } from "./seats";
import { useHoldStore } from "./hold";
import { useAuthStore } from "~/stores/common/auth";

export const useBuyTicketStore = defineStore("buyTicketStore", () => {
  const seatsStore = useSeatsStore();
  const holdStore = useHoldStore();
  const authStore = useAuthStore();

  const isOpen = ref(false);
  const selectedSession = ref(null);
  const activeStep = ref(1);

  const orderLoading = ref(false);
  const orderError = ref(null);
  const order = ref(null);

  const {
    values,
    error,
    success,
    isValid,
    touch,
    touchAll,
    untouchAll,
    setServerErrors,
  } = useForm(
    {
      fullName: "",
      email: "",
      mobileNumber: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    {
      fullName: validateFullName,
      email: validateEmail,
      mobileNumber: validateMobile,
      cardNumber: validateCardNumber,
      expiry: validateExpiry,
      cvv: validateCvv,
    },
  );

  const resetForm = () => {
    Object.assign(values, {
      fullName: authStore.user?.fullName ?? "",
      email: authStore.user?.email ?? "",
      mobileNumber: authStore.user?.mobileNumber ?? "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    untouchAll();
  };

  const submitStepTwo = async () => {
    touchAll();
    if (!isValid.value || orderLoading.value) return false;

    const holdId = holdStore.hold?.holdId ?? holdStore.hold?.id;
    if (!holdId) return false;

    orderLoading.value = true;
    orderError.value = null;

    try {
      const res = await authStore.call("/orders", {
        method: "POST",
        body: {
          holdId,
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          mobileNumber: values.mobileNumber,
          cardNumber: values.cardNumber,
          expiry: values.expiry,
          cvv: values.cvv,
        },
      });

      order.value = res.data;

      holdStore.clearSaved(selectedSession.value.id);
      holdStore.reset();

      activeStep.value = 3;
      return true;
    } catch (err) {
      const status = err.status ?? err.response?.status;
      const body = err.data ?? err.response?._data ?? {};

      if (status === 422 && body.errors) {
        const leftover = setServerErrors(body.errors);
        orderError.value = leftover[0] ?? null;
      } else if (status === 422) {
        await holdStore.onExpired();
      } else if (status === 409) {
        await holdStore.handleError(err, selectedSession.value.id);
        activeStep.value = 1;
      } else if (status !== 401) {
        orderError.value = body.message ?? "Payment failed. Please try again.";
      }
      return false;
    } finally {
      orderLoading.value = false;
    }
  };

  const open = async (session) => {
    if (!authStore.isLoggedIn) {
      authStore.requireLogin(() => open(session));
      return;
    }

    holdStore.reset();
    seatsStore.reset();
    resetForm();
    order.value = null;
    orderError.value = null;
    selectedSession.value = session;
    activeStep.value = 1;
    isOpen.value = true;

    await seatsStore.fetchSeats(session.id);

    const held = await holdStore.restore(session.id, () => {
      activeStep.value = 1;
    });

    if (held && holdStore.hold) {
      seatsStore.applyHeld(holdStore.hold.seats);
    }
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

    if (holdStore.matchesSelection()) {
      activeStep.value = 2;
      return;
    }

    const ok = await holdStore.createHold(session, () => {
      activeStep.value = 1;
    });

    if (ok) activeStep.value = 2;
  };

  return {
    isOpen,
    selectedSession,
    activeStep,
    values,
    error,
    success,
    touch,
    orderLoading,
    orderError,
    order,
    open,
    close,
    setSession,
    moveToSecondStep,
    submitStepTwo,
  };
});
