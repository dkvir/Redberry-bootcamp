<template>
  <div class="search-focused flex-center flex-column">
    <div class="icon-frame flex-center">
      <nuxt-icon name="popcorn" class="popcorn-icon" filled />
    </div>
    <p class="label f-label-m">What do you want to watch?</p>
    <p class="sublabel f-body-m">Search by title, director or cast</p>
    <nuxt-link to="/sessions" class="sessions-link">
      <tiny-buttons-transparent label="Browse all sessions" />
    </nuxt-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search-focused {
  width: 100%;
  height: 100%;
  min-height: 248px;
  flex: 1;
  display: none;

  &.is-visible {
    display: flex;
  }

  .icon-frame {
    @include size(40px);
    border-radius: 50%;
    background-color: var(--color-tint-white);

    .popcorn-icon {
      @include size(24px);
    }
  }

  .label {
    margin-top: 20px;
    color: var(--color-text-primary);
  }

  .sublabel {
    margin-top: 6px;
    color: var(--color-text-secondary);
  }

  .sessions-link {
    margin-top: 22px;
  }
}
</style>
