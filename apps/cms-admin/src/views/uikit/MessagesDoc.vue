<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Toast</div>
        <div class="flex flex-wrap gap-2">
          <Button severity="success" @click="showSuccess()" label="Success" />
          <Button severity="info" @click="showInfo()" label="Info" />
          <Button severity="warn" @click="showWarn()" label="Warn" />
          <Button severity="danger" @click="showError()" label="Error" />
        </div>
        <div class="mb-4 mt-4 text-xl font-semibold">Inline</div>
        <div class="mb-4 flex flex-wrap gap-2">
          <InputText
            aria-label="username"
            v-model="username"
            invalid
            placeholder="Username"
          />
          <Message severity="error">Username is required</Message>
        </div>
        <div class="flex flex-wrap gap-2">
          <InputText
            aria-label="email"
            v-model="email"
            invalid
            placeholder="Email"
          />
          <Message icon="pi pi-times-circle" severity="error" />
        </div>
      </div>
    </div>
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Message</div>
        <div class="mb-4 flex flex-col gap-4">
          <Message severity="success">Success Message</Message>
          <Message severity="info">Info Message</Message>
          <Message severity="warn">Warn Message</Message>
          <Message severity="error">Error Message</Message>
          <Message severity="secondary">Secondary Message</Message>
          <Message severity="contrast">Contrast Message</Message>
        </div>
        <transition-group name="p-message" tag="div">
          <Message v-for="msg of message" :key="msg.content" :severity="msg.severity">{{ msg.content }}</Message>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const message = ref([])
const username = ref(null)
const email = ref(null)

function showSuccess() {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 })
}

function showInfo() {
  toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Detail', life: 3000 })
}

function showWarn() {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000 })
}

function showError() {
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Detail', life: 3000 })
}
</script>
