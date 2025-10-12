<template>
  <div>
    <div class="q-my-lg">
      <q-card flat>
        <q-card-section v-if="!detalhesOpen">
          <div class="row text-center">
            <div class="col-2">{{ headers.col1 }}</div>
            <div class="col-7">{{ headers.col2 }}</div>
            <div class="col-2">{{ headers.col3 }}</div>
          </div>
        </q-card-section>
        <q-btn
          v-else
          no-caps
          rounded
          size="xs"
          @click="closeDetalhe"
          class="q-ml-lg q-mb-sm q-py-none"
          flat
          style="
          color: #7BB542;
          border: thin solid #7BB542;
          "
        >
          <span style="font-size: 10px;">Voltar</span>
        </q-btn>
        <div class="custom-green-line"></div>
      </q-card>
    </div>
  </div>
  <div v-if="!detalhesOpen">
    <show-plantas-table-component @detalheSelecionado="openDetalhe" :letter="letter" :param="param" :tab="tab"
                                  v-if="tab === 'plantas'"/>
    <show-produtores-table-component @detalheSelecionado="openDetalhe" :letter="letter" :param="param" :tab="tab"
                                     v-if="tab === 'produtores'"/>
    <show-industrias-table-component @detalheSelecionado="openDetalhe" :letter="letter" :param="param" :tab="tab"
                                     v-if="tab === 'industrias'"/>
  </div>
  <detalhes-component
    v-else
    :unmappedData="detalheShow"
    :tab="tab"
  />
</template>

<style scoped>
.custom-green-line {
  height: 4px;
  background-color: #55B957;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ShowIndustriasTableComponent from 'components/alphabeticalComponent/ShowIndustriasTableComponent.vue'
import ShowPlantasTableComponent from 'components/alphabeticalComponent/ShowPlantasTableComponent.vue'
import ShowProdutoresTableComponent from 'components/alphabeticalComponent/ShowProdutoresTableComponent.vue'
import DetalhesComponent from 'components/alphabeticalComponent/DetalhesComponent.vue'
import { Industria, Planta, Produtor } from 'src/interfaces/interfaces'

export default defineComponent({
  name: 'SearchTableComponent',
  components: {
    DetalhesComponent,
    ShowIndustriasTableComponent,
    ShowPlantasTableComponent,
    ShowProdutoresTableComponent
  },
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
  setup (props) {
    const headers = ref({
      col1: 'PLANTA',
      col2: 'INDICAÇÕES',
      col3: 'FORNECEDORES'
    })
    const detalhesOpen = ref(false)
    const detalheShow = ref({})
    const openDetalhe = (detalhe: Planta | Produtor | Industria) => {
      detalheShow.value = detalhe
      detalhesOpen.value = true
    }
    const closeDetalhe = () => {
      detalheShow.value = {}
      detalhesOpen.value = false
    }
    watch(() => props.tab, (newValue) => {
      closeDetalhe()
      switch (newValue) {
        case 'plantas':
          if (localStorage.getItem('usuario')) {
            headers.value = {
              col1: 'PLANTA',
              col2: 'INDICAÇÕES',
              col3: 'FORNECEDORES'
            }
          } else {
            headers.value = {
              col1: 'PLANTA',
              col2: 'PRODUTORES',
              col3: 'INDÚSTRIAS'
            }
          }
          break
        case 'produtores':
          headers.value = {
            col1: 'PRODUTOR',
            col2: 'PRODUÇÃO',
            col3: 'CONTATO'
          }
          break
        case 'industrias':
          headers.value = {
            col1: 'INDÚSTRIA',
            col2: 'MATÉRIA-PRIMA',
            col3: 'CONTATO'
          }
          break
      }
    })
    return {
      closeDetalhe,
      openDetalhe,
      detalheShow,
      detalhesOpen,
      headers
    }
  }
})
</script>
