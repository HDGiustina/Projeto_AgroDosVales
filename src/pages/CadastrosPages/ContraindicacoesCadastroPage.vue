<template>
  <q-page padding>
    <div>
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        content-class="rounded-tabs"
      >
        <q-tab name='contraindicacoes'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 18px; font-weight: 400">Atribuir <span :style="tab === 'contraindicacoes' ? 'color: #7BB542;font-weight: 700;' : 'font-weight: 700; '">Contra Indicações </span></p>
          </template>
        </q-tab>
        <q-tab name='plantas'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 18px; font-weight: 400">Atribuir <span :style="tab === 'plantas' ? 'color: #7BB542;font-weight: 700;' : 'font-weight: 700; '">Plantas</span></p>
          </template>
        </q-tab>
        <q-tab name='cadastrar'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 18px; font-weight: 400">Cadastrar <span :style="tab === 'cadastrar' ? 'color: #7BB542;font-weight: 700;' : 'font-weight: 700; '">Contra Indicações</span></p>
          </template>
        </q-tab>
      </q-tabs>
      <div style="background-color: #F9F9F9;">
        <CadIndicacoes :tab="tab" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import CadIndicacoes from 'src/components/CadastroMenu/CadastroContraindicacoes.vue'

export default defineComponent({
  name: 'CadastroContraindicacoes',
  components: {
    CadIndicacoes
  },
  setup () {
    const route = useRoute()
    const tab = ref('contraindicacoes')
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
