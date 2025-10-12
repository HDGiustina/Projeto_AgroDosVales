<template>
  <q-page style="padding: 2.5%">
    <h6 class="q-my-md" style="font-weight: 600; color: #5A645B">Cursos ativos</h6>
    <carousel-component :param="'aprendizado'"/>
    <div class="q-mt-xl" style="margin-bottom: 2%">
      <q-img
        loading="eager"
        src="../assets/Esquema.png"
        height="55vh"
        fit="contain"
      />
    </div>
    <tree-component class="q-mt-xl"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import TreeComponent from 'src/components/TreeComponent.vue'
export default defineComponent({
  name: 'EducacaoPage',
  components: {
    CarouselComponent,
    TreeComponent
  }
})
</script>
