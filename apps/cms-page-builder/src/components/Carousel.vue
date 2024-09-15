<template>
  <div
    class="carousel"
    @focusin="pause = true"
    @focusout="pause = false"
    @mouseenter="pause = true"
    @mouseleave="pause = false"
  >
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="slide"
        :style="{ backgroundImage: `url(${slide.background})` }"
        @focusin="currentSlide = i"
      >
        <slot :index="i" :slide="slide" />
      </div>
    </div>

    <div v-if="indicator" class="indicator">
      <span
        v-for="(_, i) in slides"
        :key="i"
        :class="{ active: currentSlide === i }"
        @click="currentSlide = i"
        @keypress="currentSlide = i"
      />
    </div>

    <template v-if="arrow">
      <div class="left-control" @click="prevSlide" @keypress="prevSlide">
        <ion-icon name="chevron-down-outline" />
      </div>
      <div class="right-control" @click="nextSlide" @keypress="nextSlide">
        <ion-icon name="chevron-down-outline" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  slides: UI.Slide[]
  arrow?: boolean
  indicator?: boolean
  duration?: number
}>(), {
  arrow: true,
  indicator: true,
  duration: 5000,
})

const currentSlide = ref(0)
const pause = ref(false)

function nextSlide() {
  currentSlide.value += 1
  if (currentSlide.value >= props.slides.length) currentSlide.value = 0
}

function prevSlide() {
  currentSlide.value -= 1
  if (currentSlide.value < 0) currentSlide.value = props.slides.length - 1
}

function autoplay() {
  setInterval(() => {
    if (pause.value) return
    nextSlide()
  }, props.duration)
}

function onVisibilityChange() {
  pause.value = document.visibilityState === 'hidden'
}

onMounted(() => {
  props.duration > 0 && autoplay()
  document.addEventListener('visibilitychange', onVisibilityChange)
})
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<style scoped lang="scss">
.carousel {
  position: relative;
  clear: both;
  overflow: hidden;

  &:hover {
    .left-control {
      left: 0;
      opacity: 1;
    }

    .right-control {
      right: 0;
      opacity: 1;
    }
  }
}

.slides {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  transition: transform 0.4s ease-in-out;
}

.slide {
  position: relative;
  flex: none;
  width: 100%;
  padding: 48px 0;
  background: transparent center / cover no-repeat;
  color: #fff;
}

.indicator {
  position: absolute;
  right: 0;
  bottom: 8%;
  left: 0;
  display: flex;
  justify-content: center;

  > span {
    position: relative;
    display: block;
    margin: 0 2px;
    padding: 4px;
    opacity: 0.2;
    transition: opacity 0.2s;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 100%;
    }

    &.active {
      opacity: 0.8;
    }
  }
}

.left-control,
.right-control {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 48px;
  max-width: 128px;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  ion-icon {
    font-size: 40px;
    color: rgba(#fff, 0.6);
  }
}

.left-control {
  left: -48px;

  ion-icon {
    transform: rotateZ(90deg);
  }
}

.right-control {
  right: -48px;

  ion-icon {
    transform: rotateZ(-90deg);
  }
}
</style>
