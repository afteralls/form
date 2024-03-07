<template>
  <div ref="selectTarget" style="position: relative">
    <button
      ref="selected"
      :disabled="loading"
      :title="modelValue.name"
      class="selected"
      @click="active = !active"
    >
      <USpace mode="center" full style="position: relative">
        <UIcon v-if="loading" :name="ICON_LOADING_CIRCLE" style="position: absolute" />
        <UIcon v-else-if="!options.length" :name="ICON_EMPTY" style="position: absolute" />
        <USpace display="row" pos="between" :style="loading ? `visibility: hidden` : null">
          <UText type="span" :text="modelValue.name" style="font-size: 0.875rem" />
          <UIcon id="select-arrow" name="ep:arrow-down-bold" size="sm" :style="rotateHandler" />
        </USpace>
      </USpace>
    </button>
    <Transition name="select" mode="out-in">
      <USpace v-if="active" display="col" gap="none" class="options" @click="optionsHandler">
        <USpace v-if="options.length >= 10" display="col" gap="none">
          <USpace display="row" pos="between" class="search">
            <input id="option-search" v-model="search" type="text" placeholder="Поиск" />
            <UIcon name="gg:search" class="search-icon" size="sm" />
          </USpace>
        </USpace>
        <UScroll height="10rem" :trigger="search.length">
          <USpace v-auto-animate display="col" gap="none">
            <button
              v-for="(opt, idx) in printArr"
              :key="idx"
              class="option"
              :data-opt="opt.value"
              :title="opt.name"
            >
              <div><UText type="span" :text="opt.name" /></div>
            </button>
            <UScreen v-if="!printArr.length" type="empty" style="border: none" />
          </USpace>
        </UScroll>
      </USpace>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: SelectItem
    options: SelectItem[]
    loading?: boolean
    width?: string
  }>(),
  { width: '100%' }
)

const emit = defineEmits<{ (evt: 'update:modelValue', value: SelectItem): void }>()

const selectTarget = ref<HTMLDivElement>()
const selected = ref<HTMLDivElement>()
const optionTarget = '[data-opt]'
const active = ref<boolean>(false)
const rotateHandler = computed(() => (active.value ? 'transform: rotate(180deg);' : null))

const printArr = ref<SelectItem[]>(props.options)
const search = ref<string>('')

watch(active, (newV) => {
  if (newV) {
    search.value = ''
    printArr.value = props.options
  }
})

watch(search, (newV) => {
  newV.length
    ? (printArr.value = props.options.filter((opt) =>
        opt.name.toLowerCase().match(newV.toLowerCase())
      ))
    : (printArr.value = props.options)
})

watch(
  () => props.loading,
  (newV) => {
    if (!newV) printArr.value = props.options
  }
)

const optionsHandler = (evt: MouseEvent) => {
  if ((evt.target as HTMLElement).closest(optionTarget)) {
    const optionValue = +(evt.target as HTMLButtonElement).dataset.opt!
    props.options.forEach((option) => {
      if (option.value === optionValue) {
        emit('update:modelValue', option)
      }
    })
    selected.value?.focus()
    active.value = false
  }
}

onClickOutside(selectTarget, (evt) => {
  if (!(evt.target as HTMLElement).closest(optionTarget)) active.value = false
})
</script>

<style scoped lang="scss">
@mixin option-styles {
  @include ui-styles;
  cursor: pointer;
  width: 100%;
  text-align: left;

  span,
  div,
  svg {
    pointer-events: none;
    font-weight: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  span {
    font-weight: normal;
  }
}

.selected {
  @include option-styles;
  width: toRem(100);
  background-color: var(--fg-m);
  border: toRem(1) solid var(--br);
  max-width: 100%;
  min-width: 100%;

  &:active {
    #select-arrow {
      transform: scale(1.3);
    }
  }

  &:hover,
  &:focus {
    border-color: var(--m);
  }
}

.options {
  overflow: hidden;
  position: absolute;
  top: calc(var(--ui-size) + toRem(2));
  z-index: 6;
  width: 100%;
  background-color: var(--fg-m);
  border-radius: var(--br-rad-ui);
  border: toRem(1) solid var(--br);
}

.option {
  @include option-styles;
  width: toRem(100) !important;
  max-width: 100%;
  min-width: 100%;
  background-color: var(--fg-m);
  min-height: var(--ui-size);
  border-radius: 0;

  transition:
    background-color var(--tr),
    border-radius var(--tr),
    transform var(--tr);

  &:hover,
  &:focus {
    background-color: var(--fg-s);
  }
}

input {
  font-family: 'Montserrat';
  width: 100%;
  background-color: transparent;
  color: var(--txt-m);
}

.search {
  min-height: 1.5rem;
  padding: var(--space-ui);
  border-bottom: toRem(1) solid var(--hr);
}

.select {
  &-enter-active,
  &-leave-active {
    transition:
      opacity var(--tr),
      transform var(--tr);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(toRem(-2));
  }
}
</style>
