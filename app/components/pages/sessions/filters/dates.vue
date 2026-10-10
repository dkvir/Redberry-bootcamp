<template>
  <ul class="list flex-start align-center">
    <li
      v-for="date in dates"
      :key="date"
      :class="[
        'date flex-center flex-column',
        { 'is-active': date === selectedDate },
      ]"
      @click="emit('selectDate', date)"
    >
      <p class="weekday f-label-s">{{ formatDate(date).weekday }}</p>
      <p class="day f-label-s">{{ formatDate(date).day }}</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  selectedDate: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["selectDate"]);

const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);

  return toDateString(date);
});

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
.list {
  gap: 6px;
  flex-wrap: nowrap;
  margin-top: 12px;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .date {
    gap: 6px;
    padding: 11px 6px;
    width: 40px;
    background-color: var(--date-bg, var(--color-bg-raised));
    border-radius: 8px;
    color: var(--color-text-primary);
    cursor: pointer;
    @include default-transitions(background-color);

    &.is-active {
      --date-bg: var(--color-red);
    }
  }
}
</style>
