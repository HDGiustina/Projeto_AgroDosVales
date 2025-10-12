<template>
  <q-scroll-area :thumb-style="thumbStylePerso" style="height: 50vh" :bar-style="barStyle" class="q-my-md">
    <div class="q-my-sm" v-for="(data, index) in dataTable" :key="index">
      <q-card flat>
        <q-card-section>
          <div class="row">
            <div class="col-5 flex content-center">
              <div class="row no-wrap">
                <q-img
                  :src="data.miniatura"
                  loading="eager"
                  alt="Imagem do Produtor"
                  fit="fill"
                  width="148px"
                  height="139px"
                  style="border-radius: 30px"
                  @click="selectDetalhe(data)"
                />
                <div class="q-ml-sm column">
                  <div>Data de cadastro:</div>
                  <div style="font-weight: bold">{{ date.formatDate(data.created_at, 'DD/MM/YYYY') }}</div>
                  <div>Localização:</div>
                  <div style="font-weight: bold">{{ data.localizacao }}</div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div
                v-for="(planta, plantaIndex) in data.plantas"
                :key="plantaIndex"
                class="row q-my-sm"
              >
                <div class="col-2">
                  <q-img
                    loading="eager"
                    :src="planta.imagem"
                    alt="Imagem da planta"
                    style="max-height: 50px; max-width: 50px"
                  />
                </div>
                <div class="col-8">
                  <div>{{ planta.nome_cientifico }}</div>
                  <div>{{ planta.nome_popular }}</div>
                </div>
              </div>
            </div>
            <div class="col-2 flex flex-start justify-center column">
              <div v-if="data.telefone">Telefone: {{ data.telefone }}</div>
              <div style="margin-left: 5.4vw;" v-else>
                <q-icon class="q-my-md" size="35px" name="mdi-eye-off-outline"/>
              </div>
              <div v-if="data.email">Email: {{ data.email }}</div>
              <div style="margin-left: 5.4vw;" v-else>
                <q-icon size="35px" name="mdi-eye-off-outline"/>
              </div>
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
