<template>
  <button class="notify-button f-button flex-center">
    <nuxt-icon v-if="iconName" :name="iconName" class="icon" filled />
    <span class="span">{{ label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.notify-button {
  display: inline-flex;
  width: fit-content;
  gap: 2px;
  padding: 6px 12px;
  background-color: var(--button-bg, transparent);
  border: 1px solid var(--color-text-primary);
  color: var(--color-text-primary);
  border-radius: 999px;
  cursor: pointer;
  @include default-transitions(background-color);

  &:hover {
    --button-bg: var(--color-tint-white);
  }

  :deep(.icon) {
    path {
      stroke: var(--color-text-primary);
    }
  }
}
</style>
