<template>
  <button
    :class="['button-primary flex-center', { 'is-disabled': disabled }]"
    :disabled="disabled"
  >
    <nuxt-icon v-if="iconLabel" :name="iconLabel" class="icon" filled />
    <span class="span f-button">{{ label }} </span>
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
  iconLabel: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.button-primary {
  display: inline-flex;
  gap: 4px;
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

  .icon {
    @include size(16px);
  }
}
</style>
