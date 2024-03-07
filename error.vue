<template>
  <USpace layout="screen">
    <USpace mode="center" display="col" style="max-width: 27rem">
      <UText type="h3" :text="error.statusCode.toString()" />
      <UText gray text="Упс, кажется, что-то пошло не так. Не волнуйтесь, вы в этом не виноваты!" />
      <UButton title="Вернуться на главную" @trigger="clearError({ redirect: '/' })" />
    </USpace>
  </USpace>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number } }>()
</script>
