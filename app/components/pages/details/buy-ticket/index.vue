<template>
  <div
    :class="['buy-ticket flex-center', { 'is-visible': buyTicketStore.isOpen }]"
  >
    <div class="bg-blur"></div>

    <div class="content flex-column">
      <pages-details-buy-ticket-modal-header
        v-if="buyTicketStore.selectedSession"
        :movie="movie"
        :session="buyTicketStore.selectedSession"
      />
      <div class="content-frame flex-center justify-between">
        <div class="steps">
          <pages-details-buy-ticket-segments
            :activeStep="buyTicketStore.activeStep"
          />
          <pages-details-buy-ticket-step-one
            v-if="buyTicketStore.seatMap"
            :seatMap="buyTicketStore.seatMap"
          />
        </div>
        <div class="tickets-info"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const buyTicketStore = useBuyTicketStore();

watch(
  () => buyTicketStore.isOpen,
  (isOpen) => {
    if (isOpen) {
      useScroll().stopScroll();
      buyTicketStore.fetchSeats();
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

  .content {
    padding: 32px;
    gap: 32px;
    min-width: 1146px;
    min-height: 600px;
    border-radius: 28px;
    border: 1px solid var(--color-text-disabled);
    background-color: var(--color-bg-page);
    opacity: var(--content-opacity, 0);
    @include default-transitions(opacity);
  }

  .content-frame {
    flex: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 341px;

    .steps {
      min-width: 0;
      height: 100%;
      padding-right: 20px;
      border-right: 1px solid var(--color-bg-card);
    }

    .tickets-info {
      height: 100%;
      padding-left: 20px;
    }
  }
}
</style>
