<template>
  <div class="image">
    <img :src="module.src || defaultImage" :alt="module.alt">
  </div>
</template>

<script setup lang="ts">
import defaultImage from '../images/default_image.svg'

defineProps<{
  module: UI.FullWidthImageModule
}>()
</script>

<style scoped lang="scss">
.image {
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
