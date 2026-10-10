<template>
  <div class="checkbox-field flex align-center">
    <div :class="['checkbox flex-center', { 'is-active': isActive }]">
      <nuxt-icon name="check" class="icon" aria-hidden="true" />
    </div>
    <div v-if="label" class="label f-label-m">{{ label }}</div>
    <div v-if="sublabel" class="sublabel f-body-s">· {{ sublabel }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  sublabel: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.checkbox-field {
  margin-top: 12px;
  cursor: pointer;
  .checkbox {
    @include size(18px);
    border-radius: 5px;
    border: 1.5px solid var(--color-text-disabled);
    background-color: var(--checkbox-bg, transparent);
    @include default-transitions(background-color);

    .icon {
      opacity: var(--icon-opacity, 0);
      @include default-transitions(opacity);
      :deep(svg) {
        width: 10px;
      }
    }

    &.is-active {
      --checkbox-bg: var(--color-red);
      --icon-opacity: 1;
    }
  }
  .label {
    margin-left: 10px;
    color: var(--color-text-primary);
  }
  .sublabel {
    margin-left: 5px;
    color: var(--color-text-secondary);
  }
}
</style>
