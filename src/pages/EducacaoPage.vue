<template>
  <q-page>
    <BannerCursoPrincipal />
    <Cursos />
    <InfosPlantas />
    <ListaArtigos />
    <CadastrarComponent type="secondary" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BannerCursoPrincipal from 'src/components/Cursos/BannerCursoPrincipal.vue'
import InfosPlantas from 'src/components/Cursos/InfosPlantas.vue'
import ListaArtigos from 'src/components/Cursos/ListaArtigos.vue'
import CadastrarComponent from 'src/components/CadastrarComponent.vue'
import Cursos from 'src/components/Cursos/Cursos.vue'

export default defineComponent({
  name: 'EducacaoPage',
  components: {
    BannerCursoPrincipal,
    InfosPlantas,
    ListaArtigos,
    CadastrarComponent,
    Cursos
  }
})
</script>
