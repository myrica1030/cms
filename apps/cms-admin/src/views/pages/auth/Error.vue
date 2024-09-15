<template>
  <FloatingConfigurator />

  <div class="min-h-screen min-w-[100vw] flex items-center justify-center overflow-hidden bg-surface-50 dark:bg-surface-950">
    <div class="flex flex-col items-center justify-center">
      <div style=" padding: 0.3rem; background: linear-gradient(180deg, rgb(233 30 99 / 40%) 10%, rgb(33 150 243 / 0%) 30%);border-radius: 56px;">
        <div class="w-full flex flex-col items-center bg-surface-0 px-8 py-20 dark:bg-surface-900 sm:px-20" style="border-radius: 53px;">
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center justify-center border-2 border-pink-500 rounded-full" style=" width: 3.2rem;height: 3.2rem;">
              <i class="pi pi-fw pi-exclamation-circle text-pink-500 !text-2xl" />
            </div>
            <h1 class="mb-2 text-5xl text-surface-900 font-bold dark:text-surface-0">Error Occured</h1>
            <span class="mb-8 text-muted-color">Requested resource is not available.</span>
            <img
              class="mb-8"
              alt="Error"
              src="/demo/images/error/asset-error.svg"
              width="80%"
            >
            <div class="col-span-12 mt-8 text-center">
              <Button
                as="router-link"
                to="/"
                severity="danger"
                label="Go to Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
</script>
