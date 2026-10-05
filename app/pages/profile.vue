<template>
  <div class="profile-page">
    <h1 class="title f-h1">My Profile</h1>

    <div class="modals flex-start align-center">
      <div
        @click="changeModalActive('information')"
        :class="[
          'modal f-label-m',
          {
            'is-active': !route.query.segment || activeModal == 'information',
          },
        ]"
      >
        Personal Information
      </div>
      <div
        @click="changeModalActive('tickets')"
        :class="[
          'modal f-label-m',
          {
            'is-active': activeModal == 'tickets',
          },
        ]"
      >
        My Tickets
      </div>
    </div>

    <pages-profile-form
      v-if="!route.query.segment || activeModal == 'information'"
    />

    <pages-profile-tickets v-else />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";

definePageMeta({ middleware: "auth" });

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const activeModal = ref(route.query.segment || "information");

const changeModalActive = (modal) => {
  activeModal.value = modal;

  router.replace({
    query: {
      ...route.query,
      segment: modal,
    },
  });
};

watch(
  () => authStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn) navigateTo("/");
  },
);
</script>

<style lang="scss" scoped>
.profile-page {
  padding: calc(var(--app-header-height) + 20px) 51px;
  width: 100%;
  min-height: 100vh;

  .title {
    color: var(--color-text-primary);
  }

  .modals {
    margin-top: 29px;
    padding-bottom: 2px;
    gap: 32px;
    border-bottom: 1px solid var(--color-bg-card);

    .modal {
      position: relative;
      color: var(--modal-color, var(--color-text-secondary));
      cursor: pointer;
      padding-bottom: 14px;
      @include default-transitions(color);

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        background-color: var(--color-red);
        opacity: var(--modal-line-opacity, 0);
        @include default-transitions(opacity);
      }

      &.is-active {
        --modal-color: var(--color-text-primary);
        --modal-line-opacity: 1;
      }
    }
  }
}
</style>
