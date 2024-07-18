<template>
  <div class="flex justify-center items-center h-screen w-screen ">
    <!-- <Button label="Check" icon="pi pi-check" @click="filter" /> -->
    <div class="w-auto h-auto overflow-auto">
      <DataTable v-model:filters="filters" :value="data" dataKey="id" paginator :rows="10" tableStyle="min-width: 50rem" stripedRows :rowsPerPageOptions="[5, 10, 15]" filterDisplay="row"
      :globalFilterFields="['category', 'text', 'id', 'createdAt']"
      >
        <template #header>
            <div class="flex justify-end">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
            </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" style="min-width: 14rem" :maxSelectedLabels="1">
                <template #option="slotProps">
                    <div class="flex items-center gap-2">
                        <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                        <span>{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </template>
        <Column v-for="col of columns" :key="col.field" :field="col.field" sortable :header="col.header" :filterField="col.field">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search" />
          </template>
        </Column>
      </DataTable>
    </div>

  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'
import { FilterMatchMode } from '@primevue/core/api';

definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const { data } = await useLazyFetch('https://668df8a1bf9912d4c92c5f5f.mockapi.io/api/v1/teste')

const columns = Object.keys(data.value[0]).map(key => ({ field: key, header: key }))

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    text: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    createdAt: { value: null, matchMode: FilterMatchMode.EQUALS },
    user_id: { value: null, matchMode: FilterMatchMode.EQUALS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },

});
</script>
