<template>
  <q-page style="padding: 2.5%">
    <p style="font-weight: 400; color: black">Seus Dados de <span style="color: #7BB542; font-weight: bold">Cadastro</span></p>
    <ConfigProdutor v-if="route.name === 'configProdutor'"/>
    <ConfigIndustria v-if="route.name === 'configIndustria'"/>
    <ConfigInteressado v-if="route.name === 'configInteressado'"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ConfigProdutor from 'components/ConfigProdutor.vue'
import ConfigIndustria from 'src/components/ConfigIndustria.vue'
import ConfigInteressado from 'src/components/ConfigInteressado.vue'
export default defineComponent({
  name: 'ConfiguracoesPage',
  components: {
    ConfigProdutor,
    ConfigIndustria,
    ConfigInteressado
  },
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>
