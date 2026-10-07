<template>
  <ul :class="['segments flex-center', `active-step-${activeStep}`]">
    <li class="segment f-label-s flex-center">SEATS</li>
    <li class="segment f-label-s flex-center">CHECKOUT</li>
  </ul>
</template>

<script setup>
const props = defineProps({
  activeStep: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.segments {
  position: relative;
  width: 100%;
  height: 33px;
  background-color: var(--color-bg-card);
  border-radius: 999px;

  &.active-step-2 {
    --before-transform: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-radius: 999px;
    background-color: var(--color-red);
    transform: translate(var(--before-transform, 0), 0);
    @include default-transitions(transform);
  }

  .segment {
    position: relative;
    width: 50%;
    height: 100%;
    color: var(--color-text-primary);
    cursor: pointer;
  }
}
</style>
