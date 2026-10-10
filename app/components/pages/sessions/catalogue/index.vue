<template>
  <div class="catalogue">
    <div class="filters flex align-center justify-between">
      <div class="label">Showing 12 sessions</div>
      <pages-sessions-catalogue-sort />
    </div>

    <div class="session">
      {{ catalogueStore.groups }}
    </div>
  </div>
</template>

<script setup>
import { useCatalogueStore } from "~/stores/pages/sessions/catalogue";

const catalogueStore = useCatalogueStore();
</script>

<style lang="scss" scoped>
.catalogue {
  width: 100%;
}
</style>
