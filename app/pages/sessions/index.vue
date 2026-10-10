<template>
  <div class="sessions-page">
    <div class="header flex-column">
      <h2 class="title f-h1">Sessions</h2>
      <div class="subtitle f-body-m">Browse showtimes across all venues</div>
    </div>
    <div class="page-body flex-column align-center">
      <div class="page-body-content flex">
        <pages-sessions-filters />
        <pages-sessions-catalogue />
      </div>
      <tiny-pagination
        v-if="catalogueStore.lastPage > 1"
        class="pagination"
        :model-value="filterStore.page"
        :total-items="catalogueStore.totalMovies"
        :items-per-page="catalogueStore.perPage"
        @update:model-value="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/stores/pages/sessions/filters";
import { useCatalogueStore } from "~/stores/pages/sessions/catalogue";

const filterStore = useFiltersStore();
const catalogueStore = useCatalogueStore();

function onPageChange(page) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    filterStore.setPage(page);
  }, 350);
}
</script>

<style lang="scss" scoped>
.sessions-page {
  padding: calc(var(--app-header-height) + 10px) 51px 136px;
  width: 100%;
  min-height: 100vh;

  .header {
    gap: 6px;

    .title {
      color: var(--color-text-primary);
    }

    .subtitle {
      color: var(--color-text-secondary);
    }
  }
  .page-body {
    margin-top: 36px;
  }

  .page-body-content {
    gap: 51px;
    width: 100%;
  }

  .pagination {
    margin-top: 52px;
  }
}
</style>
