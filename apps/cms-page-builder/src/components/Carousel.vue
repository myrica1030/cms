<template>
  <div
    class="carousel"
    @mouseenter="pause = true"
    @mouseleave="pause = false"
    @focusin="pause = true"
    @focusout="pause = false"
  >
    <div class="slides" :style="{transform: `translateX(-${currentSlide*100}%)`}">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="slide"
        :style="{backgroundImage: `url(${slide.background})`}"
        @focusin="currentSlide = i"
      >
        <slot :index="i" :slide="slide" />
      </div>
    </div>

    <div v-if="indicator" class="indicator">
      <span
        v-for="(_, i) in slides"
        :key="i"
        :class="{active: currentSlide === i}"
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
import {onBeforeUnmount, onMounted} from 'vue'

const {
  slides,
  arrow = true,
  indicator = true,
  duration = 5000,
} = defineProps<{
  slides: UI.Slide[]
  arrow?: boolean
  indicator?: boolean
  duration?: number
}>()

let currentSlide = $ref(0)
let pause = $ref(false)

const nextSlide = () => {
  currentSlide += 1
  if (currentSlide >= slides.length) currentSlide = 0
}

const prevSlide = () => {
  currentSlide -= 1
  if (currentSlide < 0) currentSlide = slides.length - 1
}

const autoplay = () => {
  setInterval(() => {
    if (pause) return
    nextSlide()
  }, duration)
}

const onVisibilityChange = () => {
  pause = document.visibilityState === 'hidden'
}

onMounted(() => {
  duration > 0 && autoplay()
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
  transition: transform .4s ease-in-out;
}

.slide {
  position: relative;
  flex: none;
  width: 100%;
  padding: 48px 0;
  color: #fff;
  background: transparent center / cover no-repeat;
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
    cursor: pointer;
    opacity: .2;
    transition: opacity .2s;

    &::after {
      display: block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      content: '';
      border-radius: 100%;
    }

    &.active {
      opacity: .8;
    }
  }
}

.left-control, .right-control {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 48px;
  max-width: 128px;
  cursor: pointer;
  opacity: 0;
  transition: all .4s ease-in-out;

  ion-icon {
    color: rgba(#fff, .6);
    font-size: 40px;
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
