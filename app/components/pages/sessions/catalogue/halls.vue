<template>
  <div class="halls-frame">
    <ul class="halls flex align-center">
      <li v-for="session in item.sessions" :key="session.id" class="hall">
        <nuxt-link
          :to="`/sessions/${session.movie.slug}`"
          :class="[
            'hall-link flex-column justify-between',
            { 'is-sold-out': session.isSoldOut },
          ]"
          :tabindex="session.isSoldOut ? -1 : undefined"
          :aria-disabled="session.isSoldOut"
          @click.capture="onSelect($event, session)"
        >
          <div class="header flex-center justify-between">
            <div class="time f-h3">{{ formatTime(session.startsAt) }}</div>
            <div class="format f-label-s">{{ session.format.name }}</div>
          </div>
          <div class="info flex-column">
            <div class="language flex-center justify-between">
              <div class="lang f-body-s">{{ session.language.name }}</div>
              <div class="tickets-count flex-center">
                <nuxt-icon name="ticket" class="icon" aria-hidden="true" />
                <span class="span f-body-s">{{ session.seatsLeft }}</span>
              </div>
            </div>

            <div class="venue flex-center justify-between">
              <div class="ven f-label-s">
                {{ session.venue.name }} · Hall {{ session.hall.name }}
              </div>
              <div class="price f-button">₾{{ session.price }}</div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
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

function formatTime(dateString) {
  return dateString.slice(11, 16);
}

function onSelect(event, session) {
  if (session.isSoldOut) {
    event.preventDefault();
    return;
  }

  if (!authStore.isLoggedIn) {
    event.preventDefault();
    authStore.requireLogin(() => {
      buyTicketStore.open(session);
      navigateTo(`/sessions/${session.movie.slug}`);
    });
    return;
  }

  buyTicketStore.open(session);
}
</script>

<style lang="scss" scoped>
.halls-frame {
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 32px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .halls {
    gap: 12px;
    flex-wrap: nowrap;
    width: max-content;
  }

  .hall {
    flex-shrink: 0;
    padding: 15px;
    width: 260px;
    height: 110px;
    border-radius: 16px;
    background-color: var(--color-bg-card);
    border: 2px solid var(--border-color, transparent);
    @include default-transitions(border);

    &:hover {
      --border-color: var(--color-bg-raised);
    }
  }

  .hall-link {
    gap: 12px;

    &.is-sold-out {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .header {
    color: var(--color-text-primary);

    .format {
      background-color: var(--color-bg-raised);
      border-radius: 999px;
      padding: 6px 14px;
    }
  }

  .info {
    gap: 10px;

    .lang {
      color: var(--color-text-secondary);
    }

    .tickets-count {
      gap: 4px;
      color: var(--color-green);

      .icon {
        :deep(svg) {
          @include size(12px);
          path {
            fill: var(--color-green);
          }
        }
      }
    }

    .venue {
      color: var(--color-text-primary);
    }
  }
}
</style>
