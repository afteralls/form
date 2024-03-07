<template>
  <button
    :disabled="disabled || loading"
    :class="[mode]"
    :title="title"
    @click.prevent="$emit('trigger')"
  >
    <USpace mode="center" style="position: relative; pointer-events: none">
      <UIcon v-if="loading" :name="ICON_LOADING_CIRCLE" style="position: absolute" />
      <UIcon v-if="icon" :name="icon" />
      <div v-else :style="loading ? `visibility: hidden` : null">
        {{ mode !== 'icon' ? title : null }}
      </div>
    </USpace>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    mode?: 'button' | 'icon'
    disabled?: boolean
    icon?: string
    loading?: boolean
  }>(),
  { mode: 'button', icon: undefined }
)

defineEmits<{ (e: 'trigger'): void }>()
</script>

<style scoped lang="scss">
button {
  @include ui-styles;
  cursor: pointer;

  svg {
    pointer-events: none;
  }

  &:active {
    transform: var(--scale);
  }

  &:disabled {
    filter: grayscale(100);
    cursor: not-allowed !important;
  }
}

.button {
  background-color: var(--m-h);
  font-size: toRem(12);
  font-weight: 400;
  line-height: toRem(19);
  letter-spacing: -0.0015em;
  text-align: left;
  color: var(--txt-btn);
  transition:
    background-color var(--tr),
    filter var(--tr),
    transform var(--tr);

  &:hover,
  &:focus {
    background-color: var(--m-tp);
  }
}

.icon {
  background-color: transparent;
  padding: 0;
  color: var(--txt-s);
  height: auto;

  &:hover,
  &:focus {
    filter: drop-shadow(0 0 toRem(5) var(--m));
  }
}
</style>
