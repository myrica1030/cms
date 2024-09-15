<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="mb-4 flex justify-between">
          <div>
            <span class="mb-4 block font-medium text-muted-color">Orders</span>
            <div class="text-xl text-surface-900 font-medium dark:text-surface-0">152</div>
          </div>
          <div class="flex items-center justify-center bg-blue-100 rounded-border dark:bg-blue-400/10" style="width: 2.5rem; height: 2.5rem;">
            <i class="pi pi-shopping-cart text-blue-500 !text-xl" />
          </div>
        </div>
        <span class="text-primary font-medium">24 new </span>
        <span class="text-muted-color">since last visit</span>
      </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="mb-4 flex justify-between">
          <div>
            <span class="mb-4 block font-medium text-muted-color">Revenue</span>
            <div class="text-xl text-surface-900 font-medium dark:text-surface-0">$2.100</div>
          </div>
          <div class="flex items-center justify-center bg-orange-100 rounded-border dark:bg-orange-400/10" style="width: 2.5rem; height: 2.5rem;">
            <i class="pi pi-dollar text-orange-500 !text-xl" />
          </div>
        </div>
        <span class="text-primary font-medium">%52+ </span>
        <span class="text-muted-color">since last week</span>
      </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="mb-4 flex justify-between">
          <div>
            <span class="mb-4 block font-medium text-muted-color">Customers</span>
            <div class="text-xl text-surface-900 font-medium dark:text-surface-0">28441</div>
          </div>
          <div class="flex items-center justify-center bg-cyan-100 rounded-border dark:bg-cyan-400/10" style="width: 2.5rem; height: 2.5rem;">
            <i class="pi pi-users text-cyan-500 !text-xl" />
          </div>
        </div>
        <span class="text-primary font-medium">520 </span>
        <span class="text-muted-color">newly registered</span>
      </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="mb-4 flex justify-between">
          <div>
            <span class="mb-4 block font-medium text-muted-color">Comments</span>
            <div class="text-xl text-surface-900 font-medium dark:text-surface-0">152 Unread</div>
          </div>
          <div class="flex items-center justify-center bg-purple-100 rounded-border dark:bg-purple-400/10" style="width: 2.5rem; height: 2.5rem;">
            <i class="pi pi-comment text-purple-500 !text-xl" />
          </div>
        </div>
        <span class="text-primary font-medium">85 </span>
        <span class="text-muted-color">responded</span>
      </div>
    </div>

    <div class="col-span-12 xl:col-span-6">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Recent Sales</div>
        <DataTable
          :value="products"
          :paginator="true"
          :rows="5"
          responsive-layout="scroll"
        >
          <Column style="width: 15%;" header="Image">
            <template #body="slotProps">
              <img
                class="shadow"
                :alt="slotProps.data.image"
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                width="50"
              >
            </template>
          </Column>
          <Column
            style="width: 35%;"
            :sortable="true"
            field="name"
            header="Name"
          />
          <Column
            style="width: 35%;"
            :sortable="true"
            field="price"
            header="Price"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%;" header="View">
            <template #body>
              <Button type="button" class="p-button-text" icon="pi pi-search" />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="mb-6 flex items-center justify-between">
          <div class="text-xl font-semibold">Best Selling Products</div>
          <div>
            <Button class="p-button-text p-button-plain p-button-rounded" icon="pi pi-ellipsis-v" @click="$refs.menu2.toggle($event)" />
            <Menu
              ref="menu2"
              class="!min-w-40"
              :model="items"
              :popup="true"
            />
          </div>
        </div>
        <ul class="m-0 list-none p-0">
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Space T-Shirt</span>
              <div class="mt-1 text-muted-color">Clothing</div>
            </div>
            <div class="mt-2 flex items-center md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-orange-500" style="width: 50%;" />
              </div>
              <span class="ml-4 text-orange-500 font-medium">%50</span>
            </div>
          </li>
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Portal Sticker</span>
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-cyan-500" style="width: 16%;" />
              </div>
              <span class="ml-4 text-cyan-500 font-medium">%16</span>
            </div>
          </li>
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Supernova Sticker</span>
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-pink-500" style="width: 67%;" />
              </div>
              <span class="ml-4 text-pink-500 font-medium">%67</span>
            </div>
          </li>
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Wonders Notebook</span>
              <div class="mt-1 text-muted-color">Office</div>
            </div>
            <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-green-500" style="width: 35%;" />
              </div>
              <span class="ml-4 text-primary font-medium">%35</span>
            </div>
          </li>
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Mat Black Case</span>
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-purple-500" style="width: 75%;" />
              </div>
              <span class="ml-4 text-purple-500 font-medium">%75</span>
            </div>
          </li>
          <li class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span class="mb-1 mr-2 text-surface-900 font-medium md:mb-0 dark:text-surface-0">Robots T-Shirt</span>
              <div class="mt-1 text-muted-color">Clothing</div>
            </div>
            <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
              <div class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500" style="height: 8px;">
                <div class="h-full bg-teal-500" style="width: 40%;" />
              </div>
              <span class="ml-4 text-teal-500 font-medium">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-span-12 xl:col-span-6">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Revenue Stream</div>
        <Chart
          type="bar"
          class="h-80"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <div class="card">
        <div class="mb-6 flex items-center justify-between">
          <div class="text-xl font-semibold">Notifications</div>
          <div>
            <Button class="p-button-text p-button-plain p-button-rounded" icon="pi pi-ellipsis-v" @click="$refs.menu1.toggle($event)" />
            <Menu
              ref="menu1"
              class="!min-w-40"
              :model="items"
              :popup="true"
            />
          </div>
        </div>

        <span class="mb-4 block font-medium text-muted-color">TODAY</span>

        <ul class="mx-0 mb-6 mt-0 list-none p-0">
          <li class="flex items-center border-b py-2 border-surface">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-400/10">
              <i class="pi pi-dollar text-blue-500 !text-xl" />
            </div>
            <span class="text-surface-900 leading-normal dark:text-surface-0">Richard Jones
              <span class="text-surface-700 dark:text-surface-100">has purchased a blue t-shirt for <span class="text-primary font-bold">$79.00</span></span>
            </span>
          </li>
          <li class="flex items-center py-2">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-400/10">
              <i class="pi pi-download text-orange-500 !text-xl" />
            </div>
            <span class="text-surface-700 leading-normal dark:text-surface-100">Your request for withdrawal of <span class="text-primary font-bold">$2500.00</span> has been initiated.</span>
          </li>
        </ul>

        <span class="mb-4 block font-medium text-muted-color">YESTERDAY</span>

        <ul class="m-0 mb-6 list-none p-0">
          <li class="flex items-center border-b py-2 border-surface">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-400/10">
              <i class="pi pi-dollar text-blue-500 !text-xl" />
            </div>
            <span class="text-surface-900 leading-normal dark:text-surface-0">Keyser Wick
              <span class="text-surface-700 dark:text-surface-100">has purchased a black jacket for <span class="text-primary font-bold">$59.00</span></span>
            </span>
          </li>
          <li class="flex items-center border-b py-2 border-surface">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-400/10">
              <i class="pi pi-question text-pink-500 !text-xl" />
            </div>
            <span class="text-surface-900 leading-normal dark:text-surface-0">Jane Davis
              <span class="text-surface-700 dark:text-surface-100">has posted a new questions about your product.</span>
            </span>
          </li>
        </ul>

        <span class="mb-4 block font-medium text-muted-color">LAST WEEK</span>

        <ul class="m-0 list-none p-0">
          <li class="flex items-center border-b py-2 border-surface">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-400/10">
              <i class="pi pi-arrow-up text-green-500 !text-xl" />
            </div>
            <span class="text-surface-900 leading-normal dark:text-surface-0">Your revenue has increased by <span class="text-primary font-bold">%25</span>.</span>
          </li>
          <li class="flex items-center border-b py-2 border-surface">
            <div class="mr-4 h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-400/10">
              <i class="pi pi-heart text-purple-500 !text-xl" />
            </div>
            <span class="text-surface-900 leading-normal dark:text-surface-0"><span class="text-primary font-bold">12</span> users have added your products to their wishlist.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { ProductService } from '@/service/ProductService'

const { getPrimary, getSurface, isDarkTheme } = useLayout()

const products = ref(null)
const chartData = ref(null)
const chartOptions = ref(null)

const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-trash' },
])

onMounted(() => {
  ProductService.getProductsSmall().then(data => (products.value = data))
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

function setChartData() {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        type: 'bar',
        label: 'Subscriptions',
        backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
        data: [4000, 10_000, 15_000, 4000],
        barThickness: 32,
      },
      {
        type: 'bar',
        label: 'Advertising',
        backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
        data: [2100, 8400, 2400, 7500],
        barThickness: 32,
      },
      {
        type: 'bar',
        label: 'Affiliate',
        backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
        data: [4100, 5200, 3400, 7400],
        borderRadius: {
          topLeft: 8,
          topRight: 8,
        },
        borderSkipped: true,
        barThickness: 32,
      },
    ],
  }
}

function setChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement)
  const borderColor = documentStyle.getPropertyValue('--surface-border')
  const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textMutedColor,
        },
        grid: {
          color: 'transparent',
          borderColor: 'transparent',
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textMutedColor,
        },
        grid: {
          color: borderColor,
          borderColor: 'transparent',
          drawTicks: false,
        },
      },
    },
  }
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

watch([getPrimary, getSurface, isDarkTheme], () => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>
