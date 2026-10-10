import { useFiltersStore } from "~/stores/pages/sessions/filters";

export default defineNuxtPlugin(async () => {
  await useFiltersStore().fetchOptions();
});
