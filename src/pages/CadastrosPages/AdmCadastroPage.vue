<template>
  <q-page padding>
    <div>
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        content-class="rounded-tabs"
      >
        <q-tab name='cadastrar'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 17px; font-weight: 400">Cadastro de novo <span :style="tab === 'cadastrar' ? 'color: #7BB542; font-weight: 700' : 'font-weight: 700'">Usuário Administrador</span></p>
          </template>
        </q-tab>
        <q-tab name='editar'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 17px; font-weight: 400"><span :style="tab === 'editar' ? 'color: #7BB542; font-weight: 700' : 'font-weight: 700'">Editar</span> cadastro</p>
          </template>
        </q-tab>
      </q-tabs>
      <div style="background-color: #F9F9F9">
        <CadastroAdmin :tab="tab"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CadastroAdmin from 'src/components/CadastroMenu/CadastroAdmin.vue'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AdmCadastroPage',
  components: {
    CadastroAdmin
  },
  setup () {
    const route = useRoute()
    const tab = ref('cadastrar')
    return {
      route,
      tab
    }
  }
})
</script>

<style>
.rounded-tabs .q-tab--inactive {
  background-color:  white;
  border-top-right-radius: 13px;
  border-top-left-radius: 13px;
  margin: 0 10px;
  width: 45%;
  height: 6vh;
  min-height: 6vh;
  color: #B3B3B3;
}

.rounded-tabs .q-tab--active {
  background-color: #F9F9F9;
  margin: 0 10px;
  border-top-right-radius: 13px;
  border-top-left-radius: 13px;
  width: 45%;
  height: 6vh;
  min-height: 6vh;
}
</style>
