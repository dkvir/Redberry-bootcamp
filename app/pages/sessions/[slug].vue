<template>
  <div class="movie-details-page">
    <div v-if="detailsStore.movie" class="movie-details-page">
      <pages-details-overview :movie="detailsStore.movie" />

      <div v-if="!canBuy" class="age-control f-h2">
        This film is rated {{ detailsStore.movie.ageRating.code }}. You cannot
        buy tickets for it with this account.
      </div>
      <section class="sessions flex-start">
        <pages-details-sessions-info
          :movie="detailsStore.movie"
          :disabled="!canBuy"
        />
        <pages-details-sessions-movie-details :movie="detailsStore.movie" />
      </section>

      <pages-details-buy-ticket v-if="buyTicketStore.isOpen" />
    </div>
  </div>
</template>

<script setup>
import { useMovieDetailsStore } from "~/stores/pages/details/movie-details";
import { useRecentsStore } from "~/stores/pages/home/recents";
import { useAuthStore } from "~/stores/common/auth";
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";

const route = useRoute();
const detailsStore = useMovieDetailsStore();
const recentsStore = useRecentsStore();
const authStore = useAuthStore();
const buyTicketStore = useBuyTicketStore();

await useAsyncData(
  () => `movie-${route.params.slug}`,
  async () => {
    await detailsStore.fetchMovie(route.params.slug);
    return detailsStore.movie;
  },
  { watch: [() => route.params.slug] },
);

if (detailsStore.notFound) {
  throw createError({
    statusCode: 404,
    statusMessage: "Movie not found",
    fatal: true,
  });
}

const canBuy = computed(() => {
  if (!authStore.isLoggedIn) return true;

  const minAge = detailsStore.movie?.ageRating?.minAge ?? 0;
  if (!minAge) return true;

  return authStore.age != null && authStore.age >= minAge;
});

onMounted(() => {
  watch(
    () => detailsStore.movie,
    (movie) => {
      if (movie) recentsStore.add(movie);
    },
    { immediate: true },
  );
});
</script>

<style lang="scss" scoped>
.movie-details-page {
  width: 100%;
  min-height: 100vh;

  .sessions {
    padding: 34px 51px;
    gap: 10px;
    width: 100%;
    min-height: 70vh;
  }

  .age-control {
    padding: 34px 0 0 51px;
    color: var(--color-red);
  }

  .is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
