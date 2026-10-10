<template>
  <nuxt-link :to="`/sessions/${item.movie.slug}`" class="movie flex">
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
          :red="item.movie.ageRating.minAge"
        />
      </div>
      <div class="duration f-body-m">{{ item.movie.runtimeMinutes }} min</div>
    </div>
  </nuxt-link>
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
  width: fit-content;

  &:hover {
    --image-scale: 1.1;
    --title-color: var(--color-text-secondary);
  }

  .poster {
    width: 56px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    .img {
      @include size(100%);
      object-fit: cover;
      transform: scale(var(--image-scale, 1));
      @include default-transitions(transform);
    }
  }

  .info {
    gap: 12px;

    &-header {
      gap: 12px;

      .title {
        color: var(--title-color, var(--color-text-primary));
        @include default-transitions(color);
      }
    }
    .duration {
      color: var(--color-text-secondary);
    }
  }
}
</style>
