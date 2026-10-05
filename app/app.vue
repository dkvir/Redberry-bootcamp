<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const redirectTo = route.query.login;
  if (!redirectTo || authStore.isLoggedIn) return;

  authStore.requireLogin(() => navigateTo(redirectTo));
  router.replace({ query: { ...route.query, login: undefined } });
});
</script>
