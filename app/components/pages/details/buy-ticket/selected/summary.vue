<template>
  <div class="summary">
    <div class="header flex-column">
      <h2 class="title f-button">{{ title }}</h2>
      <p class="subtitle f-body-s">
        Hall {{ session.hall.name }} · {{ formatDate(session.date) }} ·
        {{ session.time }}
      </p>
    </div>
    <div class="seats info-box flex-center justify-between">
      <div class="label f-body-s">Seats</div>
      <div class="value f-label-s">{{ seatCodes }}</div>
    </div>
    <div class="tickets info-box flex-center justify-between">
      <div class="label f-body-s">Tickets</div>
      <div class="value f-body-s">{{ ticketsSummary }}</div>
    </div>
  </div>
</template>

<script setup>
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  selectedSeats: {
    type: Array,
    required: true,
  },
});

const seatsStore = useSeatsStore();

const seatCodes = computed(() =>
  props.selectedSeats.map((item) => item.seat.code).join(", "),
);

const ticketsSummary = computed(() =>
  seatsStore.TICKET_TYPES.map((type) => ({
    label: type.label,
    count: props.selectedSeats.filter((item) => item.ticketType === type.key)
      .length,
  }))
    .filter((t) => t.count > 0)
    .map((t) => `${t.count} x ${t.label}`)
    .join(", "),
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
</script>

<style lang="scss" scoped>
.summary {
  padding: 16px;
  background-color: var(--color-bg-card);
  border-radius: 12px;

  .header {
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-bg-raised);
  }
  .title {
    color: var(--color-text-primary);
  }

  .subtitle {
    margin-top: 8px;
    color: var(--color-text-secondary);
  }
  .info-box {
    margin-top: 10px;
  }

  .label {
    color: var(--color-text-secondary);
  }

  .value {
    color: var(--color-text-primary);
  }
}
</style>
