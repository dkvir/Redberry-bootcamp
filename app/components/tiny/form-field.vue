<template>
  <div
    class="form-field"
    :class="{
      error: error,
      success: success && !error,
    }"
  >
    <label class="label f-label-s" :for="id">{{ label }}</label>

    <div class="control">
      <input
        :id="id"
        v-model="model"
        class="input f-label-s"
        :type="type"
        :placeholder="placeholder"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
        v-bind="$attrs"
      />

      <nuxt-icon v-if="error" name="alert" class="icon" aria-hidden="true" />
      <nuxt-icon
        v-else-if="success"
        name="check"
        class="icon"
        aria-hidden="true"
      />
    </div>

    <p v-if="error" :id="`${id}-error`" class="error f-label-s">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: String,
    default: "",
  },
  success: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: String, default: "" });

const id = useId();
</script>

<style lang="scss" scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .label {
    color: var(--color-text-primary);
  }

  .control {
    position: relative;
  }

  .input {
    width: 100%;
    height: 40px;
    padding: 0 48px 0 18px;
    border: 1px solid transparent;
    border-radius: 16px;
    outline: none;
    background-color: var(--color-bg-card);
    color: var(--color-text-primary);
    font: inherit;
    font-weight: 600;
    caret-color: var(--color-text-primary);
    transition:
      background-color 0.2s,
      border-color 0.2s;

    &::placeholder {
      color: var(--color-text-secondary);
    }

    &:hover:not(:focus) {
      background-color: var(--color-bg-raised);
    }

    &:focus {
      border-color: var(--color-text-disabled);
    }

    &:disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    font-size: 20px;
    pointer-events: none;
  }

  .error {
    margin: 0;
    font-weight: 600;
    color: var(--color-red);
  }

  &.error {
    .label,
    .input,
    .input::placeholder,
    .icon {
      color: var(--color-red);
    }

    .input,
    .input:focus {
      border-color: var(--color-red);
    }
  }

  &.success {
    .icon {
      color: var(--color-green);
    }
  }
}
</style>
