<template>
  <q-page >
    <BannerInfo />
    <BannerConceito />
    <search-component/>
    <Atualizacoes />
    <cadastrar-component/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchComponent from 'components/alphabeticalComponent/SearchComponent.vue'
import CadastrarComponent from 'src/components/CadastrarComponent.vue'
import BannerInfo from 'src/components/Home/BannerInfo.vue'
import BannerConceito from 'src/components/Home/BannerConceito.vue'
import Atualizacoes from 'src/components/Home/Atualizacoes.vue'

export default defineComponent({
  name: 'PlantasPage',
  components: {
    SearchComponent,
    CadastrarComponent,
    BannerInfo,
    BannerConceito,
    Atualizacoes
  },
  setup () {
    const user = JSON.parse(localStorage.getItem('usuario') ?? '{}') ?? {}
    return {
      user
    }
  }
})
</script>
