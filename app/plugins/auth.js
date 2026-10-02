import { useAuthStore } from "~/stores/common/auth";

export default defineNuxtPlugin(async () => {
  await useAuthStore().fetchMe();
});
