<template>
  <q-img fit="fill" style="top:40vh; z-index: 1; position: fixed" src="../assets/agroVales(2).png" height="75vh"
         alt="Wave" loading="eager"/>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-white" style="height: 85px">
      <q-toolbar>
        <q-toolbar-title class="q-my-lg q-ml-md">
          <q-img src="../assets/agroVales.png" fit="contain" width="250px" loading="eager"/>
          <span v-if="ambiente"
                class="q-mx-md animated-notice"
                style="border: rgba(0,102,52,0.54) solid 1px;
             border-radius: 20px;
             padding: 5px;
             color: white;
             font-weight: 600;"
          >Este é o ambiente de Testes</span>
        </q-toolbar-title>
        <div class="q-gutter-x-md q-mr-lg flex justify-center" v-if="route.path !== '/recuperarsenha'">
          <p v-if="route.name == 'login'" class="text-bold"
             style="color: #5A645B; margin-top: 7px; margin-bottom: 0; font-size: 20px"> Não possui uma conta?</p>
          <p v-else-if="route.name == 'esqueci'" class="text-bold"
             style="color: #5A645B; margin-top: 7px; margin-bottom: 0; font-size: 20px"> Lembrou sua senha?</p>
          <p v-else class="text-bold" style="color: #5A645B; margin-top: 7px; margin-bottom: 0; font-size: 20px"> Já tem
            uma conta?</p>
          <buttonComponent
            v-if="route.path !== '/recuperarsenha'"
            class="btnHeader"
            :label="route.name == 'login'? 'Cadastrar' : 'Entrar'"
            rounded
            no-caps
            :outline="false"
            @click="route.name === 'login' ?  navegar('cadastro') : navegar('login')"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container style="background-color: #F9F9F9">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'LoginLayout',
  components: {
    buttonComponent
  },
  setup () {
    const ambiente = ref(process.env.ENV !== 'production')
    const router = useRouter()
    const route = useRoute()

    const navegar = (tipo: string) => {
      router.push({ name: tipo })
    }
    return {
      ambiente,
      navegar,
      route
    }
  }
})
</script>

<style scoped>
.btnHeader {
  border-radius: 13px;
}
@keyframes blink {
  0% {
    background: rgba(0, 102, 52, 0.54);
  }
  50% {
    background: rgba(10, 189, 10, 0.56);
  }
  100% {
    background: rgba(0, 102, 52, 0.54);
  }
}
.animated-notice {
  animation: blink 2s infinite;
}
.wave {
  position: fixed;
  left: 0;
  height: 10vh;
  bottom: 0;
  z-index: -1;
}
</style>
