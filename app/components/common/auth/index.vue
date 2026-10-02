<template>
  <div :class="['auth flex-center', { 'is-visible': authStore.isOpen }]">
    <div class="bg-blur"></div>
    <div ref="contentRef" :class="['content', authStore.activeState]">
      <div class="header flex justify-between">
        <div class="info flex-column">
          <h2 class="label f-h2">
            {{ authStore.activeState == "login" ? "Login" : "Sign up" }}
          </h2>
          <p class="description f-body-s">Welcome back to Kino XII</p>
        </div>
        <div class="close-button">
          <nuxt-icon
            name="close-auth"
            @click="authStore.toggleAuthVisibility()"
          />
        </div>
      </div>
      <common-auth-login />
      <common-auth-signup />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
const authStore = useAuthStore();
import { onClickOutside } from "@vueuse/core";

const contentRef = ref(null);

onClickOutside(contentRef, () => {
  if (authStore.isOpen) authStore.toggleAuthVisibility(false);
});

watch(
  () => authStore.isOpen,
  (isOpen) => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  },
);

onBeforeUnmount(() => {
  document.documentElement.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  transition-duration: 0.15s;

  &.is-visible {
    --auth-opacity: 1;
    --bg-blur: 10px;
    --bg-color: var(--color-chaos);
    pointer-events: auto;
  }

  .bg-blur {
    position: absolute;
    inset: 0;
    background-color: var(--bg-color, transparent);
    backdrop-filter: blur(var(--bg-blur, 0px));
    z-index: -1;
    @include default-transitions(backdrop-filter, background-color);
  }
  :deep(.content) {
    padding: 32px;
    border-radius: 28px;
    border: 1px solid var(--color-bg-raised);
    background-color: var(--color-bg-page);
    opacity: var(--auth-opacity, 0);
    @include default-transitions(opacity, min-width, min-height);

    &.login {
      min-width: 403px;
      min-height: 420px;
    }
    &.signup {
      min-width: 475px;
      min-height: 558px;
    }

    .header {
      .info {
        gap: 8px;
      }

      .description {
        color: var(--color-text-secondary);
      }

      .close-button {
        @include size(24px);
        transform: rotate(var(--close-rotation, 0));
        cursor: pointer;
        @include default-transitions(transform);

        &:hover {
          --close-rotation: 180deg;
        }
      }
    }

    .fields {
      gap: 24px;
    }

    .footer {
      gap: 24px;
      .button-primary {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
      }

      .destination {
        margin-left: 5px;
        color: var(--color-red);
        cursor: pointer;
        opacity: var(--dest-opacity, 1);
        @include default-transitions(opacity);

        &:hover {
          --dest-opacity: 0.8;
        }
      }
      .form-error {
        margin-top: 10px;
        color: var(--color-red);
      }
    }
  }
}
</style>
