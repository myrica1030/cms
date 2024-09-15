<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Default</div>
        <div class="flex flex-wrap gap-2">
          <Button label="Submit" />
          <Button disabled label="Disabled" />
          <Button class="p-button-link" label="Link" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Severities</div>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" />
          <Button severity="secondary" label="Secondary" />
          <Button severity="success" label="Success" />
          <Button severity="info" label="Info" />
          <Button severity="warn" label="Warn" />
          <Button severity="help" label="Help" />
          <Button severity="danger" label="Danger" />
          <Button severity="contrast" label="Contrast" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Text</div>
        <div class="flex flex-wrap gap-2">
          <Button text label="Primary" />
          <Button severity="secondary" text label="Secondary" />
          <Button severity="success" text label="Success" />
          <Button severity="info" text label="Info" />
          <Button severity="warn" text label="Warn" />
          <Button severity="help" text label="Help" />
          <Button severity="danger" text label="Danger" />
          <Button plain text label="Plain" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Outlined</div>
        <div class="flex flex-wrap gap-2">
          <Button outlined label="Primary" />
          <Button outlined severity="secondary" label="Secondary" />
          <Button outlined severity="success" label="Success" />
          <Button outlined severity="info" label="Info" />
          <Button outlined severity="warn" label="warn" />
          <Button outlined severity="help" label="Help" />
          <Button outlined severity="danger" label="Danger" />
          <Button outlined severity="contrast" label="Contrast" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Group</div>
        <div class="flex flex-wrap gap-2">
          <ButtonGroup>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-trash" label="Delete" />
            <Button icon="pi pi-times" label="Cancel" />
          </ButtonGroup>
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">SplitButton</div>
        <div class="flex flex-wrap gap-2">
          <SplitButton :model="items" label="Save" />
          <SplitButton :model="items" severity="secondary" label="Save" />
          <SplitButton :model="items" severity="success" label="Save" />
          <SplitButton :model="items" severity="info" label="Save" />
          <SplitButton :model="items" severity="warn" label="Save" />
          <SplitButton :model="items" severity="help" label="Save" />
          <SplitButton :model="items" severity="danger" label="Save" />
          <SplitButton :model="items" severity="contrast" label="Save" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Templating</div>
        <div class="flex flex-wrap gap-2">
          <Button type="button">
            <img style="width: 1.5rem;" alt="logo" src="/demo/images/logo-white.svg">
          </Button>
          <Button type="button" outlined severity="success">
            <img style="width: 1.5rem;" alt="logo" src="/demo/images/logo.svg">
            <span class="text-bold ml-2">PrimeVue</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Icons</div>
        <div class="flex flex-wrap gap-2">
          <Button class="mb-2 mr-2" icon="pi pi-star-fill" />
          <Button class="mb-2 mr-2" icon="pi pi-bookmark" label="Bookmark" />
          <Button
            class="mb-2 mr-2"
            icon="pi pi-bookmark"
            icon-pos="right"
            label="Bookmark"
          />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Raised</div>
        <div class="flex flex-wrap gap-2">
          <Button raised label="Primary" />
          <Button raised severity="secondary" label="Secondary" />
          <Button raised severity="success" label="Success" />
          <Button raised severity="info" label="Info" />
          <Button raised severity="warn" label="Warn" />
          <Button raised severity="help" label="Help" />
          <Button raised severity="danger" label="Danger" />
          <Button raised severity="contrast" label="Contrast" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Rounded</div>
        <div class="flex flex-wrap gap-2">
          <Button rounded label="Primary" />
          <Button rounded severity="secondary" label="Secondary" />
          <Button rounded severity="success" label="Success" />
          <Button rounded severity="info" label="Info" />
          <Button rounded severity="warn" label="Warn" />
          <Button rounded severity="help" label="Help" />
          <Button rounded severity="danger" label="Danger" />
          <Button rounded severity="contrast" label="Contrast" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Rounded Icons</div>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-check" rounded />
          <Button icon="pi pi-bookmark" rounded severity="secondary" />
          <Button icon="pi pi-search" rounded severity="success" />
          <Button icon="pi pi-user" rounded severity="info" />
          <Button icon="pi pi-bell" rounded severity="warn" />
          <Button icon="pi pi-heart" rounded severity="help" />
          <Button icon="pi pi-times" rounded severity="danger" />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Rounded Text</div>
        <div class="flex flex-wrap gap-2">
          <Button
            icon="pi pi-check"
            raised
            rounded
            text
          />
          <Button
            icon="pi pi-bookmark"
            raised
            rounded
            severity="secondary"
            text
          />
          <Button
            icon="pi pi-search"
            raised
            rounded
            severity="success"
            text
          />
          <Button
            icon="pi pi-user"
            raised
            rounded
            severity="info"
            text
          />
          <Button
            icon="pi pi-bell"
            raised
            rounded
            severity="warn"
            text
          />
          <Button
            icon="pi pi-heart"
            raised
            rounded
            severity="help"
            text
          />
          <Button
            icon="pi pi-times"
            raised
            rounded
            severity="danger"
            text
          />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Rounded Outlined</div>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-check" outlined rounded />
          <Button
            icon="pi pi-bookmark"
            outlined
            rounded
            severity="secondary"
          />
          <Button
            icon="pi pi-search"
            outlined
            rounded
            severity="success"
          />
          <Button
            icon="pi pi-user"
            outlined
            rounded
            severity="info"
          />
          <Button
            icon="pi pi-bell"
            outlined
            rounded
            severity="warn"
          />
          <Button
            icon="pi pi-heart"
            outlined
            rounded
            severity="help"
          />
          <Button
            icon="pi pi-times"
            outlined
            rounded
            severity="danger"
          />
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Loading</div>
        <div class="flex flex-wrap gap-2">
          <Button
            type="button"
            class="mb-2 mr-2"
            :loading="loading[0]"
            icon="pi pi-search"
            @click="load(0)"
            label="Search"
          />
          <Button
            type="button"
            class="mb-2 mr-2"
            :loading="loading[1]"
            icon="pi pi-search"
            icon-pos="right"
            @click="load(1)"
            label="Search"
          />
          <Button
            type="button"
            class="mb-2 mr-2"
            :loading="loading[2]"
            icon="pi pi-search"
            @click="load(2)"
          />
          <Button
            type="button"
            class="mb-2 mr-2"
            :loading="loading[3]"
            @click="load(3)"
            label="Search"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
  {
    separator: true,
  },
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
])

const loading = ref([false, false, false])

function load(index) {
  loading.value[index] = true
  setTimeout(() => (loading.value[index] = false), 1000)
}
</script>
