<template>
  <USpace display="row" gap="bit" class="toggle">
    <input
      :id="name"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <div class="toggler"></div>
    <USpace display="col" gap="sm">
      <UText type="p" :text="title" />
      <UText :for="name" gray :text="desc" />
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  modelValue: boolean
  title: string
  desc: string
  disabled?: boolean
}>()
defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
</script>

<style scoped lang="scss">
.toggle {
  position: relative;
  align-items: flex-start;
}

input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;

  &:hover + .toggler::before,
  &:focus + .toggler::before {
    box-shadow: 0 0 var(--space-m) var(--m);
  }

  &:checked + .toggler::before {
    transform: translateX(106%);
  }

  &:checked + .toggler {
    background-color: var(--m);
  }
}

$width: toRem(39);

.toggler {
  display: flex;
  align-items: center;
  position: relative;
  height: var(--action-size);
  border-radius: toRem(100);
  width: $width;
  min-width: $width;
  background-color: var(--fg-s);
  transition: background-color var(--tr);

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    height: var(--action-size);
    border-radius: 100%;
    border: toRem(1) solid var(--br);
    width: var(--action-size);
    background-color: var(--bg);
    transition:
      transform var(--tr),
      box-shadow var(--tr),
      background-color var(--tr);
  }
}
</style>
