<template>
  <vue-awesome-paginate
    v-model="current"
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="5"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 10 },
});

const emit = defineEmits(["update:modelValue"]);

const current = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  column-gap: 8px;

  :deep(.back-button),
  :deep(.next-button) {
    --button-bg: var(--color-bg-card);
  }

  :deep(.paginate-buttons) {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--button-bg, transparent);
    color: var(--button-color, var(--color-text-secondary));
    @include default-transitions(background-color, color);

    &:hover {
      --button-color: var(--color-text-primary);
    }
  }

  :deep(.active-page) {
    --button-bg: var(--color-red);
    --button-color: var(--color-text-primary);
  }
}
</style>
