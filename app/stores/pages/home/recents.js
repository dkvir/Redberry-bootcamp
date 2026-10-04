const KEY = "recentlyViewedMovies";
const MAX = 5;

export const useRecentsStore = defineStore("recentsStore", () => {
  const movies = ref([]);

  function read() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function load() {
    movies.value = read();
  }

  function add(movie) {
    const entry = {
      slug: movie.slug,
      title: movie.title,
      poster: movie.posterUrl,
      genre: movie.genres?.[0]?.name ?? null,
      duration: movie.runtimeMinutes,
      age: movie.ageRating?.code ?? null,
    };

    movies.value = [
      entry,
      ...read().filter((m) => m.slug !== entry.slug),
    ].slice(0, MAX);

    localStorage.setItem(KEY, JSON.stringify(movies.value));
  }

  return { movies, load, add };
});
