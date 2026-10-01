<template>
  <button class="transparent-button f-button">{{ label }}</button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.transparent-button {
  display: inline-flex;
  align-content: center;
  justify-content: center;
  padding: 13px 22px;
  background-color: var(--color-tint-white);
  color: var(--color-text-primary);
  border-radius: 999px;
  cursor: pointer;
}
</style>
