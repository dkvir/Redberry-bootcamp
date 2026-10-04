export const useDetailsStore = defineStore("detailsStore", () => {
  const config = useRuntimeConfig();

  const movie = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const notFound = ref(false);

  async function fetchMovie(slug) {
    loading.value = true;
    error.value = null;
    notFound.value = false;
    movie.value = null;

    try {
      const res = await $fetch(`/movies/${slug}`, {
        baseURL: config.public.apiBase,
      });
      movie.value = res.data;
    } catch (e) {
      if (e?.statusCode === 404 || e?.status === 404) {
        notFound.value = true;
      } else {
        error.value = e?.data?.message ?? "Failed to load movie";
      }
    } finally {
      loading.value = false;
    }
  }

  return { movie, loading, error, notFound, fetchMovie };
});
