<template>
  <div class="section-header f-label-s flex-center justify-between">
    <h1 class="span f-h1 uppercase">{{ title }}</h1>
    <nuxt-link to="/sessions" class="link f-label-m">See all</nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  required: true,
});
</script>

<style lang="scss" scoped>
.section-header {
  .span {
    color: var(--color-text-primary);
  }

  .link {
    color: var(--color-red);
    cursor: pointer;
  }
}
</style>
