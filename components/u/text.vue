<template><Text /></template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    type?: 'h3' | 'p' | 'small' | 'span'
    for?: string
    gray?: boolean
  }>(),
  { type: 'small', for: undefined, options: undefined }
)

const Text = () =>
  h(props.type, { for: props.for, style: props.gray ? 'color: var(--txt-s)' : null }, props.text)
</script>

<style scoped lang="scss">
* {
  word-wrap: break-word;
  will-change: transform;
}

h3 {
  font-size: 1.188rem;
  font-weight: 700;
  line-height: 1.688rem;
  letter-spacing: -0.0035em;
  text-align: left;

  @media (max-width: $sm) {
    font-size: 1rem;
  }
}

p,
span {
  font-weight: 500;
  line-height: 1.188rem;

  @media (max-width: $mob) {
    font-size: 0.875rem;
  }
}

small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.188rem;
  letter-spacing: -0.0015em;
}

span {
  font-weight: bold;
}
</style>
