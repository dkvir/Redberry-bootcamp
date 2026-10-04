<template>
  <section class="hero-section">
    <Swiper
      class="hero-swiper"
      :modules="[Autoplay, EffectFade]"
      effect="fade"
      :loop="true"
      :speed="800"
      :autoplay="{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="movie in catalogueStore.featuredMovies"
        :key="movie.id"
      >
        <img class="slide-bg" :src="movie.backdropUrl" :alt="movie.title" />

        <div class="content flex-column align-start">
          <tiny-chip
            class="uppercase"
            :label="`premiere · week of ${formatDate(movie.releaseDate)}`"
            red
          />
          <h2 class="title f-display uppercase">{{ movie.title }}</h2>
          <div class="chips flex-center">
            <tiny-chip :label="movie.ageRating.code" red />

            <tiny-chip
              :label="`${movie.ageRating.code} Min`"
              iconName="timer"
            />

            <tiny-chip
              v-for="format in movie.formats"
              :key="format.id"
              :label="format.name"
            />
          </div>

          <p class="synopsis f-body-m">{{ movie.synopsis }}</p>

          <div class="actions flex-center">
            <NuxtLink :to="`/sessions/${movie.slug}`" class="btn">
              <tiny-buttons-primary label="Buy tickets" icon-label="ticket" />
            </NuxtLink>
            <NuxtLink :to="`/sessions/${movie.slug}`" class="btn">
              <tiny-buttons-transparent label="All sessions" />
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="hero-controls flex-center">
      <div class="hero-progress">
        <span
          v-for="(movie, i) in catalogueStore.featuredMovies"
          :key="movie.id"
          class="bar"
          :class="{ 'is-active': i === activeIndex }"
          @click="swiper?.slideToLoop(i)"
        />
      </div>

      <div class="hero-arrows flex-center">
        <button
          class="hero-arrow flex-center"
          aria-label="Previous"
          @click="swiper?.slidePrev()"
        >
          <nuxt-icon name="slider-arrow-left" class="arrow left" filled />
        </button>
        <button
          class="hero-arrow flex-center"
          aria-label="Next"
          @click="swiper?.slideNext()"
        >
          <nuxt-icon name="slider-arrow-right" class="arrow right" filled />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { useCatalogueStore } from "~/stores/pages/home/catalogue";

const AUTOPLAY_DELAY = 5000;

const catalogueStore = useCatalogueStore();

await useAsyncData("featured-movies", async () => {
  await catalogueStore.fetchFeaturedMovies();
  return catalogueStore.featuredMovies;
});

const swiper = ref(null);
const activeIndex = ref(0);
const progress = ref(0);

const onSwiper = (instance) => {
  swiper.value = instance;
};

const onSlideChange = (instance) => {
  activeIndex.value = instance.realIndex;
  progress.value = 0;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 85vh;

  .hero-swiper {
    width: 100%;
    min-height: 85vh;
  }

  .swiper-slide {
    position: relative;
    min-height: 85vh;
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }

  .slide-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    position: absolute;
    left: 0;
    bottom: 180px;
    z-index: 2;
    gap: 16px;
    max-width: 580px;
    padding-left: 67px;
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

  .hero-controls {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 42px;
    z-index: 3;
    gap: 16px;
    padding: 0 67px;
  }

  .hero-progress {
    flex: 1;
    display: flex;
    gap: 10px;

    .bar {
      flex: 1;
      height: 3px;
      background-color: var(--bar-bg, var(--color-text-primary));
      border-radius: 999px;
      cursor: pointer;
      @include default-transitions(background-color);

      &.is-active {
        --bar-bg: var(--color-red);
      }
    }
  }

  .hero-arrows {
    gap: 10px;
  }

  .hero-arrow {
    @include size(44px);
    border: 0;
    border-radius: 50%;
    background-color: var(--hero-arrow-bg, rgba(#070c1c, 0.2));
    cursor: pointer;
    @include default-transitions(background-color);

    &:hover {
      --hero-arrow-bg: var(--color-bg-page);
    }
  }
}
</style>
