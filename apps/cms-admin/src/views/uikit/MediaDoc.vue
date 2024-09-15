<template>
  <div class="card">
    <div class="mb-4 text-xl font-semibold">Carousel</div>
    <Carousel
      :value="products"
      :num-scroll="3"
      :num-visible="3"
      :responsive-options="carouselResponsiveOptions"
    >
      <template #item="slotProps">
        <div class="m-2 border border-surface-200 rounded p-4 dark:border-surface-700">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                class="w-full rounded"
                :alt="slotProps.data.name"
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
              >
              <div class="absolute rounded-border dark:bg-surface-900" style=" top: 5px;left: 5px;">
                <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" />
              </div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex items-center justify-between">
            <div class="mt-0 text-xl font-semibold">${{ slotProps.data.price }}</div>
            <span>
              <Button icon="pi pi-heart" outlined severity="secondary" />
              <Button class="ml-2" icon="pi pi-shopping-cart" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>

  <div class="card">
    <div class="mb-4 text-xl font-semibold">Image</div>
    <Image alt="Image" src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" width="250" />
  </div>

  <div class="card">
    <div class="mb-4 text-xl font-semibold">Galleria</div>
    <Galleria
      :value="images"
      :num-visible="5"
      :responsive-options="galleriaResponsiveOptions"
      container-style="max-width: 640px"
    >
      <template #item="slotProps">
        <img style="width: 100%;" :alt="slotProps.item.alt" :src="slotProps.item.itemImageSrc">
      </template>
      <template #thumbnail="slotProps">
        <img :alt="slotProps.item.alt" :src="slotProps.item.thumbnailImageSrc">
      </template>
    </Galleria>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { PhotoService } from '@/service/PhotoService'
import { ProductService } from '@/service/ProductService'

const products = ref([])
const images = ref([])
const galleriaResponsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '960px',
    numVisible: 4,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
])
const carouselResponsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1,
  },
])

onMounted(() => {
  ProductService.getProductsSmall().then(data => (products.value = data))
  PhotoService.getImages().then(data => (images.value = data))
})

function getSeverity(status) {
  switch (status) {
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
