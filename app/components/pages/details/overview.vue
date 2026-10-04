<template>
  <section class="overview flex-column justify-end">
    <div class="cover">
      <img :src="movie.backdropUrl" :alt="movie.title" class="img" />
    </div>

    <div class="info flex-end">
      <div class="poster">
        <img :src="movie.posterUrl" :alt="movie.title" class="img" />
      </div>
      <div class="content flex-column align-start justify-end">
        <tiny-chip
          class="uppercase"
          :label="`premiere · week of ${formatDate(movie.releaseDate)}`"
          red
        />
        <h2 class="title f-display uppercase">{{ movie.title }}</h2>
        <p class="synopsis f-body-m">{{ movie.synopsis }}</p>
        <div class="chips flex-center">
          <tiny-chip
            :label="movie.ageRating.code"
            :red="movie.ageRating.code !== 'PG'"
          />

          <tiny-chip :label="`${movie.runtimeMinutes} Min`" iconName="timer" />

          <tiny-chip
            v-for="format in movie.formats"
            :key="format.id"
            :label="format.name"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
</script>

<style lang="scss" scoped>
.overview {
  position: relative;
  width: 100%;
  height: 75vh;

  .cover {
    position: absolute;
    inset: 0;
    @include size(100%);
    overflow: hidden;
    z-index: -1;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background: rgba(var(--color-bg-page), 0.2);
      backdrop-filter: blur(10px);
    }

    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    padding: 40px 60px;
    gap: 34px;
    max-width: 980px;
  }

  .poster {
    width: 402px;
    height: 520px;
    border-radius: 14px;
    flex: 0 0 402px;
    box-shadow: 0 4px 64px rgba(0, 0, 0, 0.25);
    overflow: hidden;

    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .content {
    gap: 16px;
    flex: 1;
    padding-bottom: 10px;
  }

  .title {
    color: var(--color-text-primary);
  }

  .chips {
    flex-wrap: wrap;
    gap: 10px;
  }

  .actions {
    gap: 12px;
  }
}
</style>
