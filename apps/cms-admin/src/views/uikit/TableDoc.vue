<template>
  <div class="card">
    <div class="mb-4 text-xl font-semibold">Filtering</div>
    <DataTable
      v-model:filters="filters1"
      :value="customers1"
      :loading="loading1"
      :filters="filters1"
      :global-filter-fields="['name', 'country.name', 'representative.name', 'balance', 'status']"
      :paginator="true"
      :row-hover="true"
      :rows="10"
      filter-display="menu"
      show-gridlines
      data-key="id"
    >
      <template #header>
        <div class="flex justify-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            outlined
            @click="clearFilter()"
            label="Clear"
          />
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters1.global.value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column style="min-width: 12rem;" field="name" header="Name">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" placeholder="Search by name" />
        </template>
      </Column>
      <Column style="min-width: 12rem;" filter-field="country.name" header="Country">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :class="`flag flag-${data.country.code}`"
              style="width: 24px;"
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            >
            <span>{{ data.country.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" placeholder="Search by country" />
        </template>
        <template #filterclear="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-times"
            severity="secondary"
            @click="filterCallback()"
          />
        </template>
        <template #filterapply="{ filterCallback }">
          <Button
            type="button"
            icon="pi pi-check"
            severity="success"
            @click="filterCallback()"
          />
        </template>
      </Column>
      <Column
        style="min-width: 14rem;"
        :filter-menu-style="{ width: '14rem' }"
        :show-filter-match-modes="false"
        filter-field="representative"
        header="Agent"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img style="width: 32px;" :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`">
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <MultiSelect
            v-model="filterModel.value"
            :options="representatives"
            option-label="name"
            placeholder="Any"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <img style="width: 32px;" :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`">
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column
        style="min-width: 10rem;"
        filter-field="date"
        header="Date"
        data-type="date"
      >
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
          <DatePicker v-model="filterModel.value" date-format="mm/dd/yy" placeholder="mm/dd/yyyy" />
        </template>
      </Column>
      <Column
        style="min-width: 10rem;"
        filter-field="balance"
        header="Balance"
        data-type="numeric"
      >
        <template #body="{ data }">
          {{ formatCurrency(data.balance) }}
        </template>
        <template #filter="{ filterModel }">
          <InputNumber
            v-model="filterModel.value"
            currency="USD"
            locale="en-US"
            mode="currency"
          />
        </template>
      </Column>
      <Column
        style="min-width: 12rem;"
        :filter-menu-style="{ width: '14rem' }"
        field="status"
        header="Status"
      >
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
          <Select
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            show-clear
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
            </template>
          </Select>
        </template>
      </Column>
      <Column
        style="min-width: 12rem;"
        :show-filter-match-modes="false"
        field="activity"
        header="Activity"
      >
        <template #body="{ data }">
          <ProgressBar style="height: 6px;" :value="data.activity" :show-value="false" />
        </template>
        <template #filter="{ filterModel }">
          <Slider class="m-4" v-model="filterModel.value" range />
          <div class="flex items-center justify-between px-2">
            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
          </div>
        </template>
      </Column>
      <Column
        style="min-width: 8rem;"
        body-class="text-center"
        field="verified"
        header="Verified"
        data-type="boolean"
      >
        <template #body="{ data }">
          <i class="pi" :class="{ 'pi-check-circle text-green-500 ': data.verified, 'pi-times-circle text-red-500': !data.verified }" />
        </template>
        <template #filter="{ filterModel }">
          <label for="verified-filter" class="font-bold"> Verified </label>
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === null"
            binary
            input-id="verified-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <div class="card">
    <div class="mb-4 text-xl font-semibold">Frozen Columns</div>
    <ToggleButton
      v-model="balanceFrozen"
      off-icon="pi pi-lock-open"
      off-label="Balance"
      on-icon="pi pi-lock"
      on-label="Balance"
    />
    <DataTable
      class="mt-6"
      :value="customers2"
      scroll-height="400px"
      scrollable
    >
      <Column
        class="font-bold"
        style="min-width: 200px;"
        field="name"
        frozen
        header="Name"
      />
      <Column style="min-width: 100px;" field="id" header="Id" />
      <Column style="min-width: 200px;" field="name" header="Name" />
      <Column style="min-width: 200px;" field="country.name" header="Country" />
      <Column style="min-width: 200px;" field="date" header="Date" />
      <Column style="min-width: 200px;" field="company" header="Company" />
      <Column style="min-width: 200px;" field="status" header="Status" />
      <Column style="min-width: 200px;" field="activity" header="Activity" />
      <Column style="min-width: 200px;" field="representative.name" header="Representative" />
      <Column
        style="min-width: 200px;"
        :frozen="balanceFrozen"
        align-frozen="right"
        field="balance"
        header="Balance"
      >
        <template #body="{ data }">
          <span class="font-bold">{{ formatCurrency(data.balance) }}</span>
        </template>
      </Column>
    </DataTable>
  </div>

  <div class="card">
    <div class="mb-4 text-xl font-semibold">Row Expansion</div>
    <DataTable
      v-model:expanded-rows="expandedRows"
      :value="products"
      table-style="min-width: 60rem"
      data-key="id"
    >
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button
            icon="pi pi-plus"
            text
            @click="expandAll"
            label="Expand All"
          />
          <Button
            icon="pi pi-minus"
            text
            @click="collapseAll"
            label="Collapse All"
          />
        </div>
      </template>
      <Column style="width: 5rem;" expander />
      <Column field="name" header="Name" />
      <Column header="Image">
        <template #body="slotProps">
          <img
            class="shadow-lg"
            :alt="slotProps.data.image"
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            width="64"
          >
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category" />
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating :model-value="slotProps.data.rating" readonly />
        </template>
      </Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.inventoryStatus" :severity="getStockSeverity(slotProps.data)" />
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-4">
          <h5>Orders for {{ slotProps.data.name }}</h5>
          <DataTable :value="slotProps.data.orders">
            <Column field="id" header="Id" sortable />
            <Column field="customer" header="Customer" sortable />
            <Column field="date" header="Date" sortable />
            <Column field="amount" header="Amount" sortable>
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.amount) }}
              </template>
            </Column>
            <Column field="status" header="Status" sortable>
              <template #body="slotProps">
                <Tag :value="slotProps.data.status.toLowerCase()" :severity="getOrderSeverity(slotProps.data)" />
              </template>
            </Column>
            <Column header-style="width:4rem">
              <template #body>
                <Button icon="pi pi-search" />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>

  <div class="card">
    <div class="mb-4 text-xl font-semibold">Grouping</div>
    <DataTable
      :value="customers3"
      :sort-order="1"
      group-rows-by="representative.name"
      row-group-mode="subheader"
      scroll-height="400px"
      scrollable
      sort-field="representative.name"
      sort-mode="single"
      table-style="min-width: 50rem"
    >
      <template #groupheader="slotProps">
        <div class="flex items-center gap-2">
          <img
            style="vertical-align: middle;"
            :alt="slotProps.data.representative.name"
            :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`"
            width="32"
          >
          <span>{{ slotProps.data.representative.name }}</span>
        </div>
      </template>
      <Column field="representative.name" header="Representative" />
      <Column style="min-width: 200px;" field="name" header="Name" />
      <Column style="min-width: 200px;" field="country" header="Country">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <img
              :class="`flag flag-${slotProps.data.country.code}`"
              style="width: 24px;"
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            >
            <span>{{ slotProps.data.country.name }}</span>
          </div>
        </template>
      </Column>
      <Column style="min-width: 200px;" field="company" header="Company" />
      <Column style="min-width: 200px;" field="status" header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
        </template>
      </Column>
      <Column style="min-width: 200px;" field="date" header="Date" />
      <template #groupfooter="slotProps">
        <div class="w-full flex justify-end font-bold">Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}</div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { CustomerService } from '@/service/CustomerService'
import { ProductService } from '@/service/ProductService'

const customers1 = ref(null)
const customers2 = ref(null)
const customers3 = ref(null)
const filters1 = ref(null)
const loading1 = ref(null)
const balanceFrozen = ref(false)
const products = ref(null)
const expandedRows = ref([])
const statuses = reactive(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'])
const representatives = reactive([
  { name: 'Amy Elsner', image: 'amyelsner.png' },
  { name: 'Anna Fali', image: 'annafali.png' },
  { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { name: 'Onyama Limba', image: 'onyamalimba.png' },
  { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  { name: 'XuXue Feng', image: 'xuxuefeng.png' },
])

function getOrderSeverity(order) {
  switch (order.status) {
    case 'DELIVERED': {
      return 'success'
    }

    case 'CANCELLED': {
      return 'danger'
    }

    case 'PENDING': {
      return 'warn'
    }

    case 'RETURNED': {
      return 'info'
    }

    default: {
      return null
    }
  }
}

function getSeverity(status) {
  switch (status) {
    case 'unqualified': {
      return 'danger'
    }

    case 'qualified': {
      return 'success'
    }

    case 'new': {
      return 'info'
    }

    case 'negotiation': {
      return 'warn'
    }

    case 'renewal': {
      return null
    }
  }
}

function getStockSeverity(product) {
  switch (product.inventoryStatus) {
    case 'INSTOCK': {
      return 'success'
    }

    case 'LOWSTOCK': {
      return 'warn'
    }

    case 'OUTOFSTOCK': {
      return 'danger'
    }

    default: {
      return null
    }
  }
}

onBeforeMount(() => {
  ProductService.getProductsWithOrdersSmall().then(data => (products.value = data))
  CustomerService.getCustomersLarge().then(data => {
    customers1.value = data
    loading1.value = false
    for (const customer of customers1.value) customer.date = new Date(customer.date)
  })
  CustomerService.getCustomersLarge().then(data => (customers2.value = data))
  CustomerService.getCustomersMedium().then(data => (customers3.value = data))

  initFilters1()
})

function initFilters1() {
  filters1.value = {
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'representative': { value: null, matchMode: FilterMatchMode.IN },
    'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'activity': { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
    'verified': { value: null, matchMode: FilterMatchMode.EQUALS },
  }
}

function expandAll() {
  // eslint-disable-next-line unicorn/no-array-reduce
  expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {})
}

function collapseAll() {
  expandedRows.value = null
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function formatDate(value) {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function calculateCustomerTotal(name) {
  let total = 0
  if (customers3.value) {
    for (const customer of customers3.value) {
      if (customer.representative.name === name) {
        total++
      }
    }
  }

  return total
}
</script>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
