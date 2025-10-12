<template>
  <q-scroll-area :thumb-style="thumbStylePerso" style="height: 50vh" :bar-style="barStyle" class="q-my-md">
    <div class="q-my-sm" v-for="(data, index) in dataTable" :key="index">
      <q-card flat>
        <q-card-section>
          <div class="row">
            <div class="col-5 flex content-center">
              <div class="row no-wrap">
                <q-img
                  :src="data.imagem"
                  loading="eager"
                  alt="Imagem do data"
                  class="col-3"
                  fit="fill"
                  width="148px"
                  height="139px"
                  style="border-radius: 30px"
                  @click="selectDetalhe(data)"
                />
                <div class="q-ml-sm q-mr-md column col">
                  <div class="q-mb-sm">
                    <span style="font-weight: bolder">{{ data.nome_cientifico }}</span>
                    <span v-if="data.autor"> ({{ data.autor }}) </span>
                  </div>
                  <div>
                    <span>A <i>{{ data.nome_cientifico }}</i> é popularmente conhecida como
                    {{ data.nome_popular }}
                    </span>
                    <span v-if="data.sinonimia"> ou {{ data.sinonimia }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!usuario" class="items-center flex col-4">
              <q-chip
                class="q-ml-xl"
                style="border-radius: 10px; background-color: #7BB542; margin-left: 2.5vw;"
                text-color="white"
              > {{ data.n_produtores }}
              </q-chip>
            </div>
            <div v-else class="items-center flex col-4">
              <q-list>
                <q-item v-for="(indicacao, indexIndicacao) in data.indicacoes" v-bind:key="indexIndicacao"
                        class="flex flex-center justify-center"
                >
                  <div class="custom-bullet"></div>
                  <q-item-section>{{ indicacao.descricao }}</q-item-section>
                </q-item>
              </q-list>
            </div>
            <div v-if="!usuario" class="col-2 flex flex-center column">
              <q-chip
                class=""
                style="border-radius: 10px; background-color: #7BB542;"
                text-color="white"
              > {{ data.n_industrias }}
              </q-chip>
            </div>
            <div v-else class="col-3 flex flex-start justify-center column">
              <div class="flex flex-start justify-center row">
                <q-icon size="sm" name="mdi-link-variant"/>
                <div><span @click="gotoPlantaProdutores(data)" style="cursor: pointer">Página de produtores</span></div>
              </div>
              <div class="flex flex-start justify-center q-mt-md row">
                <q-icon size="sm" name="mdi-link-variant"/>
                <div><span @click="gotoPlantaIndustrias(data)" style="cursor: pointer">Página de indústrias</span></div>
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
import { useStyledScrollArea } from 'src/composables/StyledScrollArea'
import { date } from 'quasar'
import PlantasService from 'app/services/plantasService'
import { Industria, Planta } from 'src/interfaces/interfaces'
import { useRouter } from 'vue-router'
import { usePLantaVinculosStore } from 'stores/plantaVinculos-store'

export default defineComponent({
  name: 'ShowPlantasTableComponent',
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
    const dataTable = ref<Array<Planta>>([])
    const route = useRouter()
    let dataCollected: Planta[] = []
    const { thumbStylePerso, barStyle } = useStyledScrollArea()
    const usuario = localStorage.getItem('usuario')
    const selectDetalhe = (detalhe: Industria) => {
      emit('detalheSelecionado', detalhe)
    }
    const loadData = async () => {
      const filter: { letter?: string, loadRelationsPlanta?: boolean } = {}
      if (props.letter) {
        filter.letter = props.letter
      }
      if (usuario) {
        filter.loadRelationsPlanta = true
      }
      PlantasService.getAll(filter).then((resp) => {
        dataTable.value = resp.data
        dataCollected = resp.data
      }).catch((error) => {
        console.error('Erro ao carregar plantas:', error)
        return []
      })
    }
    const removeAccents = (text: string) => {
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    const filterData = (text: string) => {
      const lowerText = removeAccents(text.toLowerCase())
      return dataTable.value.filter((item: Planta) => {
        return removeAccents(item.nome_cientifico.toLowerCase()).includes(lowerText) ||
          removeAccents(item.nome_popular.toLowerCase()).includes(lowerText) ||
          item.indicacoes?.some(indicacao => removeAccents(indicacao.descricao.toLowerCase()).includes(lowerText))
      })
    }
    const gotoPlantaProdutores = (parametro: { id: number, nome_popular: string }) => {
      const plantaVinculosStore = usePLantaVinculosStore()
      plantaVinculosStore.setPlanta(parametro.id, parametro.nome_popular, 'produtores')
      route.push({ path: '/plantavinculos' })
    }
    const gotoPlantaIndustrias = (parametro: { id: number, nome_popular: string }) => {
      const plantaVinculosStore = usePLantaVinculosStore()
      plantaVinculosStore.setPlanta(parametro.id, parametro.nome_popular, 'industrias')
      route.push({ path: '/plantavinculos' })
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
      gotoPlantaProdutores,
      gotoPlantaIndustrias,
      usuario,
      dataTable,
      thumbStylePerso,
      barStyle,
      selectDetalhe
    }
  }
})
</script>
<style scoped>
.custom-bullet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 8px;
  position: absolute;
  left: 0;
  transform: translateY(50%);
}
</style>
