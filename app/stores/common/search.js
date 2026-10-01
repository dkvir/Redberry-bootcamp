export const useSearchStore = defineStore("searchStore", () => {
  const config = useRuntimeConfig();

  const term = ref("");
  const results = ref([]);
  const status = ref("idle");
  const isOpen = ref(false);

  let timer = null;
  let controller = null;

  const trimmed = computed(() => term.value.trim());

  const showFocused = computed(() => isOpen.value && !trimmed.value);
  const showResults = computed(
    () => isOpen.value && !!trimmed.value && results.value.length > 0,
  );
  const showNotFound = computed(
    () =>
      isOpen.value &&
      !!trimmed.value &&
      status.value === "success" &&
      results.value.length === 0,
  );
  const isVisible = computed(
    () => showFocused.value || showResults.value || showNotFound.value,
  );

  async function fetchResults(q) {
    controller?.abort();
    const ctrl = new AbortController();
    controller = ctrl;

    try {
      const res = await $fetch("/search", {
        baseURL: config.public.apiBase,
        query: { q },
        signal: ctrl.signal,
      });
      results.value = res.data;
      status.value = "success";
    } catch (e) {
      if (ctrl.signal.aborted) return;
      status.value = "error";
    }
  }

  function setTerm(value) {
    term.value = value;
    isOpen.value = true;
    clearTimeout(timer);

    const q = value.trim();
    if (!q) {
      controller?.abort();
      results.value = [];
      status.value = "idle";
      return;
    }

    status.value = "loading";
    timer = setTimeout(() => fetchResults(q), 300);
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function clear() {
    clearTimeout(timer);
    controller?.abort();
    term.value = "";
    results.value = [];
    status.value = "idle";
  }

  return {
    term,
    results,
    status,
    isOpen,
    showFocused,
    showResults,
    showNotFound,
    isVisible,
    setTerm,
    open,
    close,
    clear,
  };
});
