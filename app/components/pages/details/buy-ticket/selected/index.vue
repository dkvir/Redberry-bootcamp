<template>
  <div class="selected-tickets flex-column justify-between">
    <div class="label f-button">
      {{ buyTicketStore.activeStep == 1 ? " Your seats · Max 3" : "Summary" }}
    </div>
    <div class="selected-tickets-frame">
      <pages-details-buy-ticket-selected-list
        v-if="buyTicketStore.activeStep == 1"
        :selectedSeats="seatsStore.selectedSeats"
      />
      <pages-details-buy-ticket-selected-summary
        v-else
        :session="buyTicketStore.selectedSession"
        :title="seatsStore.movie?.title"
        :selectedSeats="seatsStore.selectedSeats"
      />
    </div>
    <div class="checkout flex-column">
      <div class="calculator flex-center justify-between">
        <div class="label f-label-s">SUBTOTAL</div>
        <div class="bill">₾ {{ seatsStore.total }}</div>
      </div>
      <tiny-buttons-primary
        :label="
          buyTicketStore.activeStep === 1
            ? 'Next: Checkout'
            : 'Pay: Complete order'
        "
        :disabled="
          seatsStore.selectedSeats.length === 0 ||
          holdStore.holdLoading ||
          buyTicketStore.orderLoading
        "
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script setup>
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";
import { useHoldStore } from "~/stores/pages/details/buy-ticket/hold";
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";

const seatsStore = useSeatsStore();
const holdStore = useHoldStore();
const buyTicketStore = useBuyTicketStore();

const handleClick = () => {
  if (buyTicketStore.activeStep === 1) buyTicketStore.moveToSecondStep();
  else if (buyTicketStore.activeStep === 2) buyTicketStore.submitStepTwo();
};
</script>

<style lang="scss" scoped>
.selected-tickets {
  @include size(100%);
  padding-left: 20px;
  .label {
    color: var(--color-text-primary);
  }

  .selected-tickets-frame {
    flex: 1;
    margin-top: 12px;
  }

  .checkout {
    gap: 12px;
  }
}
</style>
