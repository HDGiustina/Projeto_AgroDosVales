<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="loginLayout">
      <nav class="loginLayout_nav">
        <buttonComponent
          label="Página Inicial"
          icon="app:Home"
          :nocaps="true"
          @click="navegar('bioativas')"
        />
      </nav>
      <main class="loginLayout_card">
        <router-view />
      </main>
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
.loginLayout {
  background-image: url('../assets/bg_login_2.png');
  padding: 4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.loginLayout_nav {
  width: 100%;
}

.loginLayout_card {
  width: 40%;
  height: 100%;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 10px 24px -5px rgba(0,0,0,0.1);
}
</style>
