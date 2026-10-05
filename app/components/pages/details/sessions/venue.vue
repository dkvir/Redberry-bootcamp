<template>
  <div class="venue flex-column">
    <h3 class="title f-button">
      {{ theater.venue.name }}
    </h3>

    <ul class="halls flex-start align-center">
      <li
        v-for="item in theater.halls"
        :key="item.hall.id"
        class="hall flex-column"
      >
        <p class="name">Hall {{ item.hall.name }}</p>

        <pages-details-sessions-tickets :item="item" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  theater: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.venue {
  margin-top: 27px;
  gap: 12px;

  .title {
    color: var(--color-text-primary);
  }

  .halls {
    gap: 14px;
    flex-wrap: wrap;
  }

  .hall {
    height: 140px;
    gap: 9px;
    padding: 15px;
    background-color: var(--color-bg-card);
    border-radius: 18px;
  }
}
</style>
