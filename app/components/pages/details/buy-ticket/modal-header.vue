<template>
  <div class="modal-header flex-center justify-between">
    <div class="left-wrapper">
      <h2 class="title f-h2">{{ movie.title }}</h2>
      <p class="subtitle f-body-s">
        {{ session.venue.name }} · Hall {{ session.hall.name }} ·
        {{ formatDate(session.date) }} · {{ session.time }} ·
        {{ session.format.name }} ·
        {{ session.language.name }}
      </p>
    </div>
    <div class="held flex-center flex-column">
      <p class="label f-label-s">SEATS HELD</p>
      <p class="time f-button">7:48</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  session: {
    type: Object,
    required: true,
  },
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
</script>

<style lang="scss" scoped>
.modal-header {
  .title {
    color: var(--color-text-primary);
  }

  .subtitle {
    margin-top: 8px;
    color: var(--color-text-secondary);
  }

  .held {
    padding: 8px 14px;
    background-color: var(--color-bg-card);
    border-radius: 12px;
    gap: 2px;

    .label {
      color: var(--color-text-secondary);
    }

    .time {
      color: var(--color-text-primary);
    }
  }
}
</style>
