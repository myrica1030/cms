<template>
  <div class="full-width-header" :style="module.style">
    <div class="full-width-container">
      <h2
        v-if="module.title"
        :contenteditable="contenteditable"
        @blur="e => updateContent('title', e.target?.innerHTML ?? '')"
        v-html="module.title"
      />

      <h3
        v-if="module.subTitle"
        :contenteditable="contenteditable"
        @blur="e => updateContent('subTitle', e.target?.innerHTML ?? '')"
        v-html="module.subTitle"
      />

      <div
        v-if="module.body"
        class="body"
        :contenteditable="contenteditable"
        @blur="e => updateContent('body', e.target?.innerHTML?? '')"
        v-html="module.body"
      />

      <Button v-if="module.button1" v-bind="module.button1" :contenteditable="contenteditable" />
      <Button v-if="module.button2" v-bind="module.button2" :contenteditable="contenteditable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {currentSection} from 'src/stores/pageBuilder'
import {computed} from 'vue'
import Button from '../components/Button.vue'

const props = defineProps<{
  module: UI.FullWidthHeaderModule
}>()

const emit = defineEmits<{
  (e:'update', module: UI.FullWidthHeaderModule): void
}>()

const contenteditable = computed(() => (currentSection.value && 'module' in currentSection.value && currentSection.value.module.id === props.module.id) ?? undefined)

const updateContent = (prop: keyof Pick<UI.FullWidthHeaderModule, 'title' | 'subTitle' | 'body'>, html: string) => {
  const newModule: UI.FullWidthHeaderModule = { ...props.module, [prop]: html.replace(/^(\s|<br>)+|(\s|<br>)+$/g, '') }
  emit('update', newModule)
}
</script>

<style scoped lang="scss">
.full-width-header {
  color: #fff;
  padding: 64px;

  h2 {
    margin-bottom: 16px;
  }

  .body {
    margin-bottom: 24px;
  }
}
</style>
