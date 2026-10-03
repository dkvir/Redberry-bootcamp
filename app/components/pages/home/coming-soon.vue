<template>
  <div class="coming-soon flex-column">
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
            <tiny-chip :label="movie.ageRating.code" red />
          </div>
          <tiny-buttons-notify
            label="Notify Me"
            :disabled="notifyingSlug === movie.slug"
            @click.stop="clickNotify(movie)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCatalogueStore } from "~/stores/common/catalogue";
import { useAuthStore } from "~/stores/common/auth";

const catalogueStore = useCatalogueStore();
const authStore = useAuthStore();

const notifyingSlug = ref(null);

await useAsyncData("coming-soon-movies", () =>
  catalogueStore.fetchComingSoonMovies(),
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const clickNotify = async (movie) => {
  notifyingSlug.value = movie.slug;
  try {
    await catalogueStore.notifyMovie(movie.slug);
  } catch (e) {
    if (e?.statusCode === 401) {
      authStore.requireLogin(() => clickNotify(movie));
    } else {
    }
  } finally {
    notifyingSlug.value = null;
  }
};
</script>

<style lang="scss" scoped>
.coming-soon {
  padding: 40px 70px 0 70px;
  border-top: 1px solid var(--color-bg-raised);
  gap: 24px;

  .list {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    gap: 20px;

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
