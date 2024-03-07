<template>
  <div class="input">
    <input
      :id="name"
      :name="name"
      :type="type === 'password' ? passState : type"
      :value="modelValue"
      :maxlength="length"
      :placeholder="placeholder"
      autocomplete="on"
      :class="{ error: warn, pass: type === 'password' }"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <UButton
      v-if="type === 'password'"
      :title="showPassword ? 'Показать пароль' : 'Скрыть пароль'"
      :icon="showPassword ? ICON_EYE_HIDE : ICON_EYE_SHOW"
      mode="icon"
      @trigger="passwordHandler"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    modelValue: string | number
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'datetime-local' | 'number' | 'date'
    length?: number
    warn?: boolean
  }>(),
  { type: 'text', placeholder: '', length: 100 }
)

defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const showPassword = ref<boolean>(false)
const passState = ref<'password' | 'text'>('password')

const passwordHandler = () => {
  showPassword.value = !showPassword.value
  passState.value = showPassword.value ? 'text' : 'password'
}
</script>

<style scoped lang="scss">
input {
  @include ui-styles;
  border: toRem(1) solid var(--br);
  width: 100%;

  &.pass {
    padding-right: toRem(42);
  }

  &:focus,
  &:hover {
    border: toRem(1) solid var(--m);
  }
}

.error {
  border-color: var(--red);
  box-shadow: 0 0 var(--space-ui) var(--red);

  &:focus,
  &:hover {
    border-color: darkred;
  }
}

.input {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

button {
  position: absolute;
  right: var(--space-ui);
}
</style>
