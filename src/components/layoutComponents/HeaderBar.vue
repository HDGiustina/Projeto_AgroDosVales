<template>
  <q-header elevated class="bg-white q-mb-md">
    <q-toolbar class="header">
      <q-toolbar-title class="" style="flex: none;">
        <q-img src="../../assets/Logo_media.png" fit="contain" width="250px" loading="eager"/>
      </q-toolbar-title>
      <nav>
          <buttonComponent
            :class="['btnHeader', (route.name!='bioativas') ? '' : 'text-bold']"
            label="Plantas Bioativas"
            :color="route.name!='bioativas' ? 'dark' : 'primary'"
            :flat="true"
            @click="navegar('bioativas')"
          />
          <buttonComponent
            :class="['btnHeader', (route.name!='eventos') ? '' : 'text-bold']"
            label="Eventos"
            :color="route.name!='eventos' ? 'dark' : 'primary'"
            :flat="true"
            @click="navegar('eventos')"
          />
          <buttonComponent
            :class="['btnHeader', !(route.name =='educacao' || route.name =='readPdf') ? '' : 'text-bold']"
            label="Educação"
            :color="!(route.name =='educacao' || route.name =='readPdf') ? 'dark' : 'primary'"
            :flat="true"
            @click="navegar('educacao')"
          />
        </nav>
      <div v-if="usuario" class=" row q-gutter-x-md flex flex-center q-mr-sm">
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
                label="Abrir painel"
                color="white"
                nocaps
                flat
                @click="navegar('home')"
                style=" font-size: 16px; width: 100%"
              />
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
      <div v-else class="q-gutter-x-md">
        <buttonComponent
          class="btnHeader text-bold"
          label="Entrar"
          :outline="false"
          @click="navegar('login')"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import buttonComponent from 'src/components/Button.vue'

import { clearUser, globalUser, updateUser } from 'src/composables/user'
import { SubMenuInterface, UserInterface } from 'src/interfaces/interfaces'
import menus from 'src/router/menu'

export default defineComponent({
  name: 'HeaderBar',
  components: {
    buttonComponent
  },
  setup () {
    const ambiente = ref(process.env.ENV !== 'production')
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    updateUser()
    const usuario: UserInterface | null = globalUser.value
    const buscar = ref('')

    const navegar = (tipo: string) => {
      router.push({ name: tipo })
    }

    const bottom = () => {
      const contatoElement = document.getElementById('contato')
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'smooth' })
      }
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
      usuario,
      buscar,
      buscarMenu,
      logout,
      ambiente,
      navegar,
      bottom,
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.animated-notice {
  animation: blink 2s infinite;
}

.btnHeader {
  border-radius: 8px;
}
</style>
