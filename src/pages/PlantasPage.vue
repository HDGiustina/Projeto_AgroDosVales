<template>
  <q-page >
    <BannerInfo />
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
import BannerInfo from 'src/components/Home/BannerInfo.vue'

export default defineComponent({
  name: 'PlantasPage',
  components: {
    CarouselComponent,
    SearchComponent,
    CadastrarComponent,
    BannerInfo
  },
  setup () {
    const user = JSON.parse(localStorage.getItem('usuario') ?? '{}') ?? {}
    return {
      user
    }
  }
})
</script>
