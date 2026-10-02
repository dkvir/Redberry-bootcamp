<template>
  <div class="profile">
    <div class="small-info flex-center">
      <div class="avatar flex-center">
        <img
          v-if="authStore.user.avatar"
          class="img"
          :src="authStore.user.avatar"
          alt=""
        />
        <p class="initials f-label-s uppercase">
          {{ authStore.user.username.slice(0, 1) }}
        </p>
        <div
          :class="[
            'circle',
            {
              'is-completed': authStore.user.profileComplete,
            },
          ]"
        ></div>
      </div>

      <div class="name flex-center">
        <span class="span f-label-m">{{ authStore.user.username }}</span>

        <nuxt-icon name="arrow-down" class="arrow-icon" filled />
      </div>
    </div>
    <div class="full-info"></div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
const authStore = useAuthStore();

const fullInfoVisible = ref(false);
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  .small-info {
    gap: 10px;
    cursor: pointer;

    .avatar {
      position: relative;
      @include size(40px);
      background-color: var(--color-bg-card);
      border-radius: 8px;

      .img {
        @include size(100%);
        object-fit: contain;
      }

      .circle {
        position: absolute;
        bottom: 0;
        right: 0;
        @include size(8px);
        border-radius: 50%;
        border: 1px solid var(--color-bg-page);
        background-color: var(--circle-bg, var(--color-orange));
        @include default-transitions(background-color);

        &.is-completed {
          --circle-bg: var(--color-green);
        }
      }
    }

    .name {
      gap: 24px;
    }
  }
}
</style>
