<template>
  <div class="step-one flex-column">
    <div class="screen f-label-s flex-center">SCREEN</div>
    <p
      :class="[
        'alert f-button',
        {
          'is-visible': buyTicketStore.alertVisibility,
        },
      ]"
    >
      Maximum 3 seats is available to buy from one account
    </p>
    <div class="panzoom-frame">
      <VueZoomable
        v-if="buyTicketStore.seatMap"
        style="width: 720px; height: 400px; border: 1px solid black"
        selector="#section-list"
        :minZoom="0.7"
        :maxZoom="2"
        :dblClickZoomStep="0.4"
        :wheelZoomStep="0.05"
        v-model:pan="pan"
        v-model:zoom="zoom"
      >
        <ul class="sections-list flex-column" id="section-list">
          <li
            v-for="(section, index) in buyTicketStore.seatMap.sections"
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

                <ul class="seats flex-center">
                  <li
                    v-for="seat in row.seats"
                    :key="seat.id"
                    @click="buyTicketStore.toggleSelectedSeat(seat)"
                    :class="[
                      'seat flex-center f-button',
                      `is-${seat.state}`,
                      {
                        'has-aisle': seat.aisleAfter,
                        'is-active':
                          buyTicketStore.selectedSeats.some(
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
      </VueZoomable>
    </div>

    <pages-details-buy-ticket-step-one-statuses />
  </div>
</template>

<script setup>
import VueZoomable from "vue-zoomable";
import "vue-zoomable/dist/style.css";

import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket";

const zoom = ref(1);
const pan = ref({ x: 10, y: 10 });

const buyTicketStore = useBuyTicketStore();
</script>

<style lang="scss" scoped>
.step-one {
  width: 100%;
  margin: 35px 0;

  .alert {
    color: var(--color-red);
    overflow: 0;
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
  }

  :deep(._container_irdvc_2) {
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid transparent !important;
    border-radius: 10px;
  }

  .sections-list {
    gap: 24px;
  }

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
