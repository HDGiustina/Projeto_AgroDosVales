<template>
  <q-page>
    <BannerCursoPrincipal />
    <h6 class="q-my-md" style="font-weight: 600; color: #5A645B">Cursos ativos</h6>
    <carousel-component :param="'aprendizado'"/>
    <InfosPlantas />
    <tree-component class="q-mt-xl"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import TreeComponent from 'src/components/TreeComponent.vue'
import BannerCursoPrincipal from 'src/components/Cursos/BannerCursoPrincipal.vue'
import InfosPlantas from 'src/components/Cursos/InfosPlantas.vue'

export default defineComponent({
  name: 'EducacaoPage',
  components: {
    CarouselComponent,
    TreeComponent,
    BannerCursoPrincipal,
    InfosPlantas
  }
})
</script>
