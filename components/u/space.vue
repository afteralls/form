<template><Block /></template>

<script setup lang="ts">
type Gap = 'none' | 'bit' | 'sm' | 'base' | 'lg'

const props = withDefaults(
  defineProps<{
    type?: 'div' | 'section' | 'nav' | 'form'
    display?: 'row' | 'col' | 'grid'
    gap?: Gap
    pos?: 'between' | 'left' | 'right'
    block?: 'def' | 'form'
    layout?: 'screen'
    mode?: 'center'
    full?: boolean
  }>(),
  {
    type: 'div',
    display: undefined,
    gap: 'base',
    pos: undefined,
    block: undefined,
    layout: undefined,
    mode: undefined
  }
)

const slots = defineSlots<{ default(): any }>()

const gapConfig: Record<Gap, string> = {
  none: '0',
  bit: '0.313rem', // 5px
  sm: 'var(--space-ui)', // see in 'assets/base.scss'
  base: 'var(--space)', // see in 'assets/base.scss'
  lg: 'var(--space-l)' // see in 'assets/base.scss'
}

const Block = () =>
  h(
    props.type,
    {
      class: [props.display, props.block, props.pos, props.layout, props.mode],
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

/* Pos */

.between {
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
}

.left {
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
}

.right {
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  width: 100%;
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

  @media (max-width: $md) {
    justify-content: flex-start;
  }
}

/* Mode */

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
