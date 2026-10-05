import { useAuthStore } from "~/stores/common/auth";

export const useProfileStore = defineStore("profileStore", () => {
  const authStore = useAuthStore();

  const profile = ref(null);
  const errors = ref({});
  const loading = ref(false);

  const updateProfile = async (form) => {
    loading.value = true;
    errors.value = {};

    const body = new FormData();
    ["fullName", "mobileNumber", "dateOfBirth", "preferredVenueId"].forEach(
      (key) => {
        if (form[key] !== undefined && form[key] !== null && form[key] !== "") {
          body.append(key, form[key]);
        }
      },
    );
    if (form.avatar instanceof File) body.append("avatar", form.avatar);

    try {
      const res = await authStore.call("/profile", { method: "PUT", body });
      profile.value = res.data;
      await authStore.fetchMe();
      return true;
    } catch (e) {
      const status = e.response?.status;
      if (status === 401) {
        authStore.requireLogin(() => updateProfile(form));
      } else if (status === 422) {
        errors.value = e.data?.errors ?? {};
      }
      return false;
    } finally {
      loading.value = false;
    }
  };

  //tickets
  const tickets = ref({ upcoming: [], past: [] });
  const ticketsLoading = ref(false);

  const fetchTickets = async (filter) => {
    ticketsLoading.value = true;

    try {
      const res = await authStore.call(`/tickets?filter=${filter}`);
      tickets.value[filter] = res.data;
      return true;
    } catch (e) {
      if (e.response?.status === 401) {
        authStore.requireLogin(() => fetchTickets(filter));
      }
      return false;
    } finally {
      ticketsLoading.value = false;
    }
  };

  return {
    profile,
    errors,
    loading,
    updateProfile,
    tickets,
    ticketsLoading,
    fetchTickets,
  };
});
