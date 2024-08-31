<template>
  <a
    v-if="link"
    class="button"
    :style="style"
    :href="link"
    :tabindex="contenteditable ? -1 : 0"
    @click="e => contenteditable && e.preventDefault()"
  >
    <span :contenteditable="contenteditable">{{ text }}</span>
    <ion-icon name="chevron-forward-outline" />
  </a>
  <button v-else class="button" :style="style" :tabindex="contenteditable ? -1 : 0">
    <span :contenteditable="contenteditable">{{ text }}</span>
    <ion-icon name="chevron-forward-outline" />
  </button>
</template>

<script setup lang="ts">
import type {StyleValue} from 'vue'

defineProps<{
  text: string
  link?: string
  style?: StyleValue
  contenteditable?: boolean
}>()
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: inline-block;
  margin: 0 0.5em 0 0;
  padding: .3em 1em;
  color: inherit;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.7em;
  white-space: nowrap;
  text-decoration: none;
  text-shadow: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: all .2s;
  border: 2px solid;
  border-radius: 3px;

  ion-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: all .2s;
    height: unset;
    font-size: 120%;
    right: 0;
    width: 0;
  }

  &:hover,
  &:focus {
    padding: .3em 1.8em .3em .7em;
    background-color: hsla(0, 0%, 100%, .2);
    border-color: transparent;

    ion-icon {
      opacity: 1;
      right: 0.3em;
      width: 1em;
    }
  }

  span[contenteditable=true] {
    display: inline-block;
    min-width: 1em;
    min-height: 1em;
  }
}
</style>
