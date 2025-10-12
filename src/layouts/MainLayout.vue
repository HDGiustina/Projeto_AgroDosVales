<template>
  <q-layout view="hHh LpR lff" class="mainLayout q-mx-auto">
    <HeaderBarLogin/>
    <q-drawer class="bg-primary" :width="240" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area style="height: 100%" :content-style="{width: '100%'}">
        <q-list class="q-mt-lg q-gutter-y-lg">
          <q-expansion-item
            v-for="(menu, idx) in filteredMenus"
            :key="idx"
            :icon="menu.icon"
            :expand-icon-class="menu.submenus ? 'visible' : 'invisible'"
            :to="menu.destino"
            :label="menu.label"
            active-class="my-menu-link"
            class="text-white"
            :inset-level="0.5"
            style="font-weight: 500; font-size: medium"
          >
            <div v-for="(item, idx) in menu.submenus" :key="idx" >
              <q-item
                clickable
                :inset-level="0.3"
                v-ripple
                :to="item.destino"
                active-class="my-menu-link"
                style="margin-top: 12px"
                >
                <q-icon
                  size="27px"
                  class="q-mr-md"
                  :name="item.icon"
                />
                <q-item-section>{{ item.titulo }}</q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
      <PatrocinadoreComponent style="height: 15vh" class="flex flex-center"/>
    </q-page-container>
    <FooterBar id="contato"/>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HeaderBarLogin from 'src/components/layoutComponents/HeaderBarLogin.vue'
import FooterBar from 'src/components/layoutComponents/FooterBar.vue'
import PatrocinadoreComponent from 'src/components/PatrocinadoresComponent.vue'
import menus from 'src/router/menu'
import { UserInterface } from 'src/interfaces/interfaces'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderBarLogin,
    FooterBar,
    PatrocinadoreComponent
  },
  setup () {
    const leftDrawerOpen = ref(true)
    const usuario:UserInterface = JSON.parse(localStorage.getItem('usuario') || '{}')

    const filteredMenus = computed(() => {
      return menus.filter(m => {
        if (usuario.tipo_usuario === 'admin') {
          return true
        } else {
          return m.can
        }
      })
    })

    return {
      leftDrawerOpen,
      filteredMenus
    }
  }
})
</script>

<style>
.btnHeader{
  border-radius: 15px;
}
.my-menu-link {
    color: white;
    background: rgba(220, 231, 155, 0.62);
  }
</style>
