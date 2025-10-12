<template>
  <q-page style="padding: 2.5%">
    <h6 class="q-my-md" style="font-weight: 600; color: #5A645B">Próximos eventos</h6>
    <carousel-component :param="'eventos'"/>
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        content-class="rounded-tabs"
      >
        <q-tab name='anual'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 18px; font-weight: 400;">Visão <span :style="tab === 'anual' ? 'font-weight: 700; color: #7BB542;' : 'font-weight: 700'">Anual</span></p>
          </template>
        </q-tab>
        <q-tab name='mensal'>
          <template v-slot:default>
            <p class="q-mb-none" style="font-size: 18px; font-weight: 400;">Visão <span :style="tab === 'mensal' ? 'font-weight: 700; color: #7BB542;' : 'font-weight: 700'">mensal</span></p>
          </template>
        </q-tab>
      </q-tabs>
      <div class="flex flex-center row " style="background-color: #F9F9F9;">
        <div class="row" style=" margin-top: 50px;">
          <CalendarComponent :tab="tab"/>
        </div>
      </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import CalendarComponent from 'src/components/CalendarComponent.vue'

export default defineComponent({
  name: 'EventosPage',
  components: {
    CarouselComponent,
    CalendarComponent
  },
  setup () {
    const tab = ref('anual')
    return {
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
