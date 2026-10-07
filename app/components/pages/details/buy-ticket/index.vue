<template>
  <div class="buy-ticket flex-center">
    <div class="bg-blur"></div>

    <div ref="contentRef" class="content flex-column">
      <pages-details-buy-ticket-modal-header
        v-if="buyTicketStore.selectedSession"
        :session="buyTicketStore.selectedSession"
      />
      <div class="content-frame flex-center justify-between">
        <div class="steps">
          <pages-details-buy-ticket-segments
            :activeStep="buyTicketStore.activeStep"
          />
          <pages-details-buy-ticket-step-one />
        </div>
        <pages-details-buy-ticket-selected />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";
import { onClickOutside } from "@vueuse/core";

const buyTicketStore = useBuyTicketStore();

const { stopScroll, startScroll } = useScroll();
const contentRef = ref(null);

onMounted(stopScroll);
onBeforeUnmount(startScroll);
onClickOutside(contentRef, () => buyTicketStore.close());
</script>

<style lang="scss" scoped>
.buy-ticket {
  position: fixed;
  inset: 0;
  z-index: 9;

  .bg-blur {
    position: absolute;
    inset: 0;
    background-color: var(--color-chaos);
    backdrop-filter: blur(10px);
    z-index: -1;
  }

  .content {
    padding: 32px;
    gap: 32px;
    min-width: 1146px;
    min-height: 600px;
    border-radius: 28px;
    border: 1px solid var(--color-text-disabled);
    background-color: var(--color-bg-page);
  }

  .content-frame {
    flex: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 365px;

    .steps {
      min-width: 0;
      height: 100%;
      padding-right: 20px;
      border-right: 1px solid var(--color-bg-card);
      min-width: 720px;
      min-height: 625px;
    }

    .tickets-info {
      height: 100%;
      padding-left: 20px;
    }
  }
}
</style>
