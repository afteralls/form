<template>
  <USpace block="form">
    <USpace block="def">
      <UText type="h3" :text="title" />
    </USpace>
    <USpace block="def" class="hr">
      <slot name="body" />
    </USpace>
    <USpace block="def" class="hr actions">
      <slot name="actions" />
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
defineSlots<{ body?: any; actions?: any }>()
defineProps<{ title: string }>()
</script>

<style scoped lang="scss">
.hr {
  border-top: toRem(1) solid var(--hr);
}

.actions {
  padding-bottom: calc(var(--space-l) * 2);
}
</style>
