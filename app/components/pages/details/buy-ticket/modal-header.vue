<template>
  <div class="modal-header flex-center justify-between">
    <div class="left-wrapper">
      <h2 class="title f-h2">{{ seatStore.movie.title }}</h2>
      <p class="subtitle f-body-s">
        {{ buyTicketStore.selectedSession.venue.name }} · Hall
        {{ buyTicketStore.selectedSession.hall.name }} ·
        {{ formatDate(buyTicketStore.selectedSession.date) }} ·
        {{ buyTicketStore.selectedSession.time }} ·
        {{ buyTicketStore.selectedSession.format.name }} ·
        {{ buyTicketStore.selectedSession.language.name }}
      </p>
    </div>
    <div v-if="holdStore.hold" class="held flex-center flex-column">
      <p class="label f-label-s">SEATS HELD</p>
      <p class="time f-button">{{ holdStore.timeLeft }}</p>
    </div>
    <button
      v-else
      :class="['f-body-s flex-center button']"
      @click="buyTicketStore.close()"
    >
      <nuxt-icon name="close-auth" class="close-icon" filled />
    </button>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";
import { useSeatsStore } from "~/stores/pages/details/buy-ticket/seats";
import { useHoldStore } from "~/stores/pages/details/buy-ticket/hold";

const buyTicketStore = useBuyTicketStore();
const seatStore = useSeatsStore();
const holdStore = useHoldStore();

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
</script>

<style lang="scss" scoped>
.modal-header {
  .title {
    color: var(--color-text-primary);
  }

  .subtitle {
    margin-top: 8px;
    color: var(--color-text-secondary);
  }

  .button {
    cursor: pointer;
    &:hover {
      --icon-rotate: 90deg;
    }
    .close-icon {
      @include size(24px);
      transform: rotate(var(--icon-rotate, 0));
      @include default-transitions(transform);

      :deep(svg) {
        path {
          stroke: var(--color-text-primary);
        }
      }
    }
  }

  .held {
    padding: 8px 14px;
    background-color: var(--color-bg-card);
    border-radius: 12px;
    gap: 2px;

    .label {
      color: var(--color-text-secondary);
    }

    .time {
      color: var(--color-text-primary);
    }
  }
}
</style>
