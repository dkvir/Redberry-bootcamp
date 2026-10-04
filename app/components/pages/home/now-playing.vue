<template>
  <div class="now-playing">
    <pages-home-tiny-section-header title="NOW PLAYING" />

    <ul class="list flex-center justify-start">
      <li
        v-for="(movie, index) in catalogueStore.nowPlayngMovies"
        :key="index"
        class="movie"
      >
        <nuxt-link
          class="movie-link flex-column justify-between"
          :to="`/sessions/${movie.slug}`"
        >
          <div class="poster">
            <img :src="movie.posterUrl" :alt="movie.title" class="img" />
          </div>
          <div class="info flex-column">
            <h3 class="title f-h3">{{ movie.title }}</h3>
            <p class="genre f-body-s">
              {{ movie.genres[0].name }} · {{ movie.runtimeMinutes }} mins
            </p>
            <tiny-chip :label="movie.ageRating.code" red />
            <p class="synopsis f-body-m">
              {{ movie.synopsis }}
            </p>
          </div>
          <div class="buy-ticket flex-center justify-between">
            <p class="price f-label-s">From ₾{{ movie.fromPrice }}</p>
            <tiny-buttons-primary label="Buy Ticket" />
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCatalogueStore } from "~/stores/pages/home/catalogue";

const catalogueStore = useCatalogueStore();

await useAsyncData("now-playing-movies", async () => {
  await catalogueStore.fetchNowPlayingMovies();
  return catalogueStore.nowPlayngMovies;
});
</script>

<style lang="scss" scoped>
.now-playing {
  width: 100%;
  margin-top: 32px;
  padding: 0 70px 40px;

  .list {
    --item-gap: 15px;

    position: relative;
    margin-top: 24px;
    width: 100%;
    height: 530px;
    overflow: hidden;
    gap: var(--item-gap);
    flex-wrap: nowrap;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 150px;
      background: linear-gradient(
        to right,
        transparent 0%,
        var(--color-bg-page) 100%
      );
      pointer-events: none;
    }
  }

  .movie {
    --movie-max-width: 550px;

    padding: 12px;
    width: 300px;
    min-width: var(--movie-width, 300px);
    height: 100%;
    background-color: var(--color-bg-card);
    border-radius: 20px;
    overflow: hidden;
    @include default-transitions(min-width);

    &:hover {
      --movie-width: var(--movie-max-width);
      --poster-height: 290px;
      --syn-opacity: 1;
      --syn-height: 56px;
    }
  }

  .movie-link {
    gap: 10px;
    @include size(100%);
    border-radius: inherit;
  }

  .poster {
    width: 100%;
    height: var(--poster-height, 370px);
    border-radius: 12px;
    overflow: hidden;
    @include default-transitions(height);
    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    gap: 7px;
    flex: 1;

    .title {
      color: var(--color-text-primary);
    }
    .genre {
      color: var(--color-text-secondary);
    }

    .synopsis {
      width: calc(var(--movie-max-width) - 24px);
      height: var(--syn-height, 0);
      overflow: hidden;
      color: var(--color-text-secondary);
      opacity: var(--syn-opacity, 0);
      @include default-transitions(opacity);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }

  .buy-ticket {
    .price {
      color: var(--color-text-primary);
    }
  }
}
</style>
