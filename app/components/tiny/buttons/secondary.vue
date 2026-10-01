<template>
  <button class="secondary-button">{{ label }}</button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.secondary-button {
  display: inline-flex;
  padding: 13px 22px;
  background-color: var(--color-text-primary);
  color: var(--color-bg-page);
  border-radius: 999px;
  border: 1px solid var(--color-text-primary);
  cursor: pointer;
  @include default-transitions(box-shadow);

  &:hover {
    box-shadow: 0 0 26px
      color-mix(in srgb, var(--color-text-primary) 28%, transparent);
  }
}
</style>
