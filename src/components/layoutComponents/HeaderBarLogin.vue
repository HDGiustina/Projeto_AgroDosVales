<template>
  <q-header bordered class="bg-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-img src="../../assets/agroVales.png" fit="contain" width="220px" class="q-my-lg" loading="eager"/>
        <span v-if="ambiente"
              class="q-mx-md animated-notice"
              style="border: rgba(0,102,52,0.54) solid 1px;
             border-radius: 20px;
             padding: 5px;
             color: white;
             font-weight: 600;"
        >Este é o ambiente de Testes</span>
      </q-toolbar-title>
      <div class=" row q-gutter-x-md flex flex-center q-mr-sm">
        <q-input
          v-model="buscar"
          dense
          outlined
          rounded
          borderless
          placeholder="o que você está procurando?"
          bg-color="grey-1"
          style="width: 17.5vw"
          @keydown.enter="buscarMenu"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" size="25px" style="color: #5A645B"/>
          </template>
        </q-input>
        <div class="row flex flex-center cursor-pointer">
          <q-avatar size="8vh">
            <q-icon name="app:User" color="black"/>
          </q-avatar>
          <p class="q-ma-none" style="color: #5A645B; font-size: 17px">{{ usuario?.nome ?? '' }}</p>
          <q-menu
            transition-hide="flip-right"
            transition-show="flip-left"
            :offset="[-70, 5]"
            self="top middle"
            style="background-color: #7BB542; border-radius: 14px"
          >
            <q-list style="min-width: 300px">
              <buttonComponent
                v-if="usuario?.tipo_usuario !== 'admin'"
                label="Configurações de perfil"
                color="white"
                nocaps
                flat
                style=" font-size: 16px; width: 100%"
                @click="navegar('config')"
              >
                <q-item-section @click="navegar('config')">
                  Configurações de perfil
                </q-item-section>
              </buttonComponent>
              <q-separator size="1px" color="white"/>
              <buttonComponent
                label="Política de privacidade"
                color="white"
                nocaps
                flat
                style=" font-size: 16px; width: 100%"
              />
              <q-separator size="1px" color="white"/>
              <buttonComponent
                label="Sair"
                color="white"
                nocaps
                flat
                style=" font-size: 16px; width: 100%"
                @click="logout"
                />
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import buttonComponent from 'src/components/Button.vue'
import menus from 'src/router/menu'
import { useQuasar } from 'quasar'
import { clearUser, globalUser, updateUser } from 'src/composables/user'
import { SubMenuInterface, UserInterface } from 'src/interfaces/interfaces'

export default defineComponent({
  name: 'HeaderBar',
  components: {
    buttonComponent
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    updateUser()
    const usuario: UserInterface | null = globalUser.value
    const buscar = ref('')
    const $q = useQuasar()
    const ambiente = ref(process.env.ENV !== 'production')
    const navegar = (tipo: string) => {
      if (tipo === 'config') {
        if (usuario?.tipo_usuario === 'produtor') {
          router.push({ name: 'configProdutor' })
        } else if (usuario?.tipo_usuario === 'industria') {
          router.push({ name: 'configIndustria' })
        } else {
          router.push({ name: 'configInteressado' })
        }
      } else {
        router.push({ name: tipo })
      }
    }
    const consola = (params: string) => {
      console.log('CONSOLA', params)
    }

    const buscarMenu = () => {
      let menuEncontrado = false
      const busca = buscar.value.charAt(0).toUpperCase() + buscar.value.substring(1)
      if (usuario && usuario.tipo_usuario !== 'admin' && ['Adminstrador', 'Planta', 'Evento', 'Curso', 'Artigo', 'Industria', 'Indicacoes'].includes(busca)) {
        $q.notify({
          color: 'negative',
          message: 'Você não tem permissão para acessar este menu.'
        })
      } else {
        menus.forEach(m => {
          if (m.label === busca) {
            menuEncontrado = true
            router.push({ path: m.destino })
            buscar.value = ''
          } else if (m.submenus) {
            m.submenus.forEach((sm: SubMenuInterface) => {
              if (sm.titulo === busca) {
                menuEncontrado = true
                router.push({ path: sm.destino })
                buscar.value = ''
              }
            })
          }
        })
        if (!menuEncontrado) {
          $q.notify({
            color: 'negative',
            message: 'Menu não encontrado.'
          })
        }
      }
    }
    const logout = () => {
      for (const i in $q.cookies.getAll()) {
        $q.cookies.remove(i)
      }
      localStorage.clear()
      router.getRoutes()
      clearUser()
      updateUser()

      $q.notify({
        color: 'secondary',
        message: 'Tchau, ' + (usuario ? usuario.firstName : 'usuario') + '!',
        icon: 'mdi-hand-wave',
        closeBtn: 'Tchau'
      })

      router.push({ name: 'login' })
    }

    return {
      ambiente,
      consola,
      logout,
      navegar,
      buscarMenu,
      usuario,
      buscar,
      route
    }
  }
})
</script>

<style scoped>
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
.btnHeader {
  border-radius: 13px;
}
</style>
