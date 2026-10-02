<template>
  <div class="avatar-upload flex">
    <button type="button" class="picker" @click="inputRef.click()">
      <img v-if="previewUrl" :src="previewUrl" alt="" class="preview" />
      <nuxt-icon v-else name="upload" aria-hidden="true" />
    </button>

    <input
      ref="inputRef"
      type="file"
      class="file"
      accept="image/jpeg,image/png,image/webp"
      @change="onChange"
    />

    <div class="info flex-column">
      <span class="title f-button">Upload avatar (optional)</span>
      <span class="hint f-body-s">JPG, PNG or WEBP</span>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ default: null });
const inputRef = ref(null);
const previewUrl = ref("");

watch(
  model,
  (file) => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = file ? URL.createObjectURL(file) : "";
  },
  { immediate: true },
);

function onChange(e) {
  model.value = e.target.files[0] ?? null;
  e.target.value = "";
}

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});
</script>

<style lang="scss" scoped>
.avatar-upload {
  align-items: center;
  gap: 16px;

  .picker {
    @include size(40px);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background-color: var(--color-bg-card);
    color: var(--color-text-secondary);
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-bg-raised);
    }
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file {
    display: none;
  }

  .info {
    gap: 4px;
  }

  .title {
    color: var(--color-text-primary);
  }

  .hint {
    color: var(--color-text-secondary);
  }
}
</style>
