<template>
  <div
    :class="[
      'login flex-column',
      { 'is-active': authStore.activeState == 'login' },
    ]"
  >
    <div class="fields flex-column">
      <tiny-form-field
        v-model="values.email"
        label="Email"
        placeholder="example@gmail.com"
        :error="error('email')"
        @blur="touch('email')"
      />
      <tiny-form-field
        v-model="values.password"
        label="Password"
        type="password"
        placeholder="Enter Password"
        :error="error('password')"
        @blur="touch('password')"
      />
    </div>

    <div class="footer flex-column flex-center">
      <tiny-buttons-primary
        label="Log in"
        :disabled="!isValid || isLoading"
        @click="submit"
      />
      <div class="go-to">
        <span class="question f-body-m">Don't have an account?</span>
        <span
          @click="authStore.changeActiveState('signup')"
          class="destination f-button"
          >Sign up</span
        >
      </div>
      <p v-if="formError" class="form-error f-body-s">{{ formError }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/common/auth";
const authStore = useAuthStore();

const { values, error, isValid, touch, touchAll, setServerErrors, reset } =
  useForm(
    { email: "", password: "" },
    { email: validateEmail, password: required("Password is required") },
  );

const isLoading = ref(false);
const formError = ref("");

async function submit() {
  touchAll();
  if (!isValid.value || isLoading.value) return;

  isLoading.value = true;
  formError.value = "";
  try {
    await authStore.login({ email: values.email, password: values.password });
  } catch (e) {
    if (e.response?.status === 422) {
      formError.value = setServerErrors(e.data?.errors)[0] ?? "";
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
.login {
  display: none;
  pointer-events: none;
  gap: 32px;
  margin-top: 24px;

  &.is-active {
    display: flex;
    pointer-events: all;
  }
}
</style>
