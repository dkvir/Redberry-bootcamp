<template>
  <div class="filters">
    <h3 class="title f-h3">Filters</h3>
    <div class="venues filter-box">
      <div class="label f-overline uppercase">VENUE</div>
      <ul class="list">
        <li v-for="venue in filterStore.venues" :key="venue.id" class="item">
          <tiny-checkbox-field
            :label="venue.name"
            :sublabel="venue.city"
            :isActive="filterStore.isSelected('venues', venue.slug)"
            @click="filterStore.toggle('venues', venue.slug)"
          />
        </li>
      </ul>
    </div>

    <div class="date filter-box">
      <div class="label f-overline uppercase">DATE</div>
      <pages-sessions-filters-dates
        :selectedDate="filterStore.date"
        @select-date="filterStore.setDate"
      />
    </div>

    <div class="format filter-box">
      <div class="label f-overline uppercase">FORMAT</div>
      <ul class="list">
        <li
          v-for="format in filterStore.availableFormats"
          :key="format.id"
          class="item"
        >
          <tiny-checkbox-field
            :label="format.name"
            :isActive="filterStore.isSelected('formats', format.slug)"
            @click="filterStore.toggle('formats', format.slug)"
          />
        </li>
      </ul>
    </div>

    <div class="languages filter-box">
      <div class="label f-overline uppercase">LANGUAGE</div>
      <ul class="list">
        <li v-for="lang in filterStore.languages" :key="lang.id" class="item">
          <tiny-checkbox-field
            :label="lang.name"
            :isActive="filterStore.isSelected('languages', lang.slug)"
            @click="filterStore.toggle('languages', lang.slug)"
          />
        </li>
      </ul>
    </div>

    <div class="timebands filter-box">
      <div class="label f-overline uppercase">TIME OF DAY</div>
      <ul class="list">
        <li
          v-for="timeBand in filterStore.timeBands"
          :key="timeBand.id"
          class="item"
        >
          <tiny-checkbox-field
            :label="formatLabel(timeBand.label).label"
            :sublabel="formatLabel(timeBand.label).sublabel"
            :isActive="filterStore.isSelected('timeBands', timeBand.id)"
            @click="filterStore.toggle('timeBands', timeBand.id)"
          />
        </li>
      </ul>
    </div>
    <div class="filtets-footer flex-column">
      <button
        class="clear-button f-label-s flex-center"
        :disabled="!filterStore.isDirty"
        @click="filterStore.reset()"
      >
        Clear filters
      </button>
      <div class="activefilter-count f-body-s label flex-center">
        {{ filterStore.activeCount }}
        {{ filterStore.activeCount === 1 ? "filter" : "filters" }} active
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/stores/pages/sessions/filters";

const filterStore = useFiltersStore();

const formatLabel = (str) => {
  const [label, sublabel] = str.split(" (");

  return {
    label,
    sublabel: sublabel?.replace(")", ""),
  };
};
</script>

<style lang="scss" scoped>
.filters {
  padding: 24px;
  width: 355px;
  height: fit-content;
  background-color: var(--color-bg-card);
  border-radius: 15px;

  .title {
    color: var(--color-text-primary);
  }

  .filter-box {
    margin-top: 24px;
    padding-bottom: 24px;
    width: 100%;
    border-bottom: 1px solid var(--color-bg-raised);
  }
  .label {
    color: var(--color-text-secondary);
  }
  .filtets-footer {
    margin-top: 24px;
    gap: 12px;

    .clear-button {
      width: 100%;
      height: 31px;
      border-radius: 999px;
      border: 1px solid var(--color-text-secondary);
      color: var(--color-text-primary);
      background-color: var(--button-color, transparent);
      opacity: var(--button-opacity, 1);
      pointer-events: all;
      cursor: pointer;
      @include default-transitions(background-color, opacity);

      &:disabled {
        --button-opacity: 0;
        pointer-events: none;
      }

      &:hover {
        --button-color: var(--color-tint-white);
      }
    }
  }
}
</style>
