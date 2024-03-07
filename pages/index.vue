<template>
  <UForm v-if="!success" title="Регистрация" style="max-width: 60rem">
    <template #body>
      <USpace display="col" gap="lg">
        <UText type="p" text="Заполните Ваши данные" />
        <USpace display="grid" class="layout">
          <UInput
            v-model="data.username"
            name="username"
            placeholder="Имя"
            :warn="!useIsNotEmpty(data.username) && !!data.username.length"
          />
          <UInput
            v-model="data.email"
            type="email"
            name="email"
            placeholder="Email"
            :warn="!useEmailValidation(data.email) && !!data.email.length"
          />
          <div class="hide"></div>
          <USelect v-model="selModel" :options="selData" />
          <UInput v-model="data.password" type="password" name="password" placeholder="Пароль" />
          <UInput
            v-model="data.password_repeat"
            type="password"
            name="password_repeat"
            placeholder="Повторите пароль"
            :warn="data.password !== data.password_repeat && !!data.password_repeat.length"
          />
        </USpace>
      </USpace>
    </template>
    <template #actions>
      <USpace display="col" gap="lg">
        <UToggle
          v-model="data.public"
          name="public"
          title="Хотите чтобы Ваш профиль видели другие участники платформы?"
          desc="Включает профиль для просмотра другими пользователями по ссылке"
        />
        <USpace display="grid" class="actions">
          <UCheckbox v-model="data.agreement" name="agreement">
            <USpace display="row" gap="bit" class="agreement">
              <UText text="Регистрируясь, Вы соглашаетесь  с" />
              <ULink to="#" title="политикой конфиденциальности" />
              <UText text="и обработкой" />
              <ULink to="#" title="персональных данных" />
            </USpace>
          </UCheckbox>
          <UButton
            title="Зарегистрироваться"
            :disabled="!isAllValid"
            :loading="awaitState"
            @trigger="sendData"
          />
        </USpace>
      </USpace>
    </template>
  </UForm>
  <USpace v-else display="col" mode="center" style="width: 100dvw; height: 100dvh">
    <UIcon name="icon-park:success" size="max" />
    <UText type="span" text="Прекрасно" />
    <UText gray text="Ваши данные успешно загружены!" />
  </USpace>
</template>

<script setup lang="ts">
const data: AuthData = reactive({
  public: true,
  username: '',
  role: 0,
  email: '',
  password: '',
  password_repeat: '',
  agreement: true
})

const selData = ref<SelectItem[]>([
  { value: 0, name: 'Должность' },
  { value: 1, name: 'Менеджер' },
  { value: 2, name: 'Менеджер по персоналу' },
  { value: 3, name: 'Менеджер по рекламе' },
  { value: 4, name: 'Менеджер по связям с инвесторами' },
  { value: 5, name: 'Менеджер по связям с общественностью' },
  { value: 6, name: 'Директор предприятия' },
  { value: 7, name: 'Финансовый директор' },
  { value: 8, name: 'Главный бухгалтер' },
  { value: 9, name: 'Главный конструктор' },
  { value: 10, name: 'Главный инженер' }
])

const selModel = ref<SelectItem>(selData.value[0])

const isAllValid = computed(
  () =>
    useIsNotEmpty(data.username) &&
    useEmailValidation(data.email) &&
    data.password.length > 0 &&
    data.password === data.password_repeat &&
    data.agreement
)

const awaitState = ref<boolean>(false)
const success = ref<boolean>(false)

const sendData = async () => {
  awaitState.value = true

  const headers = {
    // some headers here
  }

  const body = {
    public: data.public,
    username: data.username,
    role: selModel.value.value,
    email: data.email,
    password: data.password,
    password_repeat: data.password_repeat
  }

  await $fetch(`/api/mock`, { method: 'POST', headers, body })
    .then(() => {
      success.value = true
    })
    .catch(() => {
      // Something went wront
    })

  awaitState.value = false
}
</script>

<style scoped lang="scss">
.layout {
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: var(--space-l) !important;

  @media (max-width: $md) {
    grid-template-columns: 1fr;
  }
}

.hide {
  @media (max-width: $md) {
    display: none;
  }
}

.actions {
  grid-template-columns: 1fr toRem(300);
  grid-gap: calc(var(--space-l) * 2) !important;

  @media (max-width: $md) {
    grid-template-columns: 1fr;
    grid-gap: var(--space-l) !important;
  }
}

.agreement {
  flex-wrap: wrap;
  row-gap: 0 !important;
}
</style>
