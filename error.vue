<template>
  <USpace layout="screen">
    <USpace mode="center" display="col" style="max-width: 27rem">
      <UText type="h1" :text="error.statusCode.toString()" />
      <UText
        type="p"
        gray
        text="Упс, кажется, что-то пошло не так. Не волнуйтесь, вы в этом не виноваты!"
      />
      <UButton
        title="Вернуться на главную"
        :icon="ICON_HOME"
        @trigger="clearError({ redirect: '/' })"
      />
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number } }>()
</script>
