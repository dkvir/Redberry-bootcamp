<template>
  <div class="tickets"></div>
</template>

<script setup>
import { useProfileStore } from "~/stores/pages/profile";

const profileStore = useProfileStore();

await useAsyncData("profile-tickets", () =>
  Promise.all([
    profileStore.fetchTickets("upcoming"),
    profileStore.fetchTickets("past"),
  ]),
);
</script>

<style lang="scss" scoped></style>
