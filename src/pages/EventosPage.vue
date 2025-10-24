<template>
  <q-page>
    <EventoDestaque />
    <Eventos />
    <Agenda />
    <CadastrarComponent type="secondary" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CadastrarComponent from 'src/components/CadastrarComponent.vue'
import Eventos from 'src/components/Eventos/Eventos.vue'
import EventoDestaque from 'src/components/Eventos/Destaque.vue'
import Agenda from 'src/components/Eventos/Agenda.vue'

export default defineComponent({
  name: 'EventosPage',
  components: {
    CadastrarComponent,
    Eventos,
    EventoDestaque,
    Agenda
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
