<template>
  <div ref="root" class="sort">
    <div class="trigger flex align-center" @click="isOpen = !isOpen">
      <div class="title">Sort:</div>
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

const filterStore = useFiltersStore();

const root = ref(null);
const isOpen = ref(false);

const sortValue = (item) => item.id;

const currentValue = computed(
  () => filterStore.sort ?? sortValue(filterStore.sorts[0] ?? {}),
);

const currentLabel = computed(
  () =>
    filterStore.sorts.find((s) => sortValue(s) === currentValue.value)?.label ??
    "",
);

const select = (item) => {
  filterStore.setSort(sortValue(item));
  isOpen.value = false;
};

const onOutsideClick = (e) => {
  if (root.value && !root.value.contains(e.target)) isOpen.value = false;
};

onMounted(() => document.addEventListener("click", onOutsideClick));
onBeforeUnmount(() => document.removeEventListener("click", onOutsideClick));
</script>

<style lang="scss" scoped>
.sort {
  position: relative;

  .trigger {
    gap: 8px;
    cursor: pointer;
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
