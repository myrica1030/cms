<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Dialog</div>
        <Dialog
          :style="{ width: '30vw' }"
          v-model:visible="display"
          :breakpoints="{ '960px': '75vw' }"
          header="Dialog"
          modal
        >
          <p class="m-0 leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <template #footer>
            <Button @click="close" label="Save" />
          </template>
        </Dialog>
        <Button style="width: auto;" @click="open" label="Show" />
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">Popover</div>
        <div class="flex flex-wrap gap-2">
          <Button type="button" @click="toggleDataTable" label="Show" />
          <Popover ref="op2" id="overlay_panel" style="width: 450px;">
            <DataTable
              v-model:selection="selectedProduct"
              :value="products"
              :paginator="true"
              :rows="5"
              selection-mode="single"
              @row-select="onProductSelect"
            >
              <Column
                style="min-width: 12rem;"
                field="name"
                header="Name"
                sortable
              />
              <Column header="Image">
                <template #body="slotProps">
                  <img class="w-16 shadow-sm" :alt="slotProps.data.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`">
                </template>
              </Column>
              <Column
                style="min-width: 8rem;"
                field="price"
                header="Price"
                sortable
              >
                <template #body="slotProps"> $ {{ slotProps.data.price }} </template>
              </Column>
            </DataTable>
          </Popover>
        </div>
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">Tooltip</div>
        <div class="inline-flex gap-4">
          <InputText type="text" v-tooltip="'Your username'" placeholder="Username" />
          <Button type="button" v-tooltip="'Click to proceed'" label="Save" />
        </div>
      </div>
    </div>
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Drawer</div>
        <Drawer v-model:visible="visibleLeft" header="Drawer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Drawer>
        <Drawer v-model:visible="visibleRight" header="Drawer" position="right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Drawer>
        <Drawer v-model:visible="visibleTop" header="Drawer" position="top">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Drawer>
        <Drawer v-model:visible="visibleBottom" header="Drawer" position="bottom">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Drawer>
        <Drawer v-model:visible="visibleFull" header="Drawer" position="full">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Drawer>
        <Button style="margin-right: 0.25em;" icon="pi pi-arrow-right" @click="visibleLeft = true" />
        <Button style="margin-right: 0.25em;" icon="pi pi-arrow-left" @click="visibleRight = true" />
        <Button style="margin-right: 0.25em;" icon="pi pi-arrow-down" @click="visibleTop = true" />
        <Button style="margin-right: 0.25em;" icon="pi pi-arrow-up" @click="visibleBottom = true" />
        <Button icon="pi pi-external-link" @click="visibleFull = true" />
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">ConfirmPopup</div>
        <ConfirmPopup />
        <Button
          ref="popup"
          class="mr-2"
          icon="pi pi-check"
          @click="confirm($event)"
          label="Confirm"
        />
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">ConfirmDialog</div>
        <Button
          style="width: auto;"
          icon="pi pi-trash"
          severity="danger"
          @click="openConfirmation"
          label="Delete"
        />
        <Dialog
          :style="{ width: '350px' }"
          v-model:visible="displayConfirmation"
          :modal="true"
          header="Confirmation"
        >
          <div class="flex items-center justify-center">
            <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem;" />
            <span>Are you sure you want to proceed?</span>
          </div>
          <template #footer>
            <Button
              icon="pi pi-times"
              severity="secondary"
              text
              @click="closeConfirmation"
              label="No"
            />
            <Button
              autofocus
              icon="pi pi-check"
              outlined
              severity="danger"
              @click="closeConfirmation"
              label="Yes"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { ProductService } from '@/service/ProductService'

const display = ref(false)
const displayConfirmation = ref(false)
const visibleLeft = ref(false)
const visibleRight = ref(false)
const visibleTop = ref(false)
const visibleBottom = ref(false)
const visibleFull = ref(false)
const products = ref(null)
const selectedProduct = ref(null)
const op = ref(null)
const op2 = ref(null)
const popup = ref(null)

const toast = useToast()
const confirmPopup = useConfirm()

onMounted(() => {
  ProductService.getProductsSmall().then(data => (products.value = data))
})

function open() {
  display.value = true
}

function close() {
  display.value = false
}

function openConfirmation() {
  displayConfirmation.value = true
}

function closeConfirmation() {
  displayConfirmation.value = false
}

function toggleDataTable(event) {
  op2.value.toggle(event)
}

function onProductSelect(event) {
  op.value.hide()
  toast.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 })
}

function confirm(event) {
  confirmPopup.require({
    target: event.target,
    message: 'Are you sure you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}
</script>
