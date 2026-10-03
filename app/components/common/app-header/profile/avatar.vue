<template>
  <div class="avatar flex-center">
    <img v-if="user.avatar" class="img" :src="user.avatar" alt="" />
    <p class="initials f-label-s uppercase">
      {{ user.username.slice(0, 1) }}
    </p>
    <div
      :class="[
        'circle',
        {
          'is-completed': user.profileComplete,
        },
      ]"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
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
</style>
