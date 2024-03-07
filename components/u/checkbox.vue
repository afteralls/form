<template>
  <USpace display="row" gap="sm" :class="{ checkbox: true, disabled: disabled }">
    <input
      :id="name"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <USpace block="def" class="box" mode="center">
      <UIcon name="fluent-mdl2:skype-check" size="cb" />
    </USpace>
    <slot />
  </USpace>
</template>

<script setup lang="ts">
defineProps<{ name: string; modelValue: boolean; disabled?: boolean }>()
defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
</script>

<style scoped lang="scss">
.checkbox {
  position: relative;
  align-items: flex-start;
}

.box {
  @include ui-styles;
  padding: 0;
  width: var(--action-size);
  min-width: var(--action-size);
  height: var(--action-size);
  background-color: var(--fg-s);
  border-radius: toRem(5);
  position: relative;
  transition:
    background-color var(--tr),
    transform var(--tr);

  svg {
    opacity: 0;
    color: var(--bg);
  }
}

input {
  position: absolute;
  width: var(--action-size);
  height: var(--action-size);
  opacity: 0;
  z-index: 1;
  cursor: pointer;

  &:checked + .box {
    background-color: var(--m);

    svg {
      opacity: 1;
    }
  }

  &:hover + .box,
  &:focus + .box {
    border-color: var(--m);
  }
}

.disabled {
  &,
  svg,
  input {
    cursor: not-allowed;
  }

  input:hover + .box,
  input:focus + .box {
    border-color: var(--br);
  }
}
</style>
