<template>
  <main style="overflow: auto;">
    <section class="q-mt-xl">
      <q-card flat :class="{'limitWidth': !detalhesOpen}">
        <q-card-section v-if="!detalhesOpen" class="table_header">
          <div :class="{'table_tab': true,  'tab_plantas': tab == 'plantas', 'tab_industria': tab == 'industrias'}">{{ headers.col1 }}</div>
          <div :class="{'table_tab': true,  'tab_produtor': tab == 'produtores', 'tab_industria': tab == 'industrias'}">{{ headers.col2 }}</div>
          <div :class="{'table_tab': true}">{{ headers.col3 }}</div>
        </q-card-section>
        <div class="table_header" v-else>
          <buttonComponent
            label="Voltar à lista"
            size="sm"
            @click="closeDetalhe"
            icon="arrow_back"
          />
        </div>
      </q-card>
      <div v-if="!detalhesOpen" style="min-width: 700px;">
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
    </section>
  </main>
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
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'SearchTableComponent',
  components: {
    DetalhesComponent,
    ShowIndustriasTableComponent,
    ShowPlantasTableComponent,
    ShowProdutoresTableComponent,
    buttonComponent
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

<style scoped>
.table_header {
  display: flex;
  padding: 1rem 1.5rem;
  background-color: var(--color-gray-op);
}

.table_tab {
  width: 17%;
  font-weight: 600;
  color: var(--color-grey);
  text-align: center;
}

.table_tab.tab_plantas{
  width: 70%;
  text-align: left;
}

.table_tab.tab_produtor{
  width: 58%;
}

.table_tab.tab_industria{
  width: 38%;
}

.limitWidth {
  min-width: 700px;
}

</style>
