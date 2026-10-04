<template>
  <section class="coming-soon flex-column">
    <pages-home-tiny-section-header title="coming soon..." />

    <ul class="list flex-center justify-start">
      <li
        v-for="(movie, index) in catalogueStore.comingSoonMovies"
        :key="index"
        class="movie flex-center justify-start"
      >
        <div class="poster">
          <img :src="movie.posterUrl" :alt="movie.title" class="img" />
        </div>
        <div class="info-frame flex-column justify-between">
          <div class="info flex-column justify-start">
            <p class="date f-label-s uppercase">
              IN CINEMAS {{ formatDate(movie.releaseDate) }}
            </p>
            <h3 class="title f-h3">{{ movie.title }}</h3>
            <p class="genre f-body-s">
              {{ movie.genres[0].name }} · {{ movie.runtimeMinutes }} mins
            </p>
            <tiny-chip
              :label="movie.ageRating.code"
              :red="movie.ageRating.code !== 'PG'"
            />
          </div>
          <tiny-buttons-notify
            :label="notified[movie.slug] ? 'Reminder Set' : 'Notify Me'"
            :icon-name="notified[movie.slug] ? 'check' : 'notify'"
            :disabled="notifyingSlug === movie.slug || notified[movie.slug]"
            @click.stop="clickNotify(movie)"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useCatalogueStore } from "~/stores/pages/home/catalogue";
import { useAuthStore } from "~/stores/common/auth";

const catalogueStore = useCatalogueStore();
const authStore = useAuthStore();

const notifyingSlug = ref(null);
const notified = ref({});

await useAsyncData("coming-soon-movies", async () => {
  await catalogueStore.fetchComingSoonMovies();
  return catalogueStore.comingSoonMovies;
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const clickNotify = async (movie) => {
  const slug = movie.slug;
  if (notifyingSlug.value === slug || notified.value[slug]) return;

  notifyingSlug.value = slug;
  try {
    await catalogueStore.notifyMovie(slug);
    notified.value[slug] = true;
  } catch (e) {
    if (e?.statusCode === 401) {
      authStore.requireLogin(() => clickNotify(movie));
    }
  } finally {
    notifyingSlug.value = null;
  }
};
</script>

<style lang="scss" scoped>
.coming-soon {
  position: relative;
  padding: 40px 0;
  border-top: 1px solid var(--color-bg-raised);
  gap: 24px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0px;
    bottom: 0;
    width: 250px;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--color-bg-page) 80%
    );
    pointer-events: none;
  }

  .list {
    padding: 0 70px;
    width: 100%;
    height: 200px;
    overflow-x: scroll;
    gap: 20px;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .movie {
    padding: 14px 12px;
    gap: 15px;
    min-width: 500px;
    width: 500px;
    height: 100%;
    background-color: var(--color-bg-card);
    border-radius: 20px;
    border: 2px solid var(--movie-border, transparent);
    cursor: pointer;
    @include default-transitions(border);

    &:hover {
      --movie-border: var(--color-bg-raised);
    }
  }

  .poster {
    width: 300px;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .date {
    color: var(--color-red);
  }

  .info-frame {
    flex: 1;
    height: 100%;
  }

  .info {
    gap: 7px;
  }
}
</style>
