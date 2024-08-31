<template>
  <div class="expansions">
    <div
      v-for="(item, i) in list"
      :key="item.summary"
      class="details"
      :class="{open: i === currentExpand}"
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
import Collapse from 'src/components/Collapse.vue'

defineProps<{
  list: UI.Expansion[]
}>()

let currentExpand = $ref(-1)

const onToggle = (index: number) => {
  if (currentExpand === index) currentExpand = -1
  else currentExpand = index
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
      color: #a3b0c2;
      font-size: 20px;
      cursor: pointer;
      transition: all .2s ease-in-out;

      ion-icon {
        transition: transform ease-in-out;
        transition-duration: .2s;
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
