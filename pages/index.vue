<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen relative" v-if="logs.length > 0">
    <div class="absolute top-2 right-2 flex justify-center items-center gap-4">
      Olá, {{ name }}!
      <Button label="logout" @click="logout" />


    </div>
    <ClientOnly>
      <div class="max-h-[95vh] overflow-auto">

        <Card>
          <template #subtitle>Filtrar por id e categoria</template>
          <template #content>
            <div class="card flex gap-4">
              <Select v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Categoria" class="w-full md:w-56" />
              <FloatLabel>
                <label for="id">ID</label>
                <InputNumber id="id" v-model="selectedId"/>
              </FloatLabel>
              <Button :disabled="selectedId == null || selectedCategory == null" @click="filterLogs">Filtrar</Button>
              <Button @click="clearLogs()">Limpar</Button>
            </div>
          </template>
        </Card>
        <div class="w-auto h-auto overflow-auto">
          <DataTable v-model:filters="filters" :value="logs" dataKey="id" paginator :rows="10" tableStyle="min-width: 50rem" stripedRows :rowsPerPageOptions="[5, 10, 15]" filterDisplay="row"
          :globalFilterFields="['category', 'text', 'userId', 'createdAt']"
          >
            <!-- <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template> -->
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
    </ClientOnly>

    
  </div>
</template>

<script setup>


definePageMeta({
    middleware: 'auth'
}) 

import 'primeicons/primeicons.css'
import { FilterMatchMode } from '@primevue/core/api';
import { useAuthStore } from '~/store/auth'; 
import { useMyCategoriesStore } from '~/store/categories';
import { useMyLogStore } from '~/store/logs';
import FloatLabel from 'primevue/floatlabel';
const { name } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore(); 

const categoryStore = useMyCategoriesStore();

const selectedCategory = ref(null);

const selectedId = ref(null);

const logStore = useMyLogStore();

const categories = computed( () =>{
  return categoryStore.categories;
})

onMounted( async () => {
  await categoryStore.getCategories();
  await logStore.getLogs();
})

async function filterLogs() {
  await logStore.filteredLogs(selectedId.value, selectedCategory.value );
}

async function clearLogs() {
  await logStore.getLogs();
  selectedCategory.value = null;
  selectedId.value = null;
}

const logs = computed( () =>{
  return logStore.logs;
})

const router = useRouter();
const logout = () => {
  logUserOut();
  router.push('/login');
}


const columns = [
  { field: 'userId', header: 'ID' },
  { field: 'category', header: 'Categoria' },
  { field: 'action', header: 'Ação' },
  { field: 'createdAt', header: 'Data'}
]

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    action: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    createdAt: { value: null, matchMode: FilterMatchMode.EQUALS },
    userId: { value: null, matchMode: FilterMatchMode.EQUALS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },

});
</script>
