<template>
  <div
    :class="['buy-ticket flex-center', { 'is-visible': buyTicketStore.isOpen }]"
  >
    <div class="bg-blur"></div>
    <div class="content"></div>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket";

const buyTicketStore = useBuyTicketStore();

watch(
  () => buyTicketStore.isOpen,
  (isOpen) => {
    if (isOpen) {
      useScroll().stopScroll();
    } else {
      useScroll().startScroll();
    }
  },
);
</script>

<style lang="scss" scoped>
.buy-ticket {
  position: fixed;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  transition-duration: 0.15s;

  &.is-visible {
    --content-opacity: 1;
    --bg-blur: 10px;
    --bg-color: var(--color-chaos);
    pointer-events: auto;
  }

  .bg-blur {
    position: absolute;
    inset: 0;
    background-color: var(--bg-color, transparent);
    backdrop-filter: blur(var(--bg-blur, 0px));
    z-index: -1;
    @include default-transitions(backdrop-filter, background-color);
  }

  :deep(.content) {
    padding: 32px;
    width: 1146px;
    min-height: 600px;
    border-radius: 28px;
    border: 1px solid var(--color-text-disabled);
    background-color: var(--color-bg-page);
    opacity: var(--content-opacity, 0);
    @include default-transitions(opacity);
  }
}
</style>
