export const useCatalogueStore = defineStore("sessionsCatalogueStore", () => {
  const config = useRuntimeConfig();

  const groups = ref([]);
  const meta = ref(null);
  const loading = ref(false);
  const error = ref(null);

  let requestId = 0;

  async function fetchSessions(query) {
    const id = ++requestId;
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch("/sessions", {
        baseURL: config.public.apiBase,
        query,
      });
      if (id !== requestId) return null;
      groups.value = res.data;
      meta.value = res.meta;
      return res;
    } catch (e) {
      if (id !== requestId) return null;
      error.value = e;
      return null;
    } finally {
      if (id === requestId) loading.value = false;
    }
  }

  const totalSessions = computed(() => meta.value?.totalSessions ?? 0);
  const totalMovies = computed(() => meta.value?.totalMovies ?? 0);
  const lastPage = computed(() => meta.value?.lastPage ?? 1);

  return {
    groups,
    meta,
    loading,
    error,
    totalSessions,
    totalMovies,
    lastPage,
    fetchSessions,
  };
});
