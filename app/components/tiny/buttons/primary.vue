<template>
  <button
    :class="['button-primary f-button', { 'is-disabled': disabled }]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.button-primary {
  display: inline-flex;
  padding: 13px 22px;
  background-color: var(--button-bg-color, var(--color-red));
  color: var(--button-color, var(--color-text-primary));
  border-radius: 999px;
  border: 1px solid var(--button-border, transparent);
  cursor: pointer;
  @include default-transitions(border, box-shadow);

  &.is-disabled {
    cursor: not-allowed;
    --button-bg-color: var(--color-text-disabled);
    --button-color: var(--color-text-secondary);
  }

  &:not(.is-disabled):hover {
    --button-border: var(--color-mandarin);
    box-shadow: 0 0 26px color-mix(in srgb, var(--color-red) 28%, transparent);
  }
}
</style>
