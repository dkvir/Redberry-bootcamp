<template>
  <ul class="dates flex-start align-center">
    <li
      v-for="date in dates"
      :key="date"
      :class="[
        'date flex-center flex-column',
        {
          'is-active': date === selected,
        },
      ]"
      @click="selected = date"
    >
      <p class="weekday f-label-s">{{ formatDate(date).weekday }}</p>
      <p class="day f-h3">{{ formatDate(date).day }}</p>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  dates: { type: Array, required: true },
});

const selected = defineModel();

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return {
    weekday: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date),
    day: date.getDate(),
  };
};
</script>

<style lang="scss" scoped>
.dates {
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 14px;

  .date {
    gap: 6px;
    padding: 20px var(--date-horizontal-padding, 28px);
    background-color: var(--date-bg, var(--color-bg-card));
    border-radius: 16px;
    color: var(--color-text-primary);
    border: 2px solid var(--date-stroke, transparent);
    cursor: pointer;
    @include default-transitions(background-color, padding, border);

    &.is-active {
      --date-horizontal-padding: 42px;
      --date-bg: var(--color-red);
    }

    &:not(.is-active):hover {
      --date-stroke: var(--color-bg-raised);
    }
  }
}
</style>
