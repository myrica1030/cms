<template>
  <Fluid class="flex flex-col gap-8 md:flex-row">
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">InputText</div>
        <div class="flex flex-col gap-4 md:flex-row">
          <InputText type="text" placeholder="Default" />
          <InputText type="text" :disabled="true" placeholder="Disabled" />
          <InputText type="text" invalid placeholder="Invalid" />
        </div>
        <div class="text-xl font-semibold">Icons</div>
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText type="text" placeholder="Username" />
        </IconField>
        <IconField icon-position="left">
          <InputText type="text" placeholder="Search" />
          <InputIcon class="pi pi-search" />
        </IconField>
        <div class="text-xl font-semibold">Float Label</div>
        <FloatLabel>
          <InputText id="username" type="text" v-model="floatValue" />
          <label for="username">Username</label>
        </FloatLabel>
        <div class="text-xl font-semibold">Textarea</div>
        <Textarea
          :auto-resize="true"
          cols="30"
          placeholder="Your Message"
          rows="3"
        />
        <div class="text-xl font-semibold">AutoComplete</div>
        <AutoComplete
          v-model="selectedAutoValue"
          :suggestions="autoFilteredValue"
          display="chip"
          dropdown
          multiple
          option-label="name"
          placeholder="Search"
          @complete="searchCountry($event)"
        />
        <div class="text-xl font-semibold">DatePicker</div>
        <DatePicker v-model="calendarValue" :show-button-bar="true" :show-icon="true" />
        <div class="text-xl font-semibold">InputNumber</div>
        <InputNumber v-model="inputNumberValue" mode="decimal" show-buttons />
      </div>

      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Slider</div>
        <InputText v-model.number="sliderValue" />
        <Slider v-model="sliderValue" />
        <div class="mt-6 flex flex-row">
          <div class="w-1/2 flex flex-col gap-4">
            <div class="text-xl font-semibold">Rating</div>
            <Rating v-model="ratingValue" />
          </div>
          <div class="w-1/2 flex flex-col gap-4">
            <div class="text-xl font-semibold">ColorPicker</div>
            <ColorPicker style="width: 2rem;" v-model="colorValue" />
          </div>
        </div>
        <div class="text-xl font-semibold">Knob</div>
        <Knob
          v-model="knobValue"
          :max="50"
          :min="-50"
          :step="10"
          value-template="{value}%"
        />
      </div>
    </div>
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">RadioButton</div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex items-center">
            <RadioButton
              id="option1"
              name="option"
              v-model="radioValue"
              value="Chicago"
            />
            <label for="option1" class="ml-2 leading-none">Chicago</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              id="option2"
              name="option"
              v-model="radioValue"
              value="Los Angeles"
            />
            <label for="option2" class="ml-2 leading-none">Los Angeles</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              id="option3"
              name="option"
              v-model="radioValue"
              value="New York"
            />
            <label for="option3" class="ml-2 leading-none">New York</label>
          </div>
        </div>
        <div class="text-xl font-semibold">Checkbox</div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex items-center">
            <Checkbox
              id="checkOption1"
              name="option"
              v-model="checkboxValue"
              value="Chicago"
            />
            <label for="checkOption1" class="ml-2">Chicago</label>
          </div>
          <div class="flex items-center">
            <Checkbox
              id="checkOption2"
              name="option"
              v-model="checkboxValue"
              value="Los Angeles"
            />
            <label for="checkOption2" class="ml-2">Los Angeles</label>
          </div>
          <div class="flex items-center">
            <Checkbox
              id="checkOption3"
              name="option"
              v-model="checkboxValue"
              value="New York"
            />
            <label for="checkOption3" class="ml-2">New York</label>
          </div>
        </div>
        <div class="text-xl font-semibold">ToggleSwitch</div>
        <ToggleSwitch v-model="switchValue" />
      </div>

      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">Listbox</div>
        <Listbox
          v-model="listboxValue"
          :filter="true"
          :options="listboxValues"
          option-label="name"
        />
        <div class="text-xl font-semibold">Select</div>
        <Select
          v-model="dropdownValue"
          :options="dropdownValues"
          option-label="name"
          placeholder="Select"
        />
        <div class="text-xl font-semibold">MultiSelect</div>
        <MultiSelect
          v-model="multiselectValue"
          :filter="true"
          :options="multiselectValues"
          option-label="name"
          placeholder="Select Countries"
        >
          <template #value="slotProps">
            <div v-for="option of slotProps.value" :key="option.code" class="mr-2 inline-flex items-center bg-primary px-2 py-1 text-primary-contrast rounded-border">
              <span :class="`mr-2 flag flag-${option.code.toLowerCase()}`" style="width: 18px; height: 12px;" />
              <div>{{ option.name }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              <div class="p-1">Select Countries</div>
            </template>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px;" />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>
        <div class="text-xl font-semibold">TreeSelect</div>
        <TreeSelect v-model="selectedNode" :options="treeSelectNodes" placeholder="Select Item" />
      </div>

      <div class="card flex flex-col gap-4">
        <div class="text-xl font-semibold">ToggleButton</div>
        <ToggleButton
          :style="{ width: '10em' }"
          v-model="toggleValue"
          off-label="No"
          on-label="Yes"
        />
        <div class="text-xl font-semibold">SelectButton</div>
        <SelectButton v-model="selectButtonValue" :options="selectButtonValues" option-label="name" />
      </div>
    </div>
  </Fluid>

  <Fluid class="mt-8 flex">
    <div class="card w-full flex flex-col gap-4">
      <div class="text-xl font-semibold">InputGroup</div>
      <div class="flex flex-col gap-4 md:flex-row">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <InputText placeholder="Username" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-clock" />
          </InputGroupAddon>
          <InputGroupAddon>
            <i class="pi pi-star-fill" />
          </InputGroupAddon>
          <InputNumber placeholder="Price" />
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupAddon>.00</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="flex flex-col gap-4 md:flex-row">
        <InputGroup>
          <Button label="Search" />
          <InputText placeholder="Keyword" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <Checkbox v-model="inputGroupValue" :binary="true" />
          </InputGroupAddon>
          <InputText placeholder="Confirm" />
        </InputGroup>
      </div>
    </div>
  </Fluid>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CountryService } from '@/service/CountryService'
import { NodeService } from '@/service/NodeService'

const floatValue = ref(null)
const autoValue = ref(null)
const selectedAutoValue = ref(null)
const autoFilteredValue = ref([])
const calendarValue = ref(null)
const inputNumberValue = ref(null)
const sliderValue = ref(50)
const ratingValue = ref(null)
const colorValue = ref('#1976D2')
const radioValue = ref(null)
const checkboxValue = ref([])
const switchValue = ref(false)
const listboxValues = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
const listboxValue = ref(null)
const dropdownValues = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
const dropdownValue = ref(null)
const multiselectValues = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
])

const multiselectValue = ref(null)
const toggleValue = ref(false)
const selectButtonValue = ref(null)
const selectButtonValues = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }])
const knobValue = ref(50)
const inputGroupValue = ref(false)
const treeSelectNodes = ref(null)
const selectedNode = ref(null)

onMounted(() => {
  CountryService.getCountries().then(data => (autoValue.value = data))
  NodeService.getTreeNodes().then(data => (treeSelectNodes.value = data))
})

function searchCountry(event) {
  setTimeout(() => {
    if (event.query.trim().length) {
      autoFilteredValue.value = autoValue.value.filter(country => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }
    else {
      autoFilteredValue.value = [...autoValue.value]
    }
  }, 250)
}
</script>
