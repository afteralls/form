<template>
  <NuxtLink :to="to" :target="global ? '_blank' : null" :title="title">
    {{ title }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ to: string; title: string; global?: boolean }>()
</script>

<style scoped lang="scss">
a {
  &,
  svg,
  &:visited {
    transition:
      filter var(--tr),
      transform var(--tr);
    color: var(--m);
    font-size: 0.875rem;
    font-weight: 400;
  }

  &:active {
    transform: var(--scale);
  }
}
</style>
