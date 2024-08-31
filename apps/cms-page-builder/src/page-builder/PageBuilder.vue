<template>
  <div class="page-builder" :spellcheck="false">
    <TransitionGroup
      tag="div"
      name="flip"
      class="section-container"
      @dragover="onDragOver"
    >
      <section
        v-for="(section, index) in pageConfig.sections.filter(it => it)"
        :id="`section-${section.id}`"
        :key="section.id"
        role="menuitem"
        tabindex="0"
        @mouseenter="onSelectSection(section)"
        @focusin="onSelectSection(section)"
      >
        <SectionDistributor
          v-if="section.type === 'full-width'"
          :section="section"
          @update="section => onSectionUpdate(index, section)"
        />
      </section>
    </TransitionGroup>

    <SectionOperator @dragend="onDragEnd" @dragstart="onDragStart" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import examplePageConfig from 'src/examplePageConfig'
import SectionDistributor from 'src/page-builder/SectionDistributor.vue'
import SectionOperator from 'src/page-builder/SectionOperator.vue'
import { currentDragOverSection, currentDragSection, currentSection, sectionModal } from 'src/stores/pageBuilder'
import { pageConfig } from 'src/stores/pageConfig'
import { throttle } from 'src/utils'

pageConfig.value = examplePageConfig

onMounted(() => {
  document.addEventListener('dragover', e => e.preventDefault())
})

function onSelectSection(section: UI.Section) {
  if (sectionModal.value) return
  currentSection.value = section
}

function onSectionUpdate(index: number, section: UI.Section) {
  pageConfig.value.sections[index] = section
}

function onDragStart(section: UI.Section) {
  const index = pageConfig.value.sections.indexOf(section)
  currentDragSection.value = pageConfig.value.sections[index]
  currentSection.value = null
  pageConfig.value.sections.splice(index, 1)
}

function onDragEnd() {
  let insertIndex = pageConfig.value.sections.findIndex(it => it.id === currentDragOverSection.value.section?.id)
  if (!currentDragOverSection.value.isTop) insertIndex += 1
  pageConfig.value.sections.splice(insertIndex, 0, currentDragSection.value!)
  currentDragSection.value = null
}

const onDragOver = throttle((event: DragEvent) => {
  const sectionElement = (event.target as HTMLElement)?.closest('section')
  if (!sectionElement) return
  event.stopPropagation()
  const topThreshold = sectionElement.offsetTop + sectionElement.offsetHeight / 2
  const isTop = event.clientY < topThreshold
  const sectionId = sectionElement?.id.replace(/^section-/, '')
  const section = pageConfig.value.sections.find(it => it.id === sectionId) ?? null
  currentDragOverSection.value = { section, isTop }
}, 100)
</script>

<style lang="scss">
.page-builder {
  position: relative;
}

.flip-move,
.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0;
}

.flip-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
