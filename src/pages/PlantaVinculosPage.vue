<template>
  <q-page padding>
    <div>
      <div class="row col q-my-sm">
        <div class="col-1">
          <q-btn
            flat
            round
            size="sm"
            icon="mdi-arrow-left"
            color="green"
            @click="goBack"
          >
            <q-tooltip>Retornar</q-tooltip>
          </q-btn>
        </div>
        <div class="col text-center">
          <span style="font-size: 24px">
            Planta Bioativa:
            <span class="text-weight-bold" style="color: #7BB542FF">
              {{ bioativa }}
            </span>
          </span>
        </div>
      </div>
      <q-table
        flat
        hide-pagination
        :rows-per-page-options="[0]"
        :columns="pagina === 'produtores'? columnsProdutores : columnsIndustrias"
        :rows="rows"
        :loading="loadingData"
        loading-label="Carregando dados"
        :no-data-label="'Sem ' + pagina + ' para esta planta'"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span class="text-weight-bold">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-nome="props">
          <q-td :props="props">
            <div v-if="pagina === 'industrias'">
              <span class="row text-weight-bold">{{ props.row.razao_social }} </span>
              <span>{{ props.row.fantasia }} </span>
            </div>
            <div v-else>
              <span class="row">{{ props.row.nome }} </span>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import ProdutoresService from 'app/services/produtoresService'
import { ref } from 'vue'
import { usePLantaVinculosStore } from 'stores/plantaVinculos-store'
import { QTableProps } from 'quasar'
import { useRouter } from 'vue-router'
import IndustriasService from 'app/services/industriasService'

const router = useRouter()
const plantaVinculos = usePLantaVinculosStore()
const planta = plantaVinculos.plantaInfo.id
const bioativa = ref(plantaVinculos.plantaInfo.planta)
const pagina = ref(plantaVinculos.plantaInfo.pagina)
const columnsProdutores: QTableProps['columns'] = [
  { name: 'id', label: '', field: 'id', align: 'center', sortable: true },
  { name: 'nome', label: 'Produtor', field: 'nome', align: 'left', sortable: true },
  { name: 'localizacao', label: 'Localização', align: 'left', field: 'localizacao' },
  { name: 'contato', label: 'Contato', align: 'left', field: 'telefone' }
]
const columnsIndustrias: QTableProps['columns'] = [
  { name: 'id', label: '', field: 'id', align: 'center', sortable: true },
  { name: 'nome', label: 'Industria', field: 'razao_social', align: 'left', sortable: true },
  { name: 'localizacao', label: 'Localização', align: 'left', field: 'localizacao' },
  { name: 'contato', label: 'Contato', align: 'left', field: 'contato' }
]
const rows = ref([])
const loadingData = ref(false)
const goBack = () => {
  plantaVinculos.setPlanta(0, '', '')
  router.back()
}
const loadData = () => {
  pagina.value === 'produtores' ? loadProdutores() : loadIndustrias()
}
const loadProdutores = () => {
  loadingData.value = true
  ProdutoresService.getAll({ planta }).then((resp) => {
    if (resp.status === 200) {
      rows.value = resp.data.map((row: any, index: number) => {
        return { ...row, id: index + 1 }
      })
    }
  }).finally(() => {
    loadingData.value = false
  })
}
const loadIndustrias = () => {
  loadingData.value = true
  IndustriasService.getAll({ planta }).then((resp) => {
    if (resp.status === 200) {
      rows.value = resp.data.map((row: any, index: number) => {
        return { ...row, id: index + 1 }
      })
    }
  }).finally(() => {
    loadingData.value = false
  })
}
loadData()
</script>
