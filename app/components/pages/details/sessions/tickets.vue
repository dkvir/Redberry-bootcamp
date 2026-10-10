<template>
  <ul class="tickets flex">
    <li
      v-for="session in item.sessions"
      :key="session.id"
      @click="openBuyTicket(session)"
      class="ticket flex"
    >
      <div class="wrapper left flex-center flex-column">
        <div class="circle"></div>
        <p class="starts-at f-h2">{{ formatTime(session.startsAt) }}</p>
        <div class="footer flex-center">
          <span class="span f-body-s uppercase">{{
            session.language.code
          }}</span>
          <div class="chip f-label-s uppercase">{{ session.format.name }}</div>
        </div>
      </div>
      <div class="wrapper right flex-center flex-column">
        <p class="price f-h2">₾ {{ session.price }}</p>
        <div class="footer flex-center">
          <nuxt-icon name="ticket" class="icon" />
          <span class="span f-body-s">{{ session.seatsLeft }} left</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";
import { useAuthStore } from "~/stores/common/auth";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const buyTicketStore = useBuyTicketStore();
const authStore = useAuthStore();

const openBuyTicket = (session) => {
  const openModal = () => {
    buyTicketStore.setSession(session);
    buyTicketStore.open(session);
  };

  if (authStore.isLoggedIn) openModal();
  else authStore.requireLogin(openModal);
};

function formatTime(dateString) {
  return dateString.slice(11, 16);
}
</script>

<style lang="scss" scoped>
.tickets {
  gap: 10px;

  .ticket {
    width: 270px;
    height: 81px;
    background-color: var(--color-bg-page);
    border-radius: 8px;

    .wrapper {
      position: relative;
      gap: 8px;
      padding: 15px 20px;
      &.left {
        flex: 1;
        min-width: 0;
        border-right: 1px dashed var(--color-text-primary);
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          transform: translate(50%, 50%);
          @include size(20px);
          border-radius: 50%;
          background-color: var(--color-bg-card);
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          @include size(20px);
          border-radius: 50%;
          background-color: var(--color-bg-card);
        }
      }
    }

    .footer {
      gap: 6px;
      color: var(--color-text-secondary);
    }

    .chip {
      background-color: var(--color-bg-card);
      border-radius: 999px;
      padding: 6px 14px;
    }

    .price {
      color: var(--color-red);
    }
  }
}
</style>
