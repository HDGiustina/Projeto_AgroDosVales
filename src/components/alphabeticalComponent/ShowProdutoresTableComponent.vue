<template>
  <q-scroll-area :thumb-style="thumbStylePerso" style="height: 500px" :bar-style="barStyle">
    <div class="table_row" v-for="(data, index) in dataTable" :key="index" @click="selectDetalhe(data)">
      <q-card flat>
        <q-card-section class="card_table">
          <div class="row">
            <div class="col-3 flex content-center">
              <div class="row no-wrap">
                <q-img
                  v-if="data.miniatura"
                  :src="data.miniatura"
                  loading="eager"
                  alt="Imagem do Produtor"
                  fit="fill"
                  width="148px"
                  height="139px"
                  style="border-radius: 30px"
                />
                <div class="q-ml-sm column">
                  <div>Data de cadastro:</div>
                  <div style="font-weight: bold">{{ date.formatDate(data.created_at, 'DD/MM/YYYY') }}</div>
                  <div>Localização:</div>
                  <div style="font-weight: bold">{{ data.localizacao }}</div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div
                v-for="(planta, plantaIndex) in data.plantas"
                :key="plantaIndex"
                class="row q-my-sm"
                style="display: flex; gap: 12px; align-items: center;"
              >
                <q-img
                  loading="eager"
                  :src="planta.imagem"
                  alt="Imagem da planta"
                  style="width: 70px; height: 70px; border-radius: 20px"
                />
                <div class="">
                  <div class="text-bold">{{ planta.nome_popular }}</div>
                  <div>{{ planta.nome_cientifico }}</div>
                </div>
              </div>
            </div>
            <div class="col-2 flex flex-start justify-center column">
              <div v-if="data.telefone">Telefone: {{ data.telefone }}</div>
              <div v-if="data.email">Email: {{ data.email }}</div>
              <div v-if="!data.telefone && !data.email" class="info_restrito">Restrito</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { date } from 'quasar'
import ProdutoresService from 'app/services/produtoresService'
import { Planta, Produtor } from 'src/interfaces/interfaces'
import { useStyledScrollArea } from 'src/composables/StyledScrollArea'

export default defineComponent({
  name: 'ShowProdutoresTableComponent',
  props: {
    tab: {
      type: String,
      required: true
    },
    param: {
      type: String,
      required: false
    },
    letter: {
      type: String,
      required: false
    }
  },
  computed: {
    date () {
      return date
    }
  },
  setup (props, { emit }) {
    const dataTable = ref<Array<Produtor>>([])
    let dataCollected: Produtor[] = []
    const { thumbStylePerso, barStyle } = useStyledScrollArea()
    const selectDetalhe = (detalhe: Produtor) => {
      emit('detalheSelecionado', detalhe)
    }
    const loadData = () => {
      let filter = {}
      if (props.letter) {
        filter = {
          letter: props.letter
        }
      }
      ProdutoresService.getAll(filter).then((resp) => {
        dataTable.value = resp.data
        dataCollected = resp.data
      }).catch((error) => {
        console.error('Erro ao carregar produtores:', error)
        return []
      })
    }
    const filterData = (text: string) => {
      const lowerText = text.toLowerCase()
      return dataTable.value.filter((item: Produtor) => {
        return item.nome.toLowerCase().includes(lowerText) || item.localizacao.toLowerCase().includes(lowerText) ||
          (item.plantas && item.plantas.some((planta: Planta) => {
            return planta.nome_cientifico.toLowerCase().includes(lowerText) || planta.nome_popular.toLowerCase().includes(lowerText)
          }))
      })
    }
    watch(() => props.param, (newValue, oldValue) => {
      if (!newValue) {
        dataTable.value = dataCollected
      } else {
        if (!oldValue || newValue.length < oldValue.length) {
          dataTable.value = dataCollected
        }
        dataTable.value = filterData(newValue)
      }
    })
    watch(() => props.letter, async () => {
      await loadData()
    })
    watch(() => props.tab, async () => {
      await loadData()
    })
    loadData()
    return {
      dataTable,
      thumbStylePerso,
      barStyle,
      selectDetalhe
    }
  }
})
</script>

<style scoped>
.table_row {
  border-top: 1px solid var(--color-gray-mid);
  cursor: pointer;
}

.card_table:hover {
  background: var(--color-gray-light) !important;
}

.info_restrito {
  border: 1px solid var(--q-negative);
  color: var(--q-negative);
  padding: 2px 8px;
  border-radius: 12px;
  width: auto;
  margin: auto;
}
</style>
