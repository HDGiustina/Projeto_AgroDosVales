<template>
  <q-page style="z-index: 2"  >
    <buttonComponent flat round size="md" icon="mdi-arrow-left" @click="router.push({name: 'bioativas'})"></buttonComponent>
    <div class="flex flex-center">
      <CadastroComponent v-if="route.name === 'cadastro'"/>
      <LoginComponent v-if="route.name === 'login'"/>
      <CadProdutor v-if="route.name === 'CadProdutor'"/>
      <CadInteressado v-if="route.name === 'CadInteressado'"/>
      <MeEsqueciComponent v-if="route.name === 'esqueci'"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { useRoute, useRouter } from 'vue-router'
import LoginComponent from 'src/components/LoginComponent.vue'
import CadastroComponent from 'src/components/CadastroComponent.vue'
import CadProdutor from 'src/components/CadProdutor.vue'
import CadInteressado from 'src/components/CadInteressado.vue'
import MeEsqueciComponent from 'src/components/MeEsqueciComponent.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    buttonComponent,
    LoginComponent,
    CadastroComponent,
    CadProdutor,
    CadInteressado,
    MeEsqueciComponent
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    return {
      router,
      route
    }
  }
})
</script>

<style scoped>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 10px !important;
  padding-left: 7px;
}
.inputCard {
  width: 80%;

}
.textInput {
  margin-left: 65px;
}
</style>
