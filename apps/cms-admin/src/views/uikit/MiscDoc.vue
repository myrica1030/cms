<template>
  <div class="card">
    <div class="mb-4 text-xl font-semibold">ProgressBar</div>
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="md:w-1/2">
        <ProgressBar :value="value" />
      </div>
      <div class="md:w-1/2">
        <ProgressBar :value="50" :show-value="false" />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-8 md:flex-row">
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Badge</div>
        <div class="flex gap-2">
          <Badge :value="2" />
          <Badge :value="8" severity="success" />
          <Badge :value="4" severity="info" />
          <Badge :value="12" severity="Warn" />
          <Badge :value="3" severity="danger" />
        </div>
        <div class="my-4 font-semibold">Overlay</div>
        <div class="flex gap-6">
          <OverlayBadge value="2">
            <i class="pi pi-bell" style="font-size: 2rem;" />
          </OverlayBadge>
          <OverlayBadge value="4" severity="danger">
            <i class="pi pi-calendar" style="font-size: 2rem;" />
          </OverlayBadge>
          <OverlayBadge severity="danger">
            <i class="pi pi-envelope" style="font-size: 2rem;" />
          </OverlayBadge>
        </div>
        <div class="my-4 font-semibold">Button</div>
        <div class="flex gap-2">
          <Button class="mr-2" badge="8" label="Emails" />
          <Button
            badge="8"
            badge-class="p-badge-danger"
            icon="pi pi-users"
            severity="warn"
            label="Messages"
          />
        </div>
        <div class="my-4 font-semibold">Sizes</div>
        <div class="flex items-start gap-2">
          <Badge :value="2" />
          <Badge :value="4" severity="warn" size="large" />
          <Badge :value="6" severity="success" size="xlarge" />
        </div>
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">Avatar</div>
        <div class="mb-4 font-semibold">Group</div>
        <AvatarGroup>
          <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle" size="large" />
          <Avatar image="/demo/images/avatar/asiyajavayant.png" shape="circle" size="large" />
          <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle" size="large" />
          <Avatar image="/demo/images/avatar/ionibowcher.png" shape="circle" size="large" />
          <Avatar image="/demo/images/avatar/xuxuefeng.png" shape="circle" size="large" />
          <Avatar
            :style="{ 'background-color': '#9c27b0', 'color': '#ffffff' }"
            shape="circle"
            size="large"
            label="+2"
          />
        </AvatarGroup>
        <div class="my-4 font-semibold">Label - Circle</div>
        <Avatar
          class="mr-2"
          shape="circle"
          size="xlarge"
          label="P"
        />
        <Avatar
          class="mr-2"
          :style="{ 'background-color': '#2196F3', 'color': '#ffffff' }"
          shape="circle"
          size="large"
          label="V"
        />
        <Avatar
          class="mr-2"
          :style="{ 'background-color': '#9c27b0', 'color': '#ffffff' }"
          shape="circle"
          label="U"
        />
        <div class="my-4 font-semibold">Icon - Badge</div>
        <OverlayBadge class="inline-flex" value="4" severity="danger">
          <Avatar size="xlarge" label="U" />
        </OverlayBadge>
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">ScrollTop</div>
        <ScrollPanel :style="{ width: '250px', height: '200px' }">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
            adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor
            augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet
            nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus
            viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
          </p>
          <ScrollTop :threshold="100" icon="pi pi-arrow-up" target="parent" />
        </ScrollPanel>
      </div>
    </div>
    <div class="md:w-1/2">
      <div class="card">
        <div class="mb-4 text-xl font-semibold">Tag</div>
        <div class="mb-4 font-semibold">Default</div>
        <div class="flex gap-2">
          <Tag value="Primary" />
          <Tag value="Success" severity="success" />
          <Tag value="Info" severity="info" />
          <Tag value="Warn" severity="warn" />
          <Tag value="Danger" severity="danger" />
        </div>
        <div class="my-4 font-semibold">Pills</div>
        <div class="flex gap-2">
          <Tag value="Primary" :rounded="true" />
          <Tag value="Success" :rounded="true" severity="success" />
          <Tag value="Info" :rounded="true" severity="info" />
          <Tag value="Warn" :rounded="true" severity="warn" />
          <Tag value="Danger" :rounded="true" severity="danger" />
        </div>
        <div class="my-4 font-semibold">Icons</div>
        <div class="flex gap-2">
          <Tag value="Primary" icon="pi pi-user" />
          <Tag value="Success" icon="pi pi-check" severity="success" />
          <Tag value="Info" icon="pi pi-info-circle" severity="info" />
          <Tag value="Warn" con="pi pi-exclamation-triangle" severity="warn" />
          <Tag value="Danger" icon="pi pi-times" severity="danger" />
        </div>
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">Chip</div>
        <div class="mb-4 font-semibold">Basic</div>
        <div class="flex flex-col items-center sm:flex-row">
          <Chip class="mb-2 mr-2" label="Action" />
          <Chip class="mb-2 mr-2" label="Comedy" />
          <Chip class="mb-2 mr-2" label="Mystery" />
          <Chip class="mb-2" :removable="true" label="Thriller" />
        </div>
        <div class="my-4 font-semibold">Icon</div>
        <div class="flex flex-col items-center sm:flex-row">
          <Chip class="mb-2 mr-2" icon="pi pi-apple" label="Apple" />
          <Chip class="mb-2 mr-2" icon="pi pi-facebook" label="Facebook" />
          <Chip class="mb-2 mr-2" icon="pi pi-google" label="Google" />
          <Chip
            class="mb-2"
            :removable="true"
            icon="pi pi-microsoft"
            label="Microsoft"
          />
        </div>
        <div class="my-4 font-semibold">Image</div>
        <div class="flex flex-col items-center sm:flex-row">
          <Chip class="mb-2 mr-2" image="/demo/images/avatar/amyelsner.png" label="Amy Elsner" />
          <Chip class="mb-2 mr-2" image="/demo/images/avatar/asiyajavayant.png" label="Asiya Javayant" />
          <Chip class="mb-2 mr-2" image="/demo/images/avatar/onyamalimba.png" label="Onyama Limba" />
        </div>
      </div>

      <div class="card">
        <div class="mb-4 text-xl font-semibold">Skeleton</div>
        <div class="border p-6 border-surface rounded-border">
          <div class="mb-4 flex">
            <Skeleton class="mr-2" shape="circle" size="4rem" />
            <div>
              <Skeleton class="mb-2" width="10rem" />
              <Skeleton class="mb-2" width="5rem" />
              <Skeleton height=".5rem" />
            </div>
          </div>
          <Skeleton height="150px" width="100%" />
          <div class="mt-4 flex justify-between">
            <Skeleton height="2rem" width="4rem" />
            <Skeleton height="2rem" width="4rem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const value = ref(0)
let interval = null

function startProgress() {
  interval = setInterval(() => {
    let newValue = value.value + Math.floor(Math.random() * 10) + 1
    if (newValue >= 100) {
      newValue = 100
    }
    value.value = newValue
  }, 2000)
}

function endProgress() {
  clearInterval(interval)
  interval = null
}

onMounted(() => {
  startProgress()
})

onBeforeUnmount(() => {
  endProgress()
})
</script>
