export const useHomeStore = defineStore("homeStore", () => {
  const isLoading = ref(false);
  return { isLoading };
});
