<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars" />
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <SvgLogo />
        <span>SAKAI</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i class="pi" :class="[{ 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]" />
        </button>
        <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-in scale-in',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-out fade-out',
              hideOnOutsideClick: true,
            }"
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette" />
          </button>
          <AppConfigurator />
        </div>
      </div>

      <button
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-in scale-in',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-out fade-out',
          hideOnOutsideClick: true,
        }"
        class="layout-topbar-menu-button layout-topbar-action"
      >
        <i class="pi pi-ellipsis-v" />
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar" />
            <span>Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-inbox" />
            <span>Messages</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-user" />
            <span>Profile</span>
          </button>
          <button type="button" class="layout-topbar-action" @click="onLogout">
            <i class="pi pi-sign-out" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useLayout } from '@/layout/composables/layout'
import { RouteName } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import AppConfigurator from './AppConfigurator.vue'

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
function onLogout() {
  authStore.saveAuth(null)
  toast.add({ severity: 'success', summary: 'Logged out', life: 3000 })
  router.replace({ name: RouteName.Login })
}
</script>
