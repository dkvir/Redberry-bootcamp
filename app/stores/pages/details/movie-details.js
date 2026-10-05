export const useMovieDetailsStore = defineStore("movieDetailsStore", () => {
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
        dates.map((date, i) => [date, groupByHall(responses[i].data)]),
      );
    } catch (e) {
      sessionsError.value = e?.data?.message ?? "Failed to load sessions";
    } finally {
      sessionsLoading.value = false;
    }
  }

  function groupByHall(venues) {
    return venues.map(({ venue, sessions }) => {
      const halls = new Map();

      for (const session of sessions) {
        if (!halls.has(session.hall.id)) {
          halls.set(session.hall.id, { hall: session.hall, sessions: [] });
        }
        halls.get(session.hall.id).sessions.push(session);
      }

      return {
        venue,
        halls: [...halls.values()].map((h) => ({
          ...h,
          sessions: h.sessions.sort((a, b) =>
            a.startsAt.localeCompare(b.startsAt),
          ),
        })),
      };
    });
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
