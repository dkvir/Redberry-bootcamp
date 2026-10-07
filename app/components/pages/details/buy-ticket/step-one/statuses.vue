<template>
  <ul class="statuses flex-center">
    <li class="status flex-center">
      <div class="box available"></div>
      <div class="label f-body-s">Available</div>
    </li>
    <li class="status flex-center">
      <div class="box selected"></div>
      <div class="label f-body-s">Selected</div>
    </li>
    <li class="status flex-center">
      <div class="box sold"></div>
      <div class="label f-body-s">Sold</div>
    </li>
    <li class="status flex-center">
      <div class="box held"></div>
      <div class="label f-body-s">Held by another user</div>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
.statuses {
  margin-top: 32px;
  gap: 24px;

  .status {
    gap: 8px;
  }

  .label {
    color: var(--color-text-secondary);
  }

  .box {
    @include size(16px);
    background-color: var(--box-bg, var(--color-bg-card));
    border: 1px solid var(--color-text-disabled);
    border-radius: 5px;

    &.selected {
      --box-bg: var(--color-red);
    }

    &.sold {
      --box-bg: var(--color-bg-card);
    }

    &.held {
      background-image: url("/images/sold-pattern.svg");
      background-size: 16px 16px;
      background-repeat: no-repeat;
    }
  }
}
</style>
