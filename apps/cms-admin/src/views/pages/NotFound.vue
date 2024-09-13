<template>
  <FloatingConfigurator />
  <div class="min-h-screen flex items-center justify-center overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <SvgLogo class="mb-8 w-16 shrink-0" />

      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
        <div class="w-full flex flex-col items-center bg-surface-0 px-8 py-20 dark:bg-surface-900 sm:px-20" style="border-radius: 53px">
          <span class="text-3xl text-primary font-bold">404</span>
          <h1 class="mb-2 text-3xl text-surface-900 font-bold lg:text-5xl dark:text-surface-0">Not Found</h1>
          <div class="mb-8 text-surface-600 dark:text-surface-200">Requested resource is not available.</div>
          <router-link to="/" class="w-full flex items-center border-b border-surface-300 py-8 dark:border-surface-500">
            <span class="flex items-center justify-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
              <i class="pi pi-fw pi-table !text-2xl" />
            </span>
            <span class="ml-6 flex flex-col">
              <span class="mb-0 block text-surface-900 font-medium lg:text-xl dark:text-surface-0">Frequently Asked Questions</span>
              <span class="text-surface-600 lg:text-xl dark:text-surface-200">Ultricies mi quis hendrerit dolor.</span>
            </span>
          </router-link>
          <router-link to="/" class="w-full flex items-center border-b border-surface-300 py-8 dark:border-surface-500">
            <span class="flex items-center justify-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
              <i class="pi pi-fw pi-question-circle !text-2xl" />
            </span>
            <span class="ml-6 flex flex-col">
              <span class="mb-0 text-surface-900 font-medium lg:text-xl dark:text-surface-0">Solution Center</span>
              <span class="text-surface-600 lg:text-xl dark:text-surface-200">Phasellus faucibus scelerisque eleifend.</span>
            </span>
          </router-link>
          <router-link to="/" class="mb-8 w-full flex items-center border-b border-surface-300 py-8 dark:border-surface-500">
            <span class="flex items-center justify-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
              <i class="pi pi-fw pi-unlock !text-2xl" />
            </span>
            <span class="ml-6 flex flex-col">
              <span class="mb-0 text-surface-900 font-medium lg:text-xl dark:text-surface-0">Permission Manager</span>
              <span class="text-surface-600 lg:text-xl dark:text-surface-200">Accumsan in nisl nisi scelerisque</span>
            </span>
          </router-link>
          <Button as="router-link" label="Go to Dashboard" to="/" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
</script>
