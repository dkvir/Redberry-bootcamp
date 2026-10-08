<template>
  <ul class="sections-list flex-column" id="section-list">
    <li
      v-for="(section, index) in seatsStore.seatMap.sections"
      :key="index"
      class="section flex-column"
    >
      <h2 class="name uppercase f-label-s">
        {{ section.name }} · ROWS {{ section.rows[0].label }}-{{
          section.rows[section.rows.length - 1].label
        }}
      </h2>

      <ul class="rows flex-column">
        <li
          v-for="row in section.rows"
          :key="row.label"
          class="row flex-center"
        >
          <div class="label f-label-s">{{ row.label }}</div>

          <ul class="seats flex align-center">
            <li
              v-for="seat in row.seats"
              :key="seat.id"
              @click="seatsStore.toggleSelectedSeat(seat)"
              :class="[
                'seat flex-center f-button',
                `is-${seat.state}`,
                {
                  'has-aisle': seat.aisleAfter,
                  'is-active':
                    seatsStore.selectedSeats.some(
                      (s) => s.seat.id === seat.id,
                    ) || seat.isMine,
                },
              ]"
            >
              <span v-if="seat.state !== 'unavailable'" class="span">
                {{ seat.label }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";

const seatsStore = useSeatsStore();
</script>

<style lang="scss" scoped>
.sections-list {
  gap: 24px;

  .section {
    gap: 24px;
  }

  .name {
    color: var(--color-text-secondary);
  }

  .rows {
    gap: 10px;
  }

  .row {
    gap: 8px;

    .label {
      flex: 0 0 24px;
      color: var(--color-text-primary);
      padding: 6px;
    }
  }

  .seats {
    flex: 1;
    gap: 8px;
  }

  .seat {
    flex: 1 1 0;
    @include size(52px);
    max-width: 52px;
    max-height: 52px;
    border-radius: 10px;
    border: 1px solid var(--seat-border, var(--color-text-disabled));
    background-color: var(--seat-bg, var(--color-bg-card));
    color: var(--seat-color, var(--color-text-primary));
    cursor: pointer;
    @include default-transitions(border, background-color);

    &.is-available {
      &:hover {
        --seat-border: var(--color-red);
      }
    }

    &.is-active,
    &.is-mine {
      --seat-bg: var(--color-red);
      --seat-border: var(--color-red);
    }

    &.has-aisle {
      margin-right: 32px;
    }

    &.is-sold {
      --seat-bg: var(--color-bg-card);
      --seat-border: var(--color-bg-card);
      --seat-color: var(--color-text-disabled);
      cursor: not-allowed;
    }

    &.is-unavailable {
      --seat-bg: var(--color-bg-card);
      --seat-border: var(--color-bg-card);
      --seat-color: var(--color-text-disabled);
      cursor: not-allowed;
    }

    &.is-held {
      background-image: url("/images/sold-pattern.svg");
      background-size: 52px 52px;
      background-repeat: no-repeat;
      cursor: not-allowed;
    }
  }
}
</style>
