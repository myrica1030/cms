<template>
  <Carousel v-slot="{ slide, index }" :slides="module.slides">
    <div class="mask" />
    <div class="content">
      <h2 :contenteditable="contenteditable" @blur="e => updateContent(index, 'title', e.target?.innerHTML ?? '')">
        {{ slide.title }}
      </h2>
      <p :contenteditable="contenteditable" @blur="e => updateContent(index, 'body', e.target?.innerHTML ?? '')">
        {{ slide.body }}
      </p>
      <Button v-if="slide.button" :contenteditable="contenteditable" v-bind="slide.button" />
    </div>
  </Carousel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { currentSection } from 'src/stores/page-builder'
import Button from '../components/Button.vue'
import Carousel from '../components/Carousel.vue'

const props = defineProps<{
  module: UI.FullWidthCarouselModule
}>()

const emit = defineEmits<{
  (e: 'update', module: UI.FullWidthCarouselModule): void
}>()

const contenteditable = computed(() => (currentSection.value && 'module' in currentSection.value && currentSection.value.module.id === props.module.id) ?? undefined)

function updateContent(index: number, prop: keyof UI.Slide, html: string) {
  const newSlide: UI.Slide = { ...props.module.slides[index], [prop]: html.replaceAll(/^(\s|<br>)+|(\s|<br>)+$/g, '') }
  const newSlides: UI.Slide[] = props.module.slides.map((slide, i) => i === index ? newSlide : slide)
  emit('update', { ...props.module, slides: newSlides })
}
</script>

<style scoped lang="scss">
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background-color: #000;
  opacity: 0.3;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 1080px;
  height: 100%;
  margin: 0 auto;
  text-align: center;

  h2 {
    text-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  }

  p {
    text-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  }

  .button {
    margin-top: 12px;
  }
}
</style>
