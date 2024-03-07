<template><Block /></template>

<script setup lang="ts">
type Gap = 'none' | 'bit' | 'sm' | 'base' | 'lg'

const props = withDefaults(
  defineProps<{
    type?: 'div' | 'section' | 'nav' | 'form'
    display?: 'row' | 'col' | 'grid'
    gap?: Gap
    block?: 'def' | 'form'
    layout?: 'screen'
    full?: boolean
  }>(),
  {
    type: 'div',
    display: undefined,
    gap: 'base',
    block: undefined,
    layout: undefined
  }
)

const slots = defineSlots<{ default(): any }>()

const gapConfig: Record<Gap, string> = {
  none: '0',
  bit: '0.313rem', // 5px
  sm: 'var(--space-m)', // see in 'assets/base.scss'
  base: 'var(--space)', // see in 'assets/base.scss'
  lg: 'var(--space-l)' // see in 'assets/base.scss'
}

const Block = () =>
  h(
    props.type,
    {
      class: [props.display, props.block, props.layout],
      style: `${props.display ? `gap: ${gapConfig[props.gap]};` : ''}${
        props.full ? 'width: 100%;' : ''
      }`
    },
    slots.default()
  )
</script>

<style scoped lang="scss">
/* Display */

.row {
  display: flex;
  align-items: center;
}

.col {
  display: flex;
  text-align: left;
  flex-direction: column;
}

.grid {
  display: grid;
  gap: var(--space);
}

/* Block */

.def {
  padding: var(--space) var(--space-l);
}

.form {
  border-radius: var(--br-rad-form);
  background-color: var(--fg-m);
}

/* Layout */

.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
  position: relative;
  padding: var(--space);
  overflow: scroll;
}
</style>
