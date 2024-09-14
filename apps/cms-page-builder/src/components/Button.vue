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
  <button
    v-else
    class="button"
    :style="style"
    :tabindex="contenteditable ? -1 : 0"
  >
    <span :contenteditable="contenteditable">{{ text }}</span>
    <ion-icon name="chevron-forward-outline" />
  </button>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'

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
  padding: 0.3em 1em;
  background-color: transparent;
  border: 2px solid;
  border-radius: 3px;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.7em;
  color: inherit;
  text-decoration: none;
  text-shadow: none;
  white-space: nowrap;
  transition: all 0.2s;
  cursor: pointer;

  ion-icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: unset;
    opacity: 0;
    font-size: 120%;
    transition: all 0.2s;
  }

  &:hover,
  &:focus {
    padding: 0.3em 1.8em 0.3em 0.7em;
    background-color: hsl(0deg 0% 100% / 20%);
    border-color: transparent;

    ion-icon {
      right: 0.3em;
      width: 1em;
      opacity: 1;
    }
  }

  span[contenteditable="true"] {
    display: inline-block;
    min-width: 1em;
    min-height: 1em;
  }
}
</style>
