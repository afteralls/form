<template>
  <USpace type="form" class="form">
    <USpace block="def">
      <UText type="span" :text="title" />
    </USpace>
    <ULine />
    <USpace block="def">
      <slot name="body" />
    </USpace>
    <ULine />
    <USpace block="def">
      <slot name="actions" />
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
defineSlots<{ body?: any; actions?: any }>()
defineProps<{ title: string }>()
</script>

<style scoped lang="scss">
.form {
  border-radius: var(--br-rad-form);
  // background-color: var(--fg);
}
</style>
