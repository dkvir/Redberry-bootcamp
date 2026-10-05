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

  const pendingAction = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  const toggleAuthVisibility = (value = !isOpen.value) => {
    isOpen.value = value;

    if (!value) pendingAction.value = null;
  };

  const requireLogin = (onSuccess) => {
    pendingAction.value = onSuccess;
    activeState.value = "login";
    isOpen.value = true;
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
    const action = pendingAction.value;
    toggleAuthVisibility(false);
    action?.();
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

  const age = computed(() => {
    const dob = user.value?.dateOfBirth;
    if (!dob) return null;

    const birth = new Date(dob);
    if (isNaN(birth)) return null;

    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      years--;
    }
    return years;
  });

  return {
    isOpen,
    activeState,
    user,
    token,
    isLoggedIn,
    toggleAuthVisibility,
    requireLogin,
    changeActiveState,
    login,
    register,
    fetchMe,
    logout,
    call,
    age,
  };
});
