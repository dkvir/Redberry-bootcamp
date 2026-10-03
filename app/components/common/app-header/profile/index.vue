<template>
  <div ref="profileRef" class="profile">
    <div @click="clickSmallInfo" class="small-info flex-center">
      <common-app-header-profile-avatar :user="authStore.user" />
      <div class="name flex-center">
        <span class="span f-label-m">{{ authStore.user.username }}</span>

        <nuxt-icon
          name="arrow-down"
          :class="[
            'arrow-icon',
            {
              'is-flipped': fullInfoVisible,
            },
          ]"
          filled
        />
      </div>
    </div>
    <common-app-header-profile-full-info
      :user="authStore.user"
      :fullInfoVisible="fullInfoVisible"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
import { onClickOutside } from "@vueuse/core";
import auth from "~/plugins/auth";

const authStore = useAuthStore();

const fullInfoVisible = ref(false);
const profileRef = ref(null);

onClickOutside(profileRef, () => (fullInfoVisible.value = false));

const clickSmallInfo = () => {
  fullInfoVisible.value = !fullInfoVisible.value;
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  .small-info {
    gap: 10px;
    cursor: pointer;

    .name {
      gap: 24px;
    }

    .arrow-icon {
      height: 16px;
      transform: rotate(var(--icon-rotation, 0deg));
      @include default-transitions(transform);

      &.is-flipped {
        --icon-rotation: 180deg;
      }
    }
  }
}
</style>
