<template>
  <div class="expansions">
    <div
      v-for="(item, i) in list"
      :key="item.summary"
      class="details"
      :class="{ open: i === currentExpand }"
    >
      <h3 class="summary" @click="onToggle(i)" @keypress="onToggle(i)">
        {{ item.summary }}
        <ion-icon name="chevron-down-outline" />
      </h3>

      <Collapse :expand="i === currentExpand">
        <div class="content">
          <slot v-bind="item" />
        </div>
      </Collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Collapse from 'src/components/Collapse.vue'

defineProps<{
  list: UI.Expansion[]
}>()

const currentExpand = ref(-1)

function onToggle(index: number) {
  if (currentExpand.value === index) currentExpand.value = -1
  else currentExpand.value = index
}
</script>

<style scoped lang="scss">
.expansions {
  .details {
    border-bottom: 1px solid #f1f5f9;

    .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 16px 24px;
      font-size: 20px;
      color: #a3b0c2;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      ion-icon {
        transition: transform ease-in-out;
        transition-duration: 0.2s;
      }
    }

    .content {
      padding: 16px 24px;
    }

    &.open {
      .summary {
        color: #2b87da;

        ion-icon {
          transform: rotateX(180deg);
        }
      }
    }
  }
}
</style>
