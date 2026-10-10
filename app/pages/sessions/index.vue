<template>
  <div class="sessions-page">
    <div class="header flex-column">
      <h2 class="title f-h1">Sessions</h2>
      <div class="subtitle f-body-m">Browse showtimes across all venues</div>
    </div>
    <div class="page-body flex">
      <pages-sessions-filters />
      <pages-sessions-catalogue />
    </div>
  </div>
</template>

<script setup></script>

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
    gap: 51px;
    width: 100%;
  }
}
</style>
