import { type Component, createApp } from 'vue'
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/assets/styles.scss'

const app = createApp(App as Component)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
  semantic: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1920px',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.directive('styleclass', StyleClass)
app.directive('tooltip', Tooltip)

app.mount('#app')
