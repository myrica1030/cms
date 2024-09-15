<template>
  <div class="flex flex-col">
    <div class="card">
      <div class="text-xl font-semibold">DataView</div>
      <DataView :value="products" :layout="layout">
        <template #header>
          <div class="flex justify-end">
            <SelectButton v-model="layout" :allow-empty="false" :options="options">
              <template #option="{ option }">
                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
              </template>
            </SelectButton>
          </div>
        </template>

        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex flex-col gap-4 p-6 sm:flex-row sm:items-center" :class="{ 'border-t border-surface': index !== 0 }">
                <div class="relative md:w-40">
                  <img
                    class="mx-auto block w-full rounded xl:block"
                    :alt="item.name"
                    :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                  >
                  <Tag
                    class="absolute dark:!bg-surface-900"
                    style=" top: 4px;left: 4px;"
                    :value="item.inventoryStatus"
                    :severity="getSeverity(item)"
                  />
                </div>
                <div class="flex flex-1 flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div class="flex flex-row items-start justify-between gap-2 md:flex-col">
                    <div>
                      <span class="text-sm text-surface-500 font-medium dark:text-surface-400">{{ item.category }}</span>
                      <div class="mt-2 text-lg font-medium">{{ item.name }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px;">
                      <div
                        class="flex items-center justify-center gap-2 bg-surface-0 px-2 py-1"
                        style=" border-radius: 30px; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%), 0 1px 2px 0 rgb(0 0 0 / 6%);"
                      >
                        <span class="text-sm text-surface-900 font-medium">{{ item.rating }}</span>
                        <i class="pi pi-star-fill text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-8 md:items-end">
                    <span class="text-xl font-semibold">${{ item.price }}</span>
                    <div class="flex flex-row-reverse gap-2 md:flex-row">
                      <Button icon="pi pi-heart" outlined />
                      <Button
                        class="flex-auto whitespace-nowrap md:flex-initial"
                        :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                        icon="pi pi-shopping-cart"
                        label="Buy Now"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="grid grid-cols-12 gap-4">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 p-2 lg:col-span-4 sm:col-span-6">
              <div class="flex flex-col border border-surface-200 rounded bg-surface-0 p-6 dark:border-surface-700 dark:bg-surface-900">
                <div class="flex justify-center rounded bg-surface-50 p-4">
                  <div class="relative mx-auto">
                    <img
                      class="w-full rounded"
                      style="max-width: 300px;"
                      :alt="item.name"
                      :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                    >
                    <Tag
                      class="absolute dark:!bg-surface-900"
                      style=" top: 4px;left: 4px;"
                      :value="item.inventoryStatus"
                      :severity="getSeverity(item)"
                    />
                  </div>
                </div>
                <div class="pt-6">
                  <div class="flex flex-row items-start justify-between gap-2">
                    <div>
                      <span class="text-sm text-surface-500 font-medium dark:text-surface-400">{{ item.category }}</span>
                      <div class="mt-1 text-lg font-medium">{{ item.name }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px;">
                      <div
                        class="flex items-center justify-center gap-2 bg-surface-0 px-2 py-1"
                        style=" border-radius: 30px; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%), 0 1px 2px 0 rgb(0 0 0 / 6%);"
                      >
                        <span class="text-sm text-surface-900 font-medium">{{ item.rating }}</span>
                        <i class="pi pi-star-fill text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex flex-col gap-6">
                    <span class="text-2xl font-semibold">${{ item.price }}</span>
                    <div class="flex gap-2">
                      <Button
                        class="flex-auto whitespace-nowrap"
                        :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                        icon="pi pi-shopping-cart"
                        label="Buy Now"
                      />
                      <Button icon="pi pi-heart" outlined />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>

    <div class="flex flex-col gap-8 lg:flex-row">
      <div class="lg:w-2/3">
        <div class="card">
          <div class="mb-4 text-xl font-semibold">PickList</div>
          <PickList v-model="picklistProducts" breakpoint="1400px" data-key="id">
            <template #option="{ option }">
              {{ option.name }}
            </template>
          </PickList>
        </div>
      </div>

      <div class="lg:w-1/3">
        <div class="card">
          <div class="mb-4 text-xl font-semibold">OrderList</div>
          <OrderList
            v-model="orderlistProducts"
            breakpoint="1400px"
            pt:pcList:root="w-full"
            data-key="id"
          >
            <template #option="{ option }">
              {{ option.name }}
            </template>
          </OrderList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ProductService } from '@/service/ProductService'

const products = ref(null)
const picklistProducts = ref(null)
const orderlistProducts = ref(null)
const options = ref(['list', 'grid'])
const layout = ref('list')

onMounted(() => {
  ProductService.getProductsSmall().then(data => {
    products.value = data.slice(0, 6)
    picklistProducts.value = [data, []]
    orderlistProducts.value = data
  })
})

function getSeverity(product) {
  switch (product.inventoryStatus) {
    case 'INSTOCK': {
      return 'success'
    }

    case 'LOWSTOCK': {
      return 'warning'
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
