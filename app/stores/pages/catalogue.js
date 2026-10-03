import { useAuthStore } from "~/stores/common/auth";

export const useCatalogueStore = defineStore("catalogueStore", () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Featured Movies
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

  //Now Playing Movies
  const nowPlayngMovies = ref([]);
  const nowPlayngLoading = ref(false);
  const nowPlayngError = ref(null);

  async function fetchNowPlayingMovies() {
    nowPlayngLoading.value = true;
    nowPlayngError.value = null;
    try {
      const res = await $fetch("/movies/now-playing", {
        baseURL: config.public.apiBase,
      });
      nowPlayngMovies.value = res.data;
    } catch (e) {
      nowPlayngError.value =
        e?.data?.message ?? "Failed to load featured movies";
    } finally {
      nowPlayngLoading.value = false;
    }
  }

  //Coming Soon Movies
  const comingSoonMovies = ref([]);
  const comingSoonLoading = ref(false);
  const comingSoonError = ref(null);

  async function fetchComingSoonMovies() {
    comingSoonLoading.value = true;
    comingSoonError.value = null;
    try {
      const res = await $fetch("/movies/now-playing", {
        baseURL: config.public.apiBase,
      });
      comingSoonMovies.value = res.data;
    } catch (e) {
      comingSoonError.value =
        e?.data?.message ?? "Failed to load featured movies";
    } finally {
      comingSoonLoading.value = false;
    }
  }

  //notify me
  const notifyMovie = (slug) =>
    authStore.call(`/movies/${slug}/notify`, { method: "POST" });

  return {
    featuredMovies,
    featuredLoading,
    featuredError,
    fetchFeaturedMovies,
    nowPlayngMovies,
    nowPlayngLoading,
    nowPlayngError,
    fetchNowPlayingMovies,
    comingSoonMovies,
    comingSoonLoading,
    comingSoonError,
    fetchComingSoonMovies,
    notifyMovie,
  };
});
