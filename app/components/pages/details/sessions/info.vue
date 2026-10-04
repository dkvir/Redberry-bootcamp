<template>
  <div class="sessions-info">
    <div class="header">
      <h2 class="title f-h2">Sessions</h2>
      <p class="subtitle f-body-s">
        {{ totalSessions }} sessions over the next
        {{ availableDates.length }} days
      </p>
    </div>
    <pages-details-sessions-dates
      v-model="selectedDate"
      :dates="availableDates"
    />
    <ul v-if="venueGroups.length > 0" class="venue-list">
      <li v-for="(theater, index) in venueGroups" :key="index" class="venue">
        <pages-details-sessions-venue :theater="theater" />
      </li>
    </ul>
    <div v-else class="no-sessions f-h2">
      There are no sessions on this date.
    </div>
  </div>
</template>

<script setup>
import { useDetailsStore } from "~/stores/pages/details";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const availableDates = computed(
  () => props.movie?.availableDates.slice(0, 7) ?? [],
);
const route = useRoute();
const detailsStore = useDetailsStore();

await useAsyncData(
  () => `movie-sessions-${route.params.slug}`,
  async () => {
    if (!availableDates.value.length) return {};
    await detailsStore.fetchSessions(route.params.slug, availableDates.value);
    return detailsStore.sessionsByDate;
  },
  { watch: [() => route.params.slug] },
);

const pickDefaultDate = (dates) => {
  const today = toLocalISODate(new Date());
  return dates.includes(today) ? today : (dates[0] ?? null);
};

const selectedDate = useState("details-selected-date", () =>
  pickDefaultDate(availableDates.value),
);

watch(
  availableDates,
  (dates) => {
    if (!dates.includes(selectedDate.value)) {
      selectedDate.value = pickDefaultDate(dates);
    }
  },
  { immediate: true },
);

const venueGroups = computed(
  () => detailsStore.sessionsByDate[selectedDate.value] ?? [],
);

const totalSessions = computed(() =>
  availableDates.value.reduce(
    (total, date) =>
      total +
      (detailsStore.sessionsByDate[date] ?? []).reduce(
        (sum, group) => sum + group.sessions.length,
        0,
      ),
    0,
  ),
);
</script>

<style lang="scss" scoped>
.sessions-info {
  width: 70%;

  .no-sessions {
    margin-top: 20px;
    color: var(--color-red);
  }
}
</style>
