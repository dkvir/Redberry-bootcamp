<template>
  <Html>
    <Body>
      <common-app-header />
      <common-auth />
      <div class="default-layout">
        <slot />
      </div>
    </Body>
  </Html>
</template>

<script setup>
useHead({
  titleTemplate: "KINO XII | Redberry Bootcamp",
});
</script>

<style lang="scss" scoped>
.default-layout {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  padding: var(--app-header-height) var(--app-offset-padding) 0;
}
</style>
