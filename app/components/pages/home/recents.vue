<template>
  <section v-if="recentsStore.movies.length > 0" class="recents flex-column">
    <h1 class="label f-h1">Recently viewed</h1>

    <ul class="list flex-start align-center">
      <li
        v-for="(movie, index) in recentsStore.movies"
        :key="index"
        class="movie"
      >
        <NuxtLink
          :to="`/sessions/${movie.slug}`"
          class="movie-link flex-start align-center"
        >
          <div class="poster">
            <img :src="movie.poster" :alt="movie.title" class="img" />
          </div>
          <div class="info flex-column">
            <h2 class="title f-button">{{ movie.title }}</h2>
            <p class="genre">{{ movie.genre }} · {{ movie.duration }} min</p>

            <tiny-chip :label="movie.age" :red="movie.age" />
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useRecentsStore } from "~/stores/pages/home/recents";

const recentsStore = useRecentsStore();

onMounted(() => recentsStore.load());
</script>

<style lang="scss" scoped>
.recents {
  margin-top: 40px;
  gap: 20px;
  width: 100%;
  padding: 0 70px 40px;
  border-bottom: 1px solid var(--color-bg-raised);

  .list {
    gap: 20px;
    width: 100%;
    height: 90px;
  }

  .movie {
    width: 330px;
    height: 100%;
  }

  .movie-link {
    padding: 10px;
    gap: 12px;
    background-color: var(--color-bg-card);
    border: 2px solid var(--movie-border, transparent);
    border-radius: 16px;
    @include size(100%);
    @include default-transitions(border);
    &:hover {
      --movie-border: var(--color-bg-raised);
    }
  }

  .poster {
    width: 90px;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;

    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    gap: 4px;
    .title {
      color: var(--color-text-primary);
    }
    .genre {
      color: var(--color-text-secondary);
    }
  }
}
</style>
