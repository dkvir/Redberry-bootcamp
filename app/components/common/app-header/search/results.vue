<template>
  <div class="results flex-column justify-between">
    <div class="header flex-center justify-between">
      <p class="label f-overline">FILMS & EVENTS</p>
      <p class="count f-body-s">{{ results.length }} results</p>
    </div>
    <div class="scrollable-section">
      <ul class="list">
        <li
          v-for="(movie, index) in results"
          :key="index"
          class="movie flex-center justify-between"
        >
          <div class="poster">
            <img :src="movie.posterUrl" :alt="movie.title" class="img" />
          </div>
          <div class="info">
            <div class="info-left">
              <p class="title f-label-m">{{ movie.title }}</p>
              <p class="duration f-body-s">
                Film · {{ movie.ageRating.code }} ·
                {{ movie.runtimeMinutes }} min
              </p>
            </div>
            <p class="price f-label-m">from ₾{{ movie.fromPrice }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  results: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.results {
  width: 100%;
  height: 100%;
  flex: 1;
  display: none;

  &.is-visible {
    display: flex;
  }

  .header {
    color: var(--color-text-secondary);
    width: 100%;
  }

  .scrollable-section {
    --item-height: 72px;
    --item-gap: 2px;

    width: 100%;
    max-height: calc(4 * var(--item-height) + 3 * var(--item-gap));
    overflow: scroll;
  }

  .list {
    width: 100%;
    gap: var(--item-gap);
  }

  .movie {
    padding: 8px 10px;
    gap: 14px;
    width: 100%;
    height: var(--item-height);
    background-color: var(--movie-bg, transparent);
    cursor: pointer;
    border-radius: 10px;
    @include default-transitions(background-color);

    &:hover {
      --movie-bg: var(--color-bg-raised);
    }

    .poster {
      height: 100%;
      width: auto;

      .img {
        @include size(100%);
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .info-left {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          color: var(--color-text-primary);
        }

        .duration {
          color: var(--color-text-secondary);
        }
      }
    }
  }
}
</style>
