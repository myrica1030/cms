<template>
  <div class="page">
    <div class="main">
      <div class="rounded-transition-border">
        <form class="content" @submit.prevent="onSubmit()">
          <div class="text-center mb-8">
            <SvgLogo class="mb-8 w-16 shrink-0 mx-auto" />
            <h1 class="slogan">Welcome to Myrica!</h1>
            <span class="text-muted-color font-medium">Sign in to continue</span>
          </div>

          <div>
            <label class="field" :for="usernameId">
              <span class="label">Username</span>
              <InputText
                :id="usernameId"
                v-model="username"
                type="text"
                placeholder="Username"
                fluid
                :invalid="!!errors?.username?.length"
                @change="() => errors && (errors.username = undefined)"
              />
              <small v-if="errors?.username?.length">{{ capitalize(errors.username[0]) }}</small>
            </label>

            <label :for="passwordId" class="field mb-4!">
              <span class="label">Password</span>
              <Password
                :id="passwordId"
                v-model="password"
                placeholder="Password"
                toggle-mask
                fluid
                :feedback="false"
                :invalid="!!errors.password?.length"
                @change="() => (errors.password = undefined)"
              />
              <small v-if="errors.password?.length">{{ capitalize(errors.password[0]) }}</small>
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
              :loading="loading"
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
import { api } from '@/client'
import { isHttpResponse } from '@/client/cms/cms-api'
import type { FormError } from '@/client/cms/cms-api'
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import { RouteName } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { capitalize } from '@/utils/string'

const usernameId = useId()
const passwordId = useId()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errors = ref<Partial<FormError>>({})

const authStore = useAuthStore()
const router = useRouter()

async function onSubmit() {
  loading.value = true
  try {
    const response = await api.auth.login({ username: username.value, password: password.value })
    authStore.saveAuth(response.data)
    await router.replace({ name: RouteName.Dashboard })
  }
  catch (error) {
    if (isHttpResponse(error)) {
      errors.value = error.error
    }
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.slogan {
  @apply: text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4;
}

.field {
  @apply: block mb-8 md:w-[30rem];

  .label {
    @apply: block text-xl font-medium mb-2 text-surface-900 dark:text-surface-0;
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
