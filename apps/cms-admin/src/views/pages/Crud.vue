<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <Button
            class="mr-2"
            icon="pi pi-plus"
            severity="secondary"
            @click="openNew"
            label="New"
          />
          <Button
            :disabled="!selectedProducts || !selectedProducts.length"
            icon="pi pi-trash"
            severity="secondary"
            @click="confirmDeleteSelected"
            label="Delete"
          />
        </template>

        <template #end>
          <Button
            icon="pi pi-upload"
            severity="secondary"
            @click="exportCSV($event)"
            label="Export"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedProducts"
        :value="products"
        :filters="filters"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 25]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} products"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        data-key="id"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="m-0">Manage Products</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters.global.value" placeholder="Search..." />
            </IconField>
          </div>
        </template>

        <Column style="width: 3rem;" :exportable="false" selection-mode="multiple" />

        <Column
          style="min-width: 12rem;"
          field="code"
          header="Code"
          sortable
        />

        <Column
          style="min-width: 16rem;"
          field="name"
          header="Name"
          sortable
        />

        <Column header="Image">
          <template #body="slotProps">
            <img
              class="rounded"
              style="width: 64px;"
              :alt="slotProps.data.image"
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            >
          </template>
        </Column>

        <Column
          style="min-width: 8rem;"
          field="price"
          header="Price"
          sortable
        >
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>

        <Column
          style="min-width: 10rem;"
          field="category"
          header="Category"
          sortable
        />

        <Column
          style="min-width: 12rem;"
          field="rating"
          header="Reviews"
          sortable
        >
          <template #body="slotProps">
            <Rating :model-value="slotProps.data.rating" :readonly="true" />
          </template>
        </Column>

        <Column
          style="min-width: 12rem;"
          field="inventoryStatus"
          header="Status"
          sortable
        >
          <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
          </template>
        </Column>

        <Column style="min-width: 12rem;" :exportable="false">
          <template #body="slotProps">
            <Button
              class="mr-2"
              icon="pi pi-pencil"
              outlined
              rounded
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      :style="{ width: '450px' }"
      v-model:visible="productDialog"
      :modal="true"
      header="Product Details"
    >
      <div class="flex flex-col gap-6">
        <img
          v-if="product.image"
          class="m-auto block pb-4"
          :alt="product.image"
          :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
        >

        <div>
          <label for="name" class="mb-3 block font-bold">Name</label>
          <InputText
            id="name"
            v-model.trim="product.name"
            required="true"
            :invalid="submitted && !product.name"
            autofocus
            fluid
          />
          <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
        </div>

        <div>
          <label for="description" class="mb-3 block font-bold">Description</label>
          <Textarea
            id="description"
            v-model="product.description"
            required="true"
            cols="20"
            fluid
            rows="3"
          />
        </div>

        <div>
          <label for="inventoryStatus" class="mb-3 block font-bold">Inventory Status</label>
          <Select
            id="inventoryStatus"
            v-model="product.inventoryStatus"
            :options="statuses"
            fluid
            option-label="label"
            placeholder="Select a Status"
          />
        </div>

        <div>
          <span class="mb-4 block font-bold">Category</span>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="category1"
                name="category"
                v-model="product.category"
                value="Accessories"
              />
              <label for="category1">Accessories</label>
            </div>
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="category2"
                name="category"
                v-model="product.category"
                value="Clothing"
              />
              <label for="category2">Clothing</label>
            </div>
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="category3"
                name="category"
                v-model="product.category"
                value="Electronics"
              />
              <label for="category3">Electronics</label>
            </div>
            <div class="col-span-6 flex items-center gap-2">
              <RadioButton
                id="category4"
                name="category"
                v-model="product.category"
                value="Fitness"
              />
              <label for="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <label for="price" class="mb-3 block font-bold">Price</label>
            <InputNumber
              id="price"
              v-model="product.price"
              currency="USD"
              fluid
              locale="en-US"
              mode="currency"
            />
          </div>
          <div class="col-span-6">
            <label for="quantity" class="mb-3 block font-bold">Quantity</label>
            <InputNumber
              id="quantity"
              v-model="product.quantity"

              fluid
              integeronly
            />
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          icon="pi pi-times"
          text
          @click="hideDialog"
          label="Cancel"
        />
        <Button icon="pi pi-check" @click="saveProduct" label="Save" />
      </template>
    </Dialog>

    <Dialog
      :style="{ width: '450px' }"
      v-model:visible="deleteProductDialog"
      :modal="true"
      header="Confirm"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
      </div>
      <template #footer>
        <Button
          icon="pi pi-times"
          text
          @click="deleteProductDialog = false"
          label="No"
        />
        <Button icon="pi pi-check" @click="deleteProduct" label="Yes" />
      </template>
    </Dialog>

    <Dialog
      :style="{ width: '450px' }"
      v-model:visible="deleteProductsDialog"
      :modal="true"
      header="Confirm"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="product">Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <Button
          icon="pi pi-times"
          text
          @click="deleteProductsDialog = false"
          label="No"
        />
        <Button
          icon="pi pi-check"
          text
          @click="deleteSelectedProducts"
          label="Yes"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { ProductService } from '@/service/ProductService'

onMounted(() => {
  ProductService.getProducts().then(data => (products.value = data))
})

const toast = useToast()
const dt = ref()
const products = ref()
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const submitted = ref(false)
const statuses = ref([
  { label: 'INSTOCK', value: 'instock' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock' },
])

function formatCurrency(value) {
  if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function openNew() {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}

function hideDialog() {
  productDialog.value = false
  submitted.value = false
}

function saveProduct() {
  submitted.value = true

  if (product?.value.name?.trim()) {
    if (product.value.id) {
      product.value.inventoryStatus = product.value.inventoryStatus.value || product.value.inventoryStatus
      products.value[findIndexById(product.value.id)] = product.value
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 })
    }
    else {
      product.value.id = createId()
      product.value.code = createId()
      product.value.image = 'product-placeholder.svg'
      product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK'
      products.value.push(product.value)
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 })
    }

    productDialog.value = false
    product.value = {}
  }
}

function editProduct(prod) {
  product.value = { ...prod }
  productDialog.value = true
}

function confirmDeleteProduct(prod) {
  product.value = prod
  deleteProductDialog.value = true
}

function deleteProduct() {
  products.value = products.value.filter(val => val.id !== product.value.id)
  deleteProductDialog.value = false
  product.value = {}
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 })
}

function findIndexById(id) {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }

  return index
}

function createId() {
  let id = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

function exportCSV() {
  dt.value.exportCSV()
}

function confirmDeleteSelected() {
  deleteProductsDialog.value = true
}

function deleteSelectedProducts() {
  products.value = products.value.filter(val => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}

function getStatusLabel(status) {
  switch (status) {
    case 'INSTOCK': {
      return 'success'
    }

    case 'LOWSTOCK': {
      return 'warn'
    }

    case 'OUTOFSTOCK': {
      return 'danger'
    }

    default: {
      return null
    }
  }
}
</script>
