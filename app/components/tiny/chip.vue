<template>
  <div :class="['chip flex-center', { 'is-red': isRed }]">
    <nuxt-icon v-if="iconName" :name="iconName" class="icon" filled />
    <span class="span">{{ label }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  red: {
    type: [Boolean, Number, String],
    default: false,
  },
  iconName: {
    type: String,
  },
});

const isRed = computed(() => {
  if (typeof props.red === "string") return /\d/.test(props.red);
  if (typeof props.red === "number") return props.red > 0;

  return props.red;
});
</script>

<style lang="scss" scoped>
.chip {
  display: inline-flex;
  width: fit-content;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 999px;
  background-color: var(--chip-bg, var(--color-tint-white));
  color: var(--color-text-primary);

  &.is-red {
    --chip-bg: var(--color-tint-red);
    color: var(--color-red);
  }
}
</style>
