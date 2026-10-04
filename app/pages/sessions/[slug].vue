<template>
  <div class="movie-details-page">
    <div v-if="detailsStore.movie" class="movie-details-page">
      <pages-details-overview :movie="detailsStore.movie" />

      <section class="sessions flex-start">
        <pages-details-sessions-info :movie="detailsStore.movie" />
        <pages-details-sessions-movie-details :movie="detailsStore.movie" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDetailsStore } from "~/stores/pages/details";
import { useRecentsStore } from "~/stores/pages/home/recents";

const route = useRoute();
const detailsStore = useDetailsStore();
const recentsStore = useRecentsStore();

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
}
</style>
