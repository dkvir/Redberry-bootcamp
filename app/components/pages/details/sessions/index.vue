<template>
  <section class="sessions flex-start">
    <pages-details-sessions-info
      :sessions-by-date="detailsStore.sessionsByDate"
      :movie="movie"
    />
    <pages-details-sessions-movie-details :movie="movie" />
  </section>
</template>

<script setup>
import { useDetailsStore } from "~/stores/pages/details";

const props = defineProps({
  movie: { type: Object, required: true },
});

const route = useRoute();
const detailsStore = useDetailsStore();

const availableDates = computed(() => props.movie.availableDates ?? []);

await useAsyncData(
  () => `movie-sessions-${route.params.slug}`,
  async () => {
    if (!availableDates.value.length) return {};
    await detailsStore.fetchSessions(route.params.slug, availableDates.value);
    return detailsStore.sessionsByDate;
  },
  { watch: [() => route.params.slug] },
);
</script>

<style lang="scss" scoped>
.sessions {
  padding: 34px 51px;
  gap: 10px;
  width: 100%;
  min-height: 70vh;
}
</style>
