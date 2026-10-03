<template>
  <div
    :class="[
      'full-info',
      {
        'is-visible': fullInfoVisible,
      },
    ]"
  >
    <div class="frame">
      <div class="header flex-start align-center">
        <common-app-header-profile-avatar :user="authStore.user" />
        <div class="info flex-column">
          <p class="name f-label-m">
            {{ authStore.user.username }}
          </p>
          <p class="email f-body-s">{{ authStore.user.email }}</p>
        </div>
      </div>

      <div
        :class="['status', { 'is-complete': authStore.user.profileComplete }]"
      >
        <div
          v-if="authStore.user.profileComplete"
          class="complete flex align-center"
        >
          <p class="label f-label-m">Profile Complete</p>
          <nuxt-icon name="check" class="icon" aria-hidden="true" />
        </div>
        <div v-else class="incomlete">
          <p class="label f-label-m">Profile incomplete</p>
          <p class="description f-body-s">
            Please complete your profile to enable booking
          </p>
        </div>
      </div>
    </div>
    <nuxt-link
      to="/profile?segment=information"
      class="profile button flex align-center"
    >
      <nuxt-icon name="person" class="icon" aria-hidden="true" />
      <span class="span f-label-m"> My Profile </span>
    </nuxt-link>

    <nuxt-link
      to="/profile?segment=tickets"
      class="tickets button flex align-center"
    >
      <nuxt-icon name="ticket" class="icon" aria-hidden="true" />
      <span class="span f-label-m"> My Tickets </span>
    </nuxt-link>

    <div class="separator"></div>

    <button @click="authStore.logout" class="logout button flex align-center">
      <nuxt-icon name="logout" class="icon" aria-hidden="true" />
      <span class="span f-label-m"> Log out </span>
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";

const props = defineProps({
  fullInfoVisible: {
    type: Boolean,
    required: true,
  },
});

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.full-info {
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  padding-bottom: 10px;
  transform: translate(-50%, 0);
  width: 350px;
  background-color: var(--color-bg-page);
  border-radius: 16px;
  border: 1px solid var(--color-bg-raised);
  opacity: var(--result-frame-opacity, 0);
  pointer-events: none;
  @include default-transitions(opacity);

  &.is-visible {
    --result-frame-opacity: 1;
    pointer-events: auto;
  }

  .frame {
    padding: 20px 20px 0;
    width: 100%;
  }

  .header {
    gap: 5px;
  }

  .info {
    gap: 2px;
    .name {
      color: var(--color-text-primary);
    }

    .email {
      color: var(--color-text-secondary);
    }
  }

  .status {
    margin-top: 16px;
    padding: 10px 12px;
    background-color: var(--status-bg, var(--color-tint-orange));
    border-radius: 10px;

    &.is-complete {
      --status-bg: var(--color-tint-green);
      --label-color: var(--color-green);
    }

    .complete {
      gap: 6px;

      :deep(.icon) {
        path {
          stroke: var(--color-green);
        }
      }
    }

    .label {
      color: var(--label-color, var(--color-orange));
    }

    .description {
      margin-top: 5px;
      color: var(--color-text-secondary);
    }
  }

  .button {
    padding: 12px 20px;
    gap: 8px;
    width: 100%;
    background-color: var(--button-bg, transparent);
    cursor: pointer;
    color: var(--color-text-primary);
    @include default-transitions(background-color);

    &:hover {
      --button-bg: var(--color-bg-card);
    }

    &.profile {
      margin-top: 8px;
    }
  }
  .separator {
    width: 100%;
    height: 1px;
    margin: 4px 0;
    background-color: var(--color-tint-white);
  }
}
</style>
