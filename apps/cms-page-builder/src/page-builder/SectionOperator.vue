<template>
  <div class="section-operator" :style="toStyle(borderRect)">
    <div class="border" />

    <div class="section-menu">
      <button
        aria-label="Move"
        class="move"
        draggable="true"
        @dragend="onDragEnd"
        @dragstart="onDratStart"
      >
        <ion-icon name="move-sharp" />
      </button>
      <button aria-label="Settings" class="settings" @click="onModalOpen">
        <ion-icon name="settings-sharp" />
      </button>
      <button aria-label="Duplicate section" class="duplicate" @click="onDuplicate">
        <ion-icon name="duplicate-sharp" />
      </button>
      <button aria-label="Delete section" class="delete" @click="onDelete">
        <ion-icon name="trash-sharp" />
      </button>
    </div>

    <button aria-label="Add section" class="add-section">
      <ion-icon name="add-sharp" />
    </button>
  </div>

  <div class="drag-over-placeholder" :style="toStyle(dragOverRect)" />

  <Modal v-if="sectionModal" @close="onModalClose">
    You selected section {{ currentModalSection?.id }}
    (<a :href="`#section-${currentModalSection?.id}`">{currentModalSection.id}</a>)
  </Modal>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import Modal from 'src/components/Modal.vue'
import { currentDragOverSection, currentDragSection, currentSection, sectionModal } from 'src/stores/pageBuilder'
import { pageConfig } from 'src/stores/pageConfig'
import { generateId, toStyle } from 'src/utils'

const emit = defineEmits<{
  (e: 'dragstart', currentSection: UI.Section): void
  (e: 'dragend'): void
}>()

const dragOverPlaceholderHeight = 48

const currentModalSection = ref<UI.Section | null>(pageConfig.value.sections[0])

function onModalOpen() {
  sectionModal.value = true
}

function onModalClose() {
  sectionModal.value = false
  currentModalSection.value = null
}

type SectionRect = Partial<Record<'top' | 'height' | 'opacity', number>>
const borderRect = ref<SectionRect>({ top: 0, height: 0, opacity: 0 })
const dragOverRect = ref<SectionRect>({ top: 0, height: 0, opacity: 0 })

watch(currentSection, section => {
  if (sectionModal.value) return
  if (!section || currentDragSection.value) return (borderRect.value = {})

  currentModalSection.value = section
  dragOverRect.value = {}
  const element = document.querySelector(`#section-${section.id}`) as HTMLElement
  borderRect.value = {
    top: element.offsetTop,
    height: element.offsetHeight,
    opacity: element ? 1 : 0,
  }
})

watch(currentDragOverSection, ({ section, isTop }) => {
  if (!section || !currentDragSection.value) return (dragOverRect.value = {})

  const element = document.querySelector(`#section-${section.id}`) as HTMLElement
  let offsetTop = element.offsetTop
  if (!isTop) offsetTop += element.offsetHeight - dragOverPlaceholderHeight
  dragOverRect.value = {
    top: offsetTop,
    height: dragOverPlaceholderHeight,
    opacity: 1,
  }
})

function onDuplicate() {
  const targetIndex = pageConfig.value.sections.findIndex(it => it.id === currentSection.value?.id)
  if (targetIndex === -1) return
  const regularSection = cloneDeep(pageConfig.value.sections[targetIndex])
  regularSection.id = generateId()
  pageConfig.value.sections.splice(targetIndex, 0, regularSection)
}

function onDelete() {
  const targetIndex = pageConfig.value.sections.findIndex(it => it.id === currentSection.value?.id)
  if (targetIndex === -1) return pageConfig
  pageConfig.value.sections.splice(targetIndex, 1)
  borderRect.value = {}
}

async function onDratStart(event: DragEvent) {
  if (!currentSection.value) return
  const sectionElement = document.querySelector(`#section-${currentSection.value.id}`)
  if (!sectionElement) return
  const elementTop = sectionElement.getBoundingClientRect().top + document.documentElement.scrollTop
  const elementLeft = sectionElement.getBoundingClientRect().left + document.documentElement.scrollLeft
  const offsetTop = event.pageY - elementTop
  const offsetLeft = event.pageX - elementLeft
  event.dataTransfer?.setDragImage(sectionElement, offsetLeft, offsetTop)
  emit('dragstart', currentSection.value)
}

function onDragEnd() {
  emit('dragend')
}
</script>

<style scoped lang="scss">
.section-operator {
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  opacity: 0;
  transition: all .2s ease-out;
  pointer-events: none;

  .border {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border: 4px solid $blue;
  }

  .section-menu {
    display: flex;
    padding: 12px;
    background-color: $blue;
    pointer-events: auto;
    border-radius: 3px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      background: transparent;
      border: none;

      &.move {
        cursor: move;
      }
    }
  }

  .add-section {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-bottom: -19px;
    margin-left: -20px;
    padding: 0;
    color: #fff;
    font-size: 30px;
    background-color: $blue;
    transition: all .2s;
    pointer-events: auto;
    border: none;
    border-radius: 40px;

    &:hover,
    &:focus {
      transform: scale(1.2, 1.2);
    }
  }
}

.drag-over-placeholder {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 100%;
  background-color: rgba(#fff, .2);
  transition: all .2s ease;
  pointer-events: none;
}
</style>
