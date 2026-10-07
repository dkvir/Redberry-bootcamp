<template>
  <div class="selected-ticket">
    <div class="header flex-center justify-between">
      <div class="seat flex-center">
        <div class="label f-body-s">Seat</div>
        <div class="value f-label-s">{{ item.seat.code }}</div>
      </div>
      <div class="price flex-center">
        <div class="value f-label-s">₾ {{ seatsStore.seatPrice(item) }}</div>
        <button
          type="button"
          class="remove-btn flex-center"
          aria-label="Remove seat"
          @click.stop="seatsStore.toggleSelectedSeat(item.seat)"
        >
          <nuxt-icon name="close-auth" class="close-icon" filled />
        </button>
      </div>
    </div>
    <div class="options flex-center">
      <button
        v-for="type in seatsStore.TICKET_TYPES"
        :key="type.key"
        :class="[
          'f-body-s flex-center button',
          {
            'is-active': item.ticketType === type.key,
            'is-disabled': type.key === 'child' && seatsStore.isChildBlocked,
          },
        ]"
        @click="seatsStore.setTicketType(item.seat.id, type.key)"
      >
        {{ type.label }} {{ type.rate * 100 }}%
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const seatsStore = useSeatsStore();
</script>

<style lang="scss" scoped>
.selected-ticket {
  padding: 15px;
  background-color: var(--color-bg-card);
  border-radius: 16px;

  .header {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-bg-raised);
    .label {
      color: var(--color-text-secondary);
    }

    .value {
      color: var(--color-text-primary);
      margin-left: 12px;
    }

    .remove-btn {
      margin-left: 12px;
      cursor: pointer;
      &:hover {
        --icon-rotate: 90deg;
      }
      .close-icon {
        @include size(16px);
        transform: rotate(var(--icon-rotate, 0));
        @include default-transitions(transform);

        :deep(svg) {
          path {
            stroke: var(--color-text-secondary);
          }
        }
      }
    }
  }

  .options {
    margin-top: 12px;
    gap: 8px;
  }

  .button {
    padding: 8px 18px;
    border-radius: 999px;
    color: var(--color-text-primary);
    background-color: var(--button-color, var(--color-bg-raised));
    border: 1px solid var(--button-border, transparent);
    @include default-transitions(background-color, border);
    cursor: pointer;

    &:not(.is-active):not(.is-disabled):hover {
      --button-border: var(--color-text-disabled);
    }

    &.is-active {
      --button-color: var(--color-red);
    }

    &.is-disabled {
      --button-color: var(--color-chaos);
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }
  }
}
</style>
