export const useAuthStore = defineStore("authStore", () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const isOpen = ref(false);
  const activeState = ref("login");
  const user = ref(null);
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  const isLoggedIn = computed(() => !!user.value);

  const toggleAuthVisibility = (value = !isOpen.value) => {
    isOpen.value = value;
  };

  const changeActiveState = (state) => {
    activeState.value = state;
  };

  const call = (path, { method = "GET", body, auth = true } = {}) =>
    $fetch(path, {
      baseURL: apiBase,
      method,
      body,
      headers: {
        Accept: "application/json",
        ...(auth && token.value && { Authorization: `Bearer ${token.value}` }),
      },
    });

  const startSession = ({ data }) => {
    token.value = data.token;
    user.value = data.user;
    toggleAuthVisibility(false);
  };

  const clearSession = () => {
    token.value = null;
    user.value = null;
  };

  const login = async (credentials) =>
    startSession(
      await call("/login", { method: "POST", body: credentials, auth: false }),
    );

  const register = async (formData) =>
    startSession(
      await call("/register", { method: "POST", body: formData, auth: false }),
    );

  const fetchMe = async () => {
    if (!token.value) return;
    try {
      user.value = (await call("/me")).data;
    } catch (e) {
      if (e.response?.status === 401) clearSession();
    }
  };

  const logout = async () => {
    try {
      await call("/logout", { method: "POST" });
    } catch {
    } finally {
      clearSession();
    }
  };

  return {
    isOpen,
    activeState,
    user,
    token,
    isLoggedIn,
    toggleAuthVisibility,
    changeActiveState,
    login,
    register,
    fetchMe,
    logout,
  };
});
