<template>
  <button class="button-primary f-button">
    {{ label }}
  </button>
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
.button-primary {
  display: inline-flex;
  padding: 13px 22px;
  background-color: var(--color-red);
  color: var(--color-text-primary);
  border-radius: 999px;
  border: 1px solid var(--button-border, transparent);
  cursor: pointer;
  @include default-transitions(border, box-shadow);

  &:hover {
    --button-border: var(--color-mandarin);
    box-shadow: 0 0 26px color-mix(in srgb, var(--color-red) 28%, transparent);
  }
}
</style>
