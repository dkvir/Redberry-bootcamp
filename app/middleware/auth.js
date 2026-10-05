import { useAuthStore } from "~/stores/common/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) return;

  if (import.meta.server) {
    return navigateTo({ path: "/", query: { login: to.fullPath } });
  }

  authStore.requireLogin(() => navigateTo(to.fullPath));
  return navigateTo("/");
});
