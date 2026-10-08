<template>
  <div class="step-three flex-center flex-column">
    <div class="header flex-center flex-column">
      <div class="confirmed flex-center">
        <nuxt-icon name="check" class="icon" aria-hidden="true" />
      </div>
      <h2 class="label f-h1">Booking confirmed!</h2>
      <div class="sublabel f-body-m">
        Your tickets are ready. We've sent the confirmation to your email.
      </div>
      <div class="order flex-center f-label-s">
        ORDER #{{ buyTicketStore.order.reference }}
      </div>
    </div>
    <pages-details-buy-ticket-step-three-details
      :order="buyTicketStore.order"
    />
    <div class="buttons flex-center">
      <nuxt-link to="/profile?segment=tickets" class="button-link">
        <tiny-buttons-primary label="View my tickets" />
      </nuxt-link>
      <nuxt-link to="/" class="button-link">
        <tiny-buttons-transparent label="Back to home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";

const buyTicketStore = useBuyTicketStore();
</script>

<style lang="scss" scoped>
.step-three {
  padding-top: 24px;

  .header {
    gap: 16px;
    .confirmed {
      @include size(56px);
      background-color: var(--color-green);
      border-radius: 50%;

      :deep(.icon) {
        svg {
          width: 22px;
          height: auto;
        }
      }
    }
    .label {
      color: var(--color-text-primary);
    }

    .sublabel {
      color: var(--color-text-secondary);
      max-width: 360px;
      text-align: center;
    }

    .order {
      padding: 6px 38px 4px;
      background-color: var(--color-bg-raised);
      border-radius: 999px;
    }
  }
  .buttons {
    gap: 12px;
    margin-top: 37px;
  }
}
</style>
