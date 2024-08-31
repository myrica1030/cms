<template>
  <component
    :is="fullWidthModuleMap[module.type]"
    v-if="section.type === 'full-width' && module"
    :module="module"
    @update="onUpdate"
  />
  <template v-else-if="section.type === 'regular'">
    Regular section
  </template>
</template>

<script setup lang="ts">
import FullWidthCarouselModule from '../modules/FullWidthCarouselModule.vue'
import FullWidthImageModule from '../modules/FullWidthImageModule.vue'
import FullWidthHeaderModule from '../modules/FullWidthHeaderModule.vue'

const { section } = defineProps<{
  section: UI.Section
}>()
const emit = defineEmits<{
  (e: 'update', section: UI.Section): void
}>()

const module = $computed<UI.FullWidthModule | null>(() => 'module' in section ? section.module : null)

const fullWidthModuleMap: Record<UI.FullWidthModule['type'], unknown> = {
  'full-width-header': FullWidthHeaderModule,
  'full-width-image': FullWidthImageModule,
  'full-width-carousel': FullWidthCarouselModule,
}

function onUpdate (module: UI.Module) {
  if (!('module' in section)) return
  emit('update', { ...section, module })
}
</script>
