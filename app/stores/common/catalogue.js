export const useCatalogueStore = defineStore("catalogueStore", () => {
  const config = useRuntimeConfig();

  const featuredMovies = ref([]);
  const featuredLoading = ref(false);
  const featuredError = ref(null);

  async function fetchFeaturedMovies() {
    featuredLoading.value = true;
    featuredError.value = null;
    try {
      const res = await $fetch("/movies/featured", {
        baseURL: config.public.apiBase,
      });
      featuredMovies.value = res.data;
    } catch (e) {
      featuredError.value =
        e?.data?.message ?? "Failed to load featured movies";
    } finally {
      featuredLoading.value = false;
    }
  }

  return {
    featuredMovies,
    featuredLoading,
    featuredError,
    fetchFeaturedMovies,
  };
});
