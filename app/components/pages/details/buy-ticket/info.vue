<template>
  <div class="tickets-info flex-column justify-between">
    <div class="label f-button">Your seats · Max 3</div>
    <div class="selected-tickets">
      <ul
        v-if="buyTicketStore.selectedSeats.length > 0"
        class="list flex-column"
      >
        <li
          v-for="item in buyTicketStore.selectedSeats"
          :key="item.id"
          class="item"
        >
          <div class="header flex-center justify-between">
            <div class="seat flex-center">
              <div class="label f-body-s">Seat</div>
              <div class="value f-label-s">{{ item.code }}</div>
            </div>
            <div class="price flex-center">
              <div class="value f-label-s">₾ {{ seatPrice(item) }}</div>
              <button
                type="button"
                class="remove-btn flex-center"
                aria-label="Remove seat"
                @click.stop="buyTicketStore.toggleSelectedSeat(item.seat)"
              >
                <nuxt-icon name="close-auth" class="close-icon" filled />
              </button>
            </div>
          </div>
          <div class="options flex-center">
            <button
              v-for="type in ticketTypes"
              :key="type.key"
              :class="[
                'f-body-s flex-center button',
                {
                  'is-active': item.ticketType === type.key,
                  'is-disabled':
                    type.key == 'child' && movie.ageRating.minAge <= 16,
                },
              ]"
              @click="
                buyTicketStore.setTicketType(
                  item.seat.id,
                  type.key,
                  movie.ageRating.minAge,
                )
              "
            >
              {{ type.label }} {{ type.rate * 100 }}%
            </button>
          </div>
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
        <div class="bill">₾ {{ total }}</div>
      </div>
      <tiny-buttons-primary
        label="Next: Checkout"
        :disabled="buyTicketStore.selectedSeats.length == 0"
      />
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
const ticketTypes = [
  { key: "child", label: "Child", rate: 0.6 },
  { key: "student", label: "Student", rate: 0.75 },
  { key: "adult", label: "Adult", rate: 1 },
];

const rates = Object.fromEntries(ticketTypes.map((t) => [t.key, t.rate]));

const seatPrice = (seat) =>
  Math.round(Number(props.movie.fromPrice) * rates[seat.ticketType] * 100) /
  100;

const total = computed(
  () =>
    Math.round(
      buyTicketStore.selectedSeats.reduce((sum, s) => sum + seatPrice(s), 0) *
        100,
    ) / 100,
);
</script>

<style lang="scss" scoped>
.tickets-info {
  @include size(100%);
  .label {
    color: var(--color-text-primary);
  }

  .selected-tickets {
    flex: 1;
    margin-top: 12px;

    .list {
      gap: 12px;
      .item {
        padding: 15px;
        background-color: var(--color-bg-card);
        border-radius: 16px;
      }

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

    .pick-text {
      color: var(--color-text-secondary);
    }
  }

  .checkout {
    gap: 12px;
  }
}
</style>
