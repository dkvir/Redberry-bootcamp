<template>
  <div
    :class="[
      'signup flex-column',
      { 'is-active': authStore.activeState == 'signup' },
    ]"
  >
    <div class="fields flex-column">
      <tiny-avatar-upload v-model="values.avatar" />

      <tiny-form-field
        v-model="values.name"
        label="Username"
        placeholder="User"
        :error="error('name')"
        :success="success('name')"
        @blur="touch('name')"
      />
      <tiny-form-field
        v-model="values.email"
        label="Email"
        placeholder="example@gmail.com"
        :error="error('email')"
        :success="success('email')"
        @blur="touch('email')"
      />
      <div class="passwords flex">
        <tiny-form-field
          v-model="values.password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          :error="error('password')"
          :success="success('password')"
          @blur="touch('password')"
        />
        <tiny-form-field
          v-model="values.confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          :error="error('confirmPassword')"
          :success="success('confirmPassword')"
          @blur="touch('confirmPassword')"
        />
      </div>
    </div>

    <div class="footer flex-center flex-column">
      <tiny-buttons-primary
        label="Sign up"
        :disabled="!isValid || isLoading"
        @click="submit"
      />
      <div class="go-to">
        <span class="question f-body-m">Already have an account?</span>
        <span
          @click="authStore.changeActiveState('login')"
          class="destination f-button"
          >Log in</span
        >
      </div>
      <p v-if="formError" class="form-error f-body-s">{{ formError }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
const authStore = useAuthStore();

const {
  values,
  error,
  success,
  isValid,
  touch,
  touchAll,
  setServerErrors,
  reset,
} = useForm(
  { avatar: null, name: "", email: "", password: "", confirmPassword: "" },
  {
    name: required("Username is required"),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (v, all) =>
      !v
        ? "Confirm your password"
        : v === all.password
          ? ""
          : "Passwords don't match",
  },
);

const FIELD_MAP = {
  username: "name",
  password_confirmation: "confirmPassword",
};

const isLoading = ref(false);
const formError = ref("");

async function submit() {
  touchAll();
  if (!isValid.value || isLoading.value) return;

  isLoading.value = true;
  formError.value = "";
  try {
    const body = new FormData();
    body.append("username", values.name);
    body.append("email", values.email);
    body.append("password", values.password);
    body.append("password_confirmation", values.confirmPassword);
    if (values.avatar) body.append("avatar", values.avatar);

    await authStore.register(body);
  } catch (e) {
    if (e.response?.status === 422) {
      const errs = e.data?.errors ?? {};
      formError.value =
        errs.avatar?.[0] ?? setServerErrors(errs, FIELD_MAP)[0] ?? "";
    } else {
      formError.value = e.data?.message || "Something went wrong. Try again.";
    }
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => authStore.isOpen,
  (open) => {
    if (!open) {
      reset();
      formError.value = "";
    }
  },
);
</script>

<style lang="scss" scoped>
.signup {
  display: none;
  pointer-events: none;
  gap: 32px;
  margin-top: 24px;

  &.is-active {
    display: flex;
    pointer-events: all;
  }

  .passwords {
    gap: 12px;
  }
}
</style>
