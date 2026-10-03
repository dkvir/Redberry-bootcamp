<template>
  <div class="app-footer flex-center justify-between">
    <nuxt-link class="logo-link" to="/">
      <nuxt-icon name="logo" class="logo-icon" filled />
    </nuxt-link>
    <p class="copyright f-body-s">
      © {{ new Date().getFullYear() }} Kino XII. All rights reserved.
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-footer {
  padding: 20px 34px 34px;
  margin: 27px 34px 0;
  width: calc(100% - 78px);
  border-top: 1px solid var(--color-bg-raised);

  .logo-link {
    height: 100%;
    display: inline-block;
  }

  .copyright {
    color: var(--color-text-secondary);
  }
}
</style>
