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
                  alt="Imagem da Industria"
                  fit="fill"
                  width="148px"
                  height="139px"
                  style="border-radius: 30px"
                  @click="selectDetalhe(data)"
                />
                <div class="q-ml-sm column ">
                  <div>Nome da indístria</div>
                  <div style="font-weight: bold">{{ data.fantasia }}</div>
                  <div class="q-mt-sm">Localização da fábrica</div>
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
                    :src="planta.imagem"
                    loading="eager"
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
            <div class="col-2 flex flex-center column">
              <div v-if="data.contato">Contato: {{ data.contato }}</div>
              <div v-else>
                <q-icon class="q-my-md" size="35px" name="mdi-eye-off-outline"/>
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
import IndustriasService from 'app/services/industriasService'
import { Industria, Planta } from 'src/interfaces/interfaces'
import { useStyledScrollArea } from 'src/composables/StyledScrollArea'

export default defineComponent({
  name: 'ShowIndustriasTableComponent',
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
    const dataTable = ref<Array<Industria>>([])
    let dataCollected: Industria[] = []
    const { thumbStylePerso, barStyle } = useStyledScrollArea()
    const selectDetalhe = (detalhe: Industria) => {
      emit('detalheSelecionado', detalhe)
    }
    const loadData = async () => {
      let filter = {}
      if (props.letter) {
        filter = {
          letter: props.letter
        }
      }
      IndustriasService.getAll(filter).then((resp) => {
        dataTable.value = resp.data
        dataCollected = resp.data
      }).catch((error) => {
        console.error('Erro ao carregar plantas:', error)
        return []
      })
    }
    const filterData = (text: string) => {
      const lowerText = text.toLowerCase()
      return dataTable.value.filter((item: Industria) => {
        return item.fantasia.toLowerCase().includes(lowerText) || (item.plantas && item.plantas.some((planta: Planta) => {
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
