<template>
  <q-layout view="hHh lpR fff" class="mainLayout q-mx-auto">
    <HeaderBar/>
    <q-page-container>
      <router-view />
      <PatrocinadoreComponent/>
    </q-page-container>
    <FooterBar id="contato" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from 'src/components/layoutComponents/HeaderBar.vue'
import FooterBar from 'src/components/layoutComponents/FooterBar.vue'
import PatrocinadoreComponent from 'src/components/PatrocinadoresComponent.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderBar,
    FooterBar,
    PatrocinadoreComponent
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
.btnHeader{
  border-radius: 15px;
}

/* @media only screen and (max-width: 1366px) {
  .mainLayout {
    width: 1300px;
  }
}

@media only screen and (min-width: 1370px) {
  .mainLayout {
    width: 1920px;
  }
} */
</style>
