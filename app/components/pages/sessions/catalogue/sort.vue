<template>
  <div ref="root" class="sort">
    <div class="trigger flex align-center" @click="isOpen = !isOpen">
      <div class="title f-body-m">Sort:</div>
      <span class="name">{{ currentLabel }}</span>
      <nuxt-icon
        name="arrow-down"
        :class="['arrow-icon', { 'is-flipped': isOpen }]"
        filled
      />
    </div>

    <ul v-if="isOpen" class="filters flex-column">
      <li
        v-for="item in filterStore.sorts"
        :key="sortValue(item)"
        :class="[
          'filter f-body-m',
          { 'is-active': sortValue(item) === currentValue },
        ]"
        @click="select(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/stores/pages/sessions/filters";
import { onClickOutside } from "@vueuse/core";

const filterStore = useFiltersStore();

const root = ref(null);
const isOpen = ref(false);

const sortValue = (item) => item.id;

const currentValue = computed(() => filterStore.sort ?? "time_asc");

const currentLabel = computed(
  () =>
    filterStore.sorts.find((s) => sortValue(s) === currentValue.value)?.label ??
    "",
);

const select = (item) => {
  filterStore.setSort(sortValue(item));
  isOpen.value = false;
};

onClickOutside(root, () => (isOpen.value = false));
</script>

<style lang="scss" scoped>
.sort {
  position: relative;
  width: 250px;

  .trigger {
    gap: 8px;
    cursor: pointer;

    .title {
      color: var(--filter-color, var(--color-text-secondary));
    }
  }

  .arrow-icon.is-flipped {
    transform: rotate(180deg);
  }

  .filters {
    position: absolute;
    top: calc(100% + 20px);
    left: -20px;
    right: -20px;
    gap: 12px;
    background-color: var(--color-bg-card);
    padding: 20px;
    border-radius: 12px;
  }

  .filter {
    color: var(--filter-color, var(--color-text-secondary));
    @include default-transitions(color);
    cursor: pointer;

    &:hover,
    &.is-active {
      --filter-color: var(--color-text-primary);
    }
  }
}
</style>
