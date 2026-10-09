<template>
  <ul class="states flex-center">
    <li
      @click="profileStore.changeActiveState('upcoming')"
      :class="[
        'state f-label-m flex-center',
        {
          'is-active': profileStore.activeState == 'upcoming',
        },
      ]"
    >
      <p class="label">Upcoming</p>
      <p class="count">{{ profileStore.tickets.upcoming.length }}</p>
    </li>
    <li
      @click="profileStore.changeActiveState('past')"
      :class="[
        'state f-label-m flex-center',
        {
          'is-active': profileStore.activeState == 'past',
        },
      ]"
    >
      <p class="label">Past</p>
      <p class="count">{{ profileStore.tickets.past.length }}</p>
    </li>
  </ul>
</template>

<script setup>
import { useProfileStore } from "~/stores/pages/profile";

const profileStore = useProfileStore();
</script>

<style lang="scss" scoped>
.states {
  padding: 5px;
  display: inline-flex;
  background-color: var(--color-text-disabled);
  border-radius: 12px;

  .state {
    gap: 8px;
    padding: 7px 14px;
    color: var(--state-color, var(--color-text-secondary));
    background-color: var(--state-bg, transparent);
    border-radius: 10px;
    cursor: pointer;
    @include default-transitions(background-color);

    &.is-active {
      --state-color: var(--color-text-primary);
      --state-bg: var(--color-bg-raised);
    }
  }
}
</style>
