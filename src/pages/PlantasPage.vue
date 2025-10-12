<template>
  <q-page style="padding: 2.5%">
    <div v-if="!user.id">
      <div style="display: flex" class="row">
        <div style="flex: 2; max-width: 47%;" class="flex flex-center">
          <p style="line-height: 30px; color: #5A645B">
            Trazendo informações <span style="font-weight: 600; color: #9BD08C"> Confiáveis </span>
            com base <span style="font-weight: 600; color: #9BD08C"> Científica </span> e fazendo o intermédio das
            <span style="font-weight: 600; color: #9BD08C"> Conexões </span> entre
            <span style="font-weight: 600; color: #9BD08C"> Produtores </span> e <span
            style="font-weight: 600; color: #9BD08C"> Indústrias </span>
          </p>
        </div>
        <q-separator vertical size="4px"/>
        <div style="flex: 2; margin-top: 12px;" class="q-ml-lg">
          <p style="font-weight: 600; color: #5A645B; line-height: 30px">O que são Plantas Bioativas?</p>
          <p style="font-weight: 400; line-height: 30px; color: #5A645B; background-color:rgba(247, 245, 245, 0.726) ;">
            O conceito de “plantas bioativas” é relativamente recente e, por vezes, pode causar estranheza, quando se leva em conta que toda a
            planta possui uma atividade biológica inerente a si própria. Contudo, a expressão foi criada para designar aquelas plantas que possuem
            alguma ação sobre outros seres vivos e cujo efeito pode manifestar-se tanto pela sua presença em um ambiente quanto pelo uso direto de
            substâncias delas extraídas, desde que mediante uma intenção ou consciência humana deste efeito. Assim, são consideradas como bioativas
            as plantas medicinais, aromáticas, condimentares, inseticidas, repelentes, tóxicas, bactericidas e até mesmo as que possuem cunho místico
            ou religioso.
          </p>
        </div>
      </div>
    </div>
    <div>
      <div v-if="!user.id">
        <h6 style="font-weight: 600; color: #5A645B">Últimas atualizações</h6>
        <carousel-component :param="'home'"/>
      </div>
      <div class="q-ml-xl">
        <p class="q-mb-none" style="font-size:45px; color: #006334; line-height: 1">
          Informações
          <span style="font-size:70px; color: #7BB542; font-weight: bold">confiáveis</span>
        </p>
        <p style="font-size: 65px; color: #006334; line-height: 1">
          com base
          <span style="font-size:70px; color: #7BB542; font-weight: bold">científica</span>
        </p>
      </div>
    </div>
    <search-component/>
    <div v-if="!user.id">
      <cadastrar-component/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import SearchComponent from 'components/alphabeticalComponent/SearchComponent.vue'
import CadastrarComponent from 'src/components/CadastrarComponent.vue'

export default defineComponent({
  name: 'PlantasPage',
  components: {
    CarouselComponent,
    SearchComponent,
    CadastrarComponent
  },
  setup () {
    const user = JSON.parse(localStorage.getItem('usuario') ?? '{}') ?? {}
    return {
      user
    }
  }
})
</script>
