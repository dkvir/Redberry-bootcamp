<template>
  <div class="tickets-list">
    <ul v-if="selectedSeats.length > 0" class="list flex-column">
      <li v-for="item in selectedSeats" :key="item.seat.id" class="item">
        <pages-details-buy-ticket-selected-ticket :item="item" />
      </li>
    </ul>

    <div v-else class="pick-text f-body-s">
      Pick up to 3 seats from the map. Each seat can carry its own ticket type.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedSeats: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.list {
  gap: 12px;
}

.pick-text {
  color: var(--color-text-secondary);
}
</style>
