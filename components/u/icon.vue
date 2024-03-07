<template>
  <Icon :name="name" :size="sizeConfig[size]" :style="`min-width: ${sizeConfig[size]}`" />
</template>

<script setup lang="ts">
type Size = 'sm' | 'def' | 'ui' | 'cb' | 'md' | 'lg' | 'max' | 'full'
withDefaults(defineProps<{ name: string; size?: Size }>(), { size: 'def' })

const sizeConfig: Record<Size, string> = {
  sm: '1rem', // 16px
  def: '1.313rem', // 21px
  ui: '2rem', // 32px
  cb: '0.75rem', // 9px
  md: '3.125rem', // 50px
  lg: '5rem', // 80px
  max: '6.25rem', // 100px
  full: '100%'
}
</script>

<style scoped lang="scss">
svg {
  color: var(--txt-s);
  will-change: transform;
  transition: transform var(--tr);
}
</style>
