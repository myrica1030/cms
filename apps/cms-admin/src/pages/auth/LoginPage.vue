<template>
  <div class="page">
    <div class="main">
      <div class="rounded-transition-border">
        <form class="content" role="form" @submit.prevent="onSubmit">
          <div class="text-center mb-8">
            <SvgLogo class="mb-8 w-16 shrink-0 mx-auto" />
            <h1 class="slogan">Welcome to Myrica!</h1>
            <span class="text-muted-color font-medium">Sign in to continue</span>
          </div>

          <div>
            <label class="field" :class="{ invalid: errors.username }" :for="usernameId">
              <span class="label">Username</span>
              <InputText
                :id="usernameId"
                v-model="username"
                type="text"
                placeholder="Username"
                fluid
                :aria-describedby="`${usernameId}-helper`"
                :invalid="!!errors.username"
                @change="() => errors && (errors.username = undefined)"
              />
              <small :id="`${usernameId}-helper`" class="helper p-placeholder">{{ capitalize(errors.username) }}</small>
            </label>

            <label :for="passwordId" class="field mb-4!" :class="{ invalid: errors.password }">
              <span class="label">Password</span>
              <Password
                :id="passwordId"
                v-model="password"
                placeholder="Password"
                :aria-describedby="`${passwordId}-help`"
                toggle-mask
                fluid
                :feedback="false"
                :invalid="!!errors.password"
                :class="{ 'p-invalid': errors.password }"
                @change="() => (errors.password = undefined)"
              />
              <small :id="`${passwordId}-help`" class="helper p-placeholder">{{ capitalize(errors.password) }}</small>
            </label>

            <div class="flex items-center justify-between mb-8 gap-8">
              <label class="flex items-center cursor-pointer">
                <Checkbox v-model="rememberMe" binary class="mr-2" />
                <span>Remember me</span>
              </label>
              <!-- TODO implement forgot password -->
              <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
            </div>

            <Button
              :loading="isSubmitting"
              label="Sign In"
              fluid
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  </div>

  <FloatingConfigurator />
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/client'
import { isHttpResponse } from '@/client/cms/cms-api'
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import router, { RouteName } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { capitalize } from '@/utils/string'

const loginFormSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
  rememberMe: yup.boolean(),
})

const { defineField, handleSubmit, errors, isSubmitting, setErrors } = useForm({
  validationSchema: loginFormSchema,
  validateOnMount: false,
})

const usernameId = useId()
const passwordId = useId()
const [username] = defineField('username')
const [password] = defineField('password', { validateOnModelUpdate: false, validateOnBlur: true })
const [rememberMe] = defineField('rememberMe')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async loginForm => {
  await loginFormSchema.validate(loginForm)
  try {
    const response = await api.auth.login({ username: username.value, password: password.value })
    authStore.saveAuth(response.data)
    await router.replace({ name: RouteName.Dashboard })
  }
  catch (error) {
    if (isHttpResponse(error)) {
      // TODO: transform FormErrorCause to error message
      setErrors(error.error)
    }
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.slogan {
  @apply: text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4;
}

.field {
  @apply: block mb-4 md:w-[30rem];

  .label {
    @apply: block text-xl font-medium mb-2 text-surface-900 dark:text-surface-0;
  }

  &.invalid .helper {
    color: var(--p-inputtext-invalid-border-color);
  }
}

.page {
  @apply: bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden;
}

.main {
  @apply: flex flex-col items-center justify-center;
}

.rounded-transition-border {
  @apply: rounded-56px p-1.2;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}

.content {
  @apply: w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 rounded-53px;
}
</style>
