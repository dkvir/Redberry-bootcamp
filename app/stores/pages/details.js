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

  // sessions
  const sessionsByDate = ref({});
  const sessionsLoading = ref(false);
  const sessionsError = ref(null);

  async function fetchSessions(slug, dates) {
    sessionsLoading.value = true;
    sessionsError.value = null;
    sessionsByDate.value = {};

    try {
      const responses = await Promise.all(
        dates.map((date) =>
          $fetch(`/movies/${slug}/sessions`, {
            baseURL: config.public.apiBase,
            query: { date },
          }),
        ),
      );

      sessionsByDate.value = Object.fromEntries(
        dates.map((date, i) => [date, responses[i].data]),
      );
    } catch (e) {
      sessionsError.value = e?.data?.message ?? "Failed to load sessions";
    } finally {
      sessionsLoading.value = false;
    }
  }

  return {
    movie,
    loading,
    error,
    notFound,
    fetchMovie,
    sessionsByDate,
    sessionsLoading,
    sessionsError,
    fetchSessions,
  };
});
