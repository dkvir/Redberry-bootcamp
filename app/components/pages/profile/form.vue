<template>
  <form class="form flex-column" novalidate @submit.prevent="submit">
    <tiny-form-field
      v-model="values.fullName"
      label="Full Name"
      :error="error('fullName')"
      :success="success('fullName')"
      @blur="touch('fullName')"
    />
    <tiny-form-field
      :model-value="user?.email ?? ''"
      label="Email"
      type="email"
      disabled
    />
    <tiny-form-field
      v-model="values.mobileNumber"
      label="Mobile Number"
      type="tel"
      :error="error('mobileNumber')"
      :success="success('mobileNumber')"
      @blur="touch('mobileNumber')"
    />
    <tiny-form-field
      v-model="values.dateOfBirth"
      label="Date of Birth"
      type="date"
      :error="error('dateOfBirth')"
      :success="success('dateOfBirth')"
      @blur="touch('dateOfBirth')"
    />

    <p :class="['message f-label-s', message.type]" role="status">
      {{ message.text }}
    </p>

    <tiny-buttons-primary
      label="Save changes"
      :disabled="!canSave"
      @click="submit"
    />
  </form>
</template>

<script setup>
import { useProfileStore } from "~/stores/pages/profile";
import { useAuthStore } from "~/stores/common/auth";

const profileStore = useProfileStore();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const message = ref({ type: "", text: "fill the form" });

const {
  values,
  error,
  success,
  isValid,
  touch,
  touchAll,
  untouchAll,
  setServerErrors,
} = useForm(
  {
    fullName: authStore.user?.fullName ?? "",
    mobileNumber: authStore.user?.mobileNumber ?? "",
    dateOfBirth: authStore.user?.dateOfBirth ?? "",
  },
  {
    fullName: validateFullName,
    mobileNumber: validateMobile,
    dateOfBirth: validateBirthDate,
  },
);

const saved = ref({ ...values });
const isDirty = computed(() =>
  Object.keys(saved.value).some((k) => values[k] !== saved.value[k]),
);
const canSave = computed(
  () => isDirty.value && isValid.value && !profileStore.loading,
);

const submit = async () => {
  touchAll();
  if (!canSave.value) return;

  message.value = { type: "", text: "fill the form" };

  const ok = await profileStore.updateProfile({
    ...values,
    mobileNumber: values.mobileNumber.replace(/\s/g, ""),
  });

  untouchAll();

  if (ok) {
    saved.value = { ...values };
    message.value = { type: "success", text: "Profile updated successfully" };
  } else {
    const leftover = setServerErrors(profileStore.errors);
    message.value = {
      type: "error",
      text: leftover[0] ?? "Failed to update profile",
    };
  }
};

watch(values, () => {
  message.value = { type: "", text: "fill the form" };
});
</script>

<style lang="scss" scoped>
.form {
  margin-top: 42px;
  max-width: 880px;

  .form-field {
    @include list-distance(top, 18px);
  }

  .message {
    padding: 12px 0;
    opacity: var(--message-opacity, 0);
    transition: opacity 0.2s;

    &.success,
    &.error {
      --message-opacity: 1;
    }

    &.success {
      color: var(--color-green);
    }

    &.error {
      color: var(--color-red);
    }
  }

  .button-primary {
    width: fit-content;
  }
}
</style>
