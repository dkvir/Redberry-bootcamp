<template>
  <div class="movie flex">
    <div class="poster">
      <img :src="item.movie.posterUrl" :alt="item.movie.title" class="img" />
    </div>
    <div class="info flex-column">
      <div class="info-header flex align-center">
        <h2 class="title f-h3">
          {{ item.movie.title }}
        </h2>
        <tiny-chip
          :label="item.movie.ageRating.code"
          :red="item.movie.ageRating.code !== 'PG'"
        />
      </div>
      <div class="duration f-body-m">{{ item.movie.runtimeMinutes }} min</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.movie {
  gap: 16px;

  .poster {
    width: 56px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    gap: 12px;

    &-header {
      gap: 12px;

      .title {
        color: var(--color-text-primary);
      }
    }
    .duration {
      color: var(--color-text-secondary);
    }
  }
}
</style>
