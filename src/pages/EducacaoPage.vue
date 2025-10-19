<template>
  <q-page>
    <BannerCursoPrincipal />
    <h6 class="q-my-md" style="font-weight: 600; color: #5A645B">Cursos ativos</h6>
    <carousel-component :param="'aprendizado'"/>
    <InfosPlantas />
    <ListaArtigos />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import BannerCursoPrincipal from 'src/components/Cursos/BannerCursoPrincipal.vue'
import InfosPlantas from 'src/components/Cursos/InfosPlantas.vue'
import ListaArtigos from 'src/components/Cursos/ListaArtigos.vue'

export default defineComponent({
  name: 'EducacaoPage',
  components: {
    CarouselComponent,
    BannerCursoPrincipal,
    InfosPlantas,
    ListaArtigos
  }
})
</script>
