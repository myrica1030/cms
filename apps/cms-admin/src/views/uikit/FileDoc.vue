<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-full lg:col-span-6">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Advanced</div>
        <FileUpload
          name="demo[]"
          :max-file-size="1000000"
          :multiple="true"
          accept="image/*"
          custom-upload
          @uploader="onUpload"
        />
      </div>
    </div>
    <div class="col-span-full lg:col-span-6">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Basic</div>
        <div class="card flex flex-col items-center justify-center gap-6">
          <Toast />
          <FileUpload
            ref="fileupload"
            name="demo[]"
            :max-file-size="1000000"
            accept="image/*"
            custom-upload
            mode="basic"
            @uploader="onUpload"
          />
          <Button severity="secondary" @click="upload" label="Upload" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const fileupload = ref()

function upload() {
  fileupload.value.upload()
}

function onUpload() {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}
</script>
