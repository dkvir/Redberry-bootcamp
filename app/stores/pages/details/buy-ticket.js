export const useBuyTicketStore = defineStore("buyTicketStore", () => {
  const isOpen = ref(false);
  const selectedSession = ref(null);

  const toggleVisibility = (state) => {
    isOpen.value = state;
  };

  const setSession = (session) => {
    selectedSession.value = session;
  };

  return {
    isOpen,
    selectedSession,
    toggleVisibility,
    setSession,
  };
});
