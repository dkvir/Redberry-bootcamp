<template>
  <div ref="searchRef" class="search">
    <div class="input-frame flex-center">
      <nuxt-icon name="search" class="search-icon" filled />
      <input
        ref="inputRef"
        :value="term"
        @input="store.setTerm($event.target.value)"
        @focus="store.open()"
        @keydown.esc="store.close()"
        class="input f-body-m"
        type="text"
        placeholder="Search films and live events"
      />
      <nuxt-icon
        @mousedown.prevent
        @click="onClear"
        name="close"
        :class="['close-icon', { 'is-visible': term }]"
        filled
      />
    </div>
    <div :class="['result-frame flex-column', { 'is-visible': isVisible }]">
      <common-app-header-search-focused
        :class="{ 'is-visible': showFocused }"
      />
      <common-app-header-search-results
        :results="results"
        :class="{ 'is-visible': showResults }"
      />
      <common-app-header-search-not-found
        :searchTerm="term.trim()"
        :class="{ 'is-visible': showNotFound }"
      />
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/stores/common/search";
import { onClickOutside } from "@vueuse/core";

const store = useSearchStore();
const { term, results, isVisible, showFocused, showResults, showNotFound } =
  storeToRefs(store);

const route = useRoute();

const inputRef = ref(null);
const searchRef = ref(null);

onClickOutside(searchRef, () => store.close());

function onClear() {
  store.clear();
  inputRef.value?.focus();
}

watch(
  () => route.fullPath,
  () => {
    store.clear();
    store.close();
  },
);
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 380px;
  height: 41px;

  .input-frame {
    padding: 0 12px;
    height: 100%;
    background-color: var(--color-tint-white);
    gap: 4px;
    border-radius: 999px;

    .search-icon {
      @include size(14px);
    }

    .input {
      color: var(--color-text-primary);
      &::placeholder {
        color: var(--color-text-primary);
        opacity: 1;
      }
    }

    .close-icon {
      @include size(24px);
      opacity: 0;
      pointer-events: none;
      cursor: pointer;
      @include default-transitions(opacity);

      &.is-visible {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  .result-frame {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    padding: 8px;
    width: 100%;
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
  }
}
</style>
