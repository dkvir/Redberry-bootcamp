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
    <ul class="venue-list">
      <li v-for="(theater, index) in venueGroups" :key="index" class="venue">
        <pages-details-sessions-venue :theater="theater" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  sessionsByDate: { type: Object, required: true },
  movie: { type: Object, required: true },
});

const availableDates = computed(() => props.movie?.availableDates ?? []);

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
  () => props.sessionsByDate[selectedDate.value] ?? [],
);

const totalSessions = computed(() =>
  availableDates.value.reduce(
    (total, date) =>
      total +
      (props.sessionsByDate[date] ?? []).reduce(
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
}
</style>
