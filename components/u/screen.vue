<template>
  <USpace mode="center" block="def" full style="height: 100%">
    <USpace display="row" gap="sm" style="max-width: 12rem; text-align: left">
      <template v-if="type === 'empty'">
        <UIcon :name="ICON_EMPTY" size="md" />
        <UText gray text="Нет данных для отображения..." />
      </template>
      <template v-else-if="type === 'loading'">
        <UIcon :name="ICON_LOADING_CIRCLE" size="md" />
      </template>
      <template v-else-if="type === 'error'">
        <UIcon :name="ICON_ERROR" size="md" />
        <UText gray text="Не удалось загрузить данные..." />
      </template>
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ type?: 'loading' | 'empty' | 'error' }>(), { type: 'loading' })
</script>
