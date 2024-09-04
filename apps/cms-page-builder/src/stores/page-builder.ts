import { ref } from 'vue'

export const currentSection = ref<UI.Section | null>(null)

export const currentDragSection = ref<UI.Section | null>(null)

export const currentDragOverSection = ref<{ section: UI.Section | null, isTop: boolean }>({
  section: null,
  isTop: true,
})

export const sectionModal = ref(false)
