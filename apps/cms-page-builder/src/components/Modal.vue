<template>
  <div
    ref="modal"
    class="modal"
    :style="toStyle(modalStyle)"
    role="dialog"
    :aria-modal="true"
    aria-label="Modal"
  >
    <header @mousedown="onDraggingStart">
      <h2>Section Settings</h2>
    </header>

    <div role="tablist" aria-label="Tabs">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.title"
        :id="`tab-${i}`"
        role="tab"
        :aria-controls="`panel-${i}`"
        :aria-selected="i === currentTab"
        :tabindex="i === currentTab ? -1 : 0"
        @click="currentTab = i"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tabs">
      <div
        v-for="(tab, i) in tabs"
        :key="tab.title"
        :id="`panel-${i}`"
        role="tabpanel"
        :aria-labelledby="`tab-${i}`"
        :tabindex="0"
        :hidden="i !== currentTab"
      >
        <Expansions v-slot="item" :list="tab.expansions">
          {{ item }}
        </Expansions>
      </div>
    </div>

    <div class="button-group">
      <button
        class="close"
        aria-label="Close modal"
        title="Close"
        @click="emit('close')"
      >
        <ion-icon name="close-outline" />
      </button>
      <button class="undo" aria-label="Undo" title="Undo">
        <ion-icon name="arrow-undo" />
      </button>
      <button class="redo" aria-label="Redo" title="Redo">
        <ion-icon name="arrow-redo" />
      </button>
      <button class="save" aria-label="Save" title="Save">
        <ion-icon name="checkmark-outline" />
      </button>
    </div>

    <button class="resize-handle" @mousedown="onResizingStart">
      <ion-icon name="resize-outline" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import storage from 'src/storage'
import { getScrollbarWidth, toStyle } from 'src/utils'
import Expansions from './Expansions.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
const currentTab = ref(0)
const tabs: { title: string, expansions: UI.Expansion[] }[] = [
  { title: 'Content', expansions: [{ summary: 'Text' }, { summary: 'Images' }, { summary: 'Link' }] },
  { title: 'Design', expansions: [{ summary: 'Text' }, { summary: 'Images' }, { summary: 'Link' }] },
  { title: 'Advanced', expansions: [{ summary: 'Text' }, { summary: 'Images' }, { summary: 'Link' }] },
]

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

const modal = ref<HTMLDivElement | null>(null)
const modalStyle: UI.ModalStyle = reactive({})

onMounted(() => {
  if (!modal.value) return
  const styleInStore = storage.modalPosition
  const style = styleInStore || window.getComputedStyle(modal.value)
  modalStyle.left = Number.parseInt(String(style.left))
  modalStyle.top = Number.parseInt(String(style.top))
  modalStyle.width = Number.parseInt(String(style.width))
  modalStyle.height = Number.parseInt(String(style.height))
  onMouseUp()
})

const draggingModal = ref(false)
const onDraggingStart = () => (draggingModal.value = true)

const resizingModal = ref(false)
const onResizingStart = () => (resizingModal.value = true)

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') return emit('close')
}

function onMouseMove(event: MouseEvent) {
  if (draggingModal.value) {
    modalStyle.left ??= 0
    modalStyle.left += event.movementX
    modalStyle.top ??= 0
    modalStyle.top += event.movementY
  }
  else if (resizingModal.value) {
    modalStyle.width ??= 0
    modalStyle.width += event.movementX
    modalStyle.height ??= 0
    modalStyle.height += event.movementY
  }
}

async function onMouseUp(event: MouseEvent | { movementX: number, movementY: number, target: any } = {} as any) {
  const scrollbarWidth = getScrollbarWidth()
  if (!modal.value) return
  const computedStyle = getComputedStyle(modal.value)
  const width = Number.parseInt(computedStyle.width)
  const height = Number.parseInt(computedStyle.height)

  draggingModal.value = false
  resizingModal.value = false

  // When dragged out of the window, target is document
  if (event.target === document || event.target?.closest?.('.modal') === modal.value) {
    modalStyle.transition = 'all .1s ease-out'
    setTimeout(() => {
      modalStyle.transition = undefined
      storage.modalPosition = modalStyle
    }, 100)
    await nextTick()
  }

  modalStyle.width ??= 0
  modalStyle.height ??= 0
  if (modalStyle.width < 400) modalStyle.width = 400
  else if (modalStyle.width > window.innerWidth - scrollbarWidth) modalStyle.width = window.innerWidth - scrollbarWidth
  if (modalStyle.height < 300) modalStyle.height = 300
  else if (modalStyle.height > window.innerHeight) modalStyle.height = window.innerHeight

  modalStyle.left ??= 0
  modalStyle.top ??= 0
  if (modalStyle.left + event.movementX < 0) modalStyle.left = 0
  else if (modalStyle.left + event.movementX + width > window.innerWidth - scrollbarWidth) modalStyle.left = window.innerWidth - width - scrollbarWidth
  if (modalStyle.top + event.movementY < 0) modalStyle.top = 0
  else if (modalStyle.top + event.movementY + height > window.innerHeight) modalStyle.top = window.innerHeight - height
}
</script>

<style scoped lang="scss">
$border-radius: 4px;

.modal {
  position: fixed;
  z-index: 1000;
  top: calc(50% - 250px);
  left: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 400px;
  min-width: 400px;
  max-width: 100vw;
  height: 500px;
  min-height: 300px;
  max-height: 100vh;
  background-color: #fff;
  border-radius: $border-radius;
  box-shadow: 0 5px 30px rgba(#000, 0.4);

  &:hover .resize-handle {
    transform: scale(1, 1);
  }
}

header {
  flex: none;
  padding: 24px;
  background-color: #6c2eb9;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  color: #fff;
  cursor: move;
  user-select: none;

  h2 {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 600;
  }
}

.tabs {
  overflow: hidden scroll;
  flex: auto;
  min-height: 0;
}

[role="tablist"] {
  display: flex;
  flex: none;
  background-color: #7e3bd0;

  button {
    padding: 12px 24px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: #fff;

    &:hover,
    &:focus {
      background-color: #7435c1;
    }

    &[aria-selected="true"] {
      background-color: #8e42eb;
    }
  }
}

[role="tabpanel"] {
  height: 100%;
  min-height: 300px;
  outline: none;
}

.button-group {
  display: flex;
  flex: none;
  height: 48px;

  button {
    --ionicon-stroke-width: 64px;

    flex: auto;
    height: 100%;
    border: none;
    font-size: 24px;
    color: #fff;

    &.close {
      background-color: $red;
    }

    &.undo {
      background-color: $purple;
      font-size: 22px;
    }

    &.redo {
      background-color: $blue;
      font-size: 22px;
    }

    &.save {
      background-color: $green;
    }
  }
}

.resize-handle {
  position: absolute;
  right: -15px;
  bottom: -15px;
  transform: scale(0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #4c5866;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 20px;
  color: #fff;
  transition: transform 0.1s ease;
  cursor: nwse-resize;

  ion-icon {
    --ionicon-stroke-width: 64px;

    transform: rotateZ(90deg);
  }
}
</style>
