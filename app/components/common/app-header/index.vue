<template>
  <div class="app-header flex justify-between">
    <div class="left-wrapper flex-center">
      <nuxt-link class="logo-link" to="/">
        <nuxt-icon name="logo" class="logo-icon" filled />
      </nuxt-link>
      <nuxt-link class="session-link f-overline" to="/sessions">
        sessions
      </nuxt-link>
    </div>
    <div class="right-wrapper flex-center">
      <common-app-header-search />
      <common-app-header-profile v-if="authStore.isLoggedIn" />
      <div v-else class="buttons flex-center">
        <tiny-buttons-primary label="Sign up" @click="openAuth('signup')" />
        <tiny-buttons-secondary label="Log in" @click="openAuth('login')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
const authStore = useAuthStore();

const openAuth = (state) => {
  authStore.changeActiveState(state);
  authStore.toggleAuthVisibility();
};
</script>

<style lang="scss" scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 8;
  width: 100vw;
  height: var(--app-header-height);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.51) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 30px 120px;

  .left-wrapper {
    margin-top: 10px;
    height: 22px;
    gap: 36px;
  }

  .logo-link {
    height: 100%;
    display: inline-block;
  }

  .session-link {
    color: var(--color-text-primary);
  }

  .right-wrapper {
    gap: 32px;
  }

  .buttons {
    gap: 12px;
  }
}
</style>
