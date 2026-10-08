<template>
  <div class="step-one flex-column">
    <div class="screen f-label-s flex-center">SCREEN</div>
    <p
      :class="[
        'alert f-button',
        {
          'is-visible': seatsStore.alertVisibility || !!holdMessage,
        },
      ]"
    >
      <span v-if="seatsStore.alertVisibility" class="span">
        Maximum 3 seats is available to buy from one account
      </span>
      <span v-else-if="holdMessage" class="span">{{ holdMessage }}</span>
    </p>
    <div :class="['panzoom-frame', { 'is-disabled': holdStore?.hold?.holdId }]">
      <VueZoomable
        v-if="seatsStore.seatMap"
        style="width: 720px; height: 400px; border: 1px solid black"
        selector="#section-list"
        :minZoom="0.7"
        :maxZoom="2"
        :dblClickZoomStep="0.4"
        :wheelZoomStep="0.05"
        v-model:pan="pan"
        v-model:zoom="zoom"
      >
        <pages-details-buy-ticket-step-one-list />
      </VueZoomable>
    </div>

    <pages-details-buy-ticket-step-one-statuses />
  </div>
</template>

<script setup>
import VueZoomable from "vue-zoomable";
import "vue-zoomable/dist/style.css";

import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";
import { useHoldStore } from "~/stores/pages/details/buy-ticket/hold";

const zoom = ref(1);
const pan = ref({ x: 10, y: 10 });

const seatsStore = useSeatsStore();
const holdStore = useHoldStore();

const holdMessage = computed(
  () => holdStore.conflictMessage || holdStore.holdError,
);
</script>

<style lang="scss" scoped>
.step-one {
  width: 100%;
  margin: 35px 0;

  .alert {
    color: var(--color-red);
    min-height: 46px;
    padding: 15px 0;
    opacity: var(--alert-opacity, 0);
    pointer-events: none;
    @include default-transitions(opacity);

    &.is-visible {
      --alert-opacity: 1;
    }
  }

  .screen {
    padding: 9px 0;
    width: 100%;
    color: var(--color-text-primary);
    background-color: var(--color-bg-raised);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .panzoom-frame {
    border: 1px solid var(--color-bg-card);
    border-radius: 10px;
    width: 720px;
    height: 400px;

    &.is-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  :deep(._container_irdvc_2) {
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid transparent !important;
    border-radius: 10px;
  }
}
</style>
