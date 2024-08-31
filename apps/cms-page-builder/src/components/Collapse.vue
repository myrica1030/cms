<template>
  <Transition v-on="animations">
    <div v-show="expand" class="collapse">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  expand: boolean
}>()

/**
 * Collapse animation snippets
 * https://stackoverflow.com/a/55137929/7736393
 */
const animations = {
  beforeEnter (element: HTMLElement) {
    requestAnimationFrame(() => {
      if (!element.style.height) {
        element.style.height = '0px'
      }
      element.style.removeProperty('display')
    })
  },
  enter (element: HTMLElement) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.height = `${element.scrollHeight}px`
      })
    })
  },
  afterEnter (element:HTMLElement) {
    element.style.removeProperty('height')
  },
  beforeLeave (element:HTMLElement) {
    requestAnimationFrame(() => {
      if (!element.style.height) {
        element.style.height = `${element.offsetHeight}px`
      }
    })
  },
  leave (element:HTMLElement) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.height = '0px'
      })
    })
  },
  afterLeave (element:HTMLElement) {
    element.style.removeProperty('height')
  },
}
</script>

<style scoped lang="scss">
.collapse {
  overflow: hidden;
  transition: height .2s ease-in-out;
}
</style>
