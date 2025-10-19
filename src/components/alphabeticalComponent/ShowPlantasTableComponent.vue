<template>
  <q-scroll-area :thumb-style="thumbStylePerso" style="height: 500px" :bar-style="barStyle" >
    <div class="table_row" v-for="(data, index) in dataTable" :key="index">
      <q-card flat>
        <q-card-section class="row no-wrap q-pa-md card_table" @click="selectDetalhe(data)">
          <div class="col-8 flex content-center">
            <div class="row no-wrap" style="width: 100%;">
              <q-img
                :src="data.imagem"
                loading="eager"
                alt="Imagem do planta"
                class="table_image"
                fit="fill"
                style="border-radius: 30px; cursor: pointer;"
              />
              <div class="q-ml-md q-mr-md column col table_infos">
                <div class="">
                  <span class="" style="color: var(--color-dark);">{{ data.nome_cientifico }}</span>
                  <span v-if="data.autor" style="color: var(--color-dark);"> ({{ data.autor }}) </span>
                </div>
                <div>
                  <span style="color: var(--color-gray);">A <i>{{ data.nome_cientifico }}</i> é popularmente conhecida como
                  <b>{{ data.nome_popular }}</b>
                  </span>
                  <span v-if="data.sinonimia" style="color: var(--color-gray);"> ou {{ data.sinonimia }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!usuario" class="flex flex-center col-2">
            <span
              class="table_chip"
            > {{ data.n_produtores }}
            </span>
          </div>
          <div v-else class="items-center flex col-2">
            <q-list>
              <q-item v-for="(indicacao, indexIndicacao) in data.indicacoes" v-bind:key="indexIndicacao"
                      class="flex flex-center justify-center"
              >
                <div class="custom-bullet"></div>
                <q-item-section>{{ indicacao.descricao }}</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-if="!usuario" class="col-2 flex flex-center ">
            <span
              class="table_chip"
            > {{ data.n_industrias }}
            </span>
          </div>
          <div v-else class="col-2 flex flex-start justify-center ">
            <div class="flex flex-start justify-center row">
              <q-icon size="sm" name="mdi-link-variant"/>
              <div><span @click="gotoPlantaProdutores(data)" style="cursor: pointer">Página de produtores</span></div>
            </div>
            <div class="flex flex-start justify-center q-mt-md row">
              <q-icon size="sm" name="mdi-link-variant"/>
              <div><span @click="gotoPlantaIndustrias(data)" style="cursor: pointer">Página de indústrias</span></div>
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

.table_row {
  border-top: 1px solid var(--color-gray-mid);
  cursor: pointer;
}

.table_image {
  width: 100px;
  height: 100px;
}

.table_chip {
  background-color: var(--color-primary-light);
  color: var(--color-dark);
  padding: 10px 15px;
  border-radius: 50%;
  font-weight: bold;
}

.table_infos {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card_table:hover {
  background: var(--color-gray-light) !important;
}
</style>
