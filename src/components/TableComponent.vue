<template>
  <q-dialog persistent ref="dialogRef" @hide="onDialogCancel">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 170vw">
      <q-table
        :rows="tableData"
        :columns="tableColumns"
        :rows-per-page-options="[10, 20, 50]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="column in tableColumns"
              :key="column.name"
              :props="props"
            >
              {{ props.row[column.name] }}
              <q-popup-edit v-model="props.row[column.name]" v-slot="scope">
                <q-select
                  v-if="column.name === 'nome_popular'"
                  v-model="scope.value"
                  dense
                  :options="plantasOptions"
                  :loading="loading"
                  emit-value
                  map-options
                  option-label="nome_popular"
                  option-value="nome_popular"
                  label="Selecione a planta que é utilizada"
                  hide-bottom-space
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                  @update:model-value="scope.set"
                ></q-select>
                <q-input
                  v-else-if="column.name === 'data_entrega_est'"
                  v-model="scope.value"
                  dense
                  autofocus
                  type="date"
                  counter
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                  @update:model-value="scope.set"
                />
                <q-input
                  v-else
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                  @blur="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="Salvar"/>
        <q-btn color="primary" label="Cancel" @click="onDialogCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef } from 'vue'
import { date, QTableProps, useDialogPluginComponent, useQuasar } from 'quasar'
import { Planta, TableDataInterface } from 'src/interfaces/interfaces'
import PlantasService from 'app/services/plantasService'
import { GetErrorMessage } from 'src/composables/helper'

export default defineComponent({
  name: 'TableComponent',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const tableData = ref<TableDataInterface[]>([])
    const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
    const dadosProp = toRef(props, 'user')
    const plantasOptions = ref<Array<Planta>>([])
    const $q = useQuasar()
    const loading = ref(false)

    const Salvar = () => {
      onDialogOK()
    }

    const tableColumns: QTableProps['columns'] = [
      {
        name: 'nome_popular',
        required: true,
        label: 'Planta',
        align: 'left',
        field: 'planta_id',
        sortable: true
      },
      {
        name: 'producao_est',
        required: true,
        label: 'Quantidade estimada',
        align: 'left',
        field: 'producao_est',
        sortable: true
      },
      {
        name: 'data_entrega_est',
        required: true,
        label: 'Data estimada',
        align: 'left',
        field: 'data_entrega_est',
        sortable: true
      }
    ]

    const tablePagination = {
      rowsPerPage: 10
    }

    const addRow = () => {
      tableData.value.push({
        id: undefined,
        quantidade_estimada: '',
        data_estimada: ''
      })
    }

    const getPlantas = async () => {
      loading.value = true
      const getResp = await PlantasService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (getResp) {
        plantasOptions.value = getResp.data
      }
    }

    onMounted(() => {
      tableData.value = dadosProp.value.plantas.map((planta: Planta) => {
        console.log('tt', planta)
        return {
          ...planta,
          data_entrega_est: date.formatDate(planta.data_entrega_est, 'DD-MM-YYYY')
        }
      })
      getPlantas()
      addRow()
    })

    return {
      tableData,
      tableColumns,
      tablePagination,
      dialogRef,
      plantasOptions,
      loading,
      onDialogCancel,
      addRow,
      Salvar
    }
  }
})
</script>
