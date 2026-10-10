<template>
  <div class="catalogue">
    <div class="filters flex align-center justify-between">
      <div class="label">
        Showing {{ catalogueStore.totalSessions }} sessions
      </div>
      <pages-sessions-catalogue-sort />
    </div>

    <ul class="sessions flex-column">
      <li
        v-for="item in catalogueStore.groups"
        :key="item.movie.id"
        class="session flex-column"
      >
        <pages-sessions-catalogue-movie :item="item" />
        <pages-sessions-catalogue-halls :item="item" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCatalogueStore } from "~/stores/pages/sessions/catalogue";

const catalogueStore = useCatalogueStore();
</script>

<style lang="scss" scoped>
.catalogue {
  flex: 1;
  min-width: 0;

  .sessions {
    margin-top: 24px;
  }

  .session {
    gap: 14px;
    &:not(:first-child) {
      padding-top: 32px;
      border-top: 1px solid var(--color-bg-raised);
    }
  }
}
</style>
