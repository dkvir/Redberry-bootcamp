<template>
  <div class="selected-tickets flex-column justify-between">
    <div class="label f-button">Your seats · Max 3</div>
    <div class="selected-tickets-frame">
      <ul v-if="seatsStore.selectedSeats.length > 0" class="list flex-column">
        <li
          v-for="item in seatsStore.selectedSeats"
          :key="item.seat.id"
          class="item"
        >
          <pages-details-buy-ticket-selected-ticket :item="item" />
        </li>
      </ul>

      <div v-else class="pick-text f-body-s">
        Pick up to 3 seats from the map. Each seat can carry its own ticket
        type.
      </div>
    </div>
    <div class="checkout flex-column">
      <div class="calculator flex-center justify-between">
        <div class="label f-label-s">SUBTOTAL</div>
        <div class="bill">₾ {{ seatsStore.total }}</div>
      </div>
      <tiny-buttons-primary
        @click="buyTicketStore.moveToSecondStep()"
        label="Next: Checkout"
        :disabled="
          seatsStore.selectedSeats.length === 0 || holdStore.holdLoading
        "
      />
    </div>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";
import { useHoldStore } from "~/stores/pages/details/buy-ticket/hold";

const buyTicketStore = useBuyTicketStore();
const seatsStore = useSeatsStore();
const holdStore = useHoldStore();
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

    .list {
      gap: 12px;
    }

    .pick-text {
      color: var(--color-text-secondary);
    }
  }

  .checkout {
    gap: 12px;
  }
}
</style>
