<template>
  <section class="eventosComponent" id="eventosSection" >
    <h1>Próximos Eventos</h1>

    <!-- FILTROS -->
   <div class="eventosComponent_filtros">
      <h2>Filtros de Eventos</h2>
      <div class="filtros_inputs">
        <div class="input_datas">
            <!-- Intervalo de Datas -->
            <label class="filtro_label">Intervalo de Datas</label>
            <div class="date_input_wrapper">
              <q-btn
                outline
                no-caps
                :label="textoDatas || 'Selecione uma data'"
                class="date_button"
              >
                <q-popup-proxy
                  v-model="abrirCalendario"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="filtroDatas"
                    range
                    mask="YYYY-MM-DD"
                    @update:model-value="atualizarTextoDatas"
                  />
                </q-popup-proxy>
              </q-btn>
              <q-btn
                v-if="textoDatas"
                flat
                round
                dense
                icon="cancel"
                size="md"
                color="grey"
                class="clear_button"
                @click="limparDatas"
              />
            </div>
        </div>

        <!-- Tipo de Evento -->
        <div class="input_tipoEvento">
          <label class="filtro_label">Tipo de Evento</label>
          <q-select
            outlined
            v-model="filtroTipo"
            :options="['Online / Virtual', 'Presencial']"
            dense
            clearable
          />
        </div>
      </div>
    </div>

    <!-- LISTA DE EVENTOS -->
    <main class="eventosComponent_main">
      <template v-if="eventosFiltradosPaginados.length > 0">
          <Card
            v-for="(event, index) in eventosFiltradosPaginados"
            :key="index"
            :infos="event"
          />
      </template>
      <div v-else class="eventosComponent_alert">
        Sem eventos para exibir
      </div>
    </main>

    <!-- PAGINAÇÃO -->
    <q-pagination
      v-if="totalPages > 1"
      v-model="page"
      :max="totalPages"
      direction-links
      flat
      active-color="primary"
      class="eventosComponent_pagination"
      @click="goToTop()"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { date } from 'quasar'
import { useEventosStore } from 'src/stores/useEventosStore'
import Card from 'src/components/Card.vue'

export default defineComponent({
  name: 'eventosComponent',
  components: { Card },
  setup () {
    const eventosStore = useEventosStore()
    const page = ref(1)
    const eventosPorPagina = 6

    // Filtros
    const filtroDatas = ref<any>(null)
    const filtroTipo = ref<string | null>(null)
    const textoDatas = ref('')
    const abrirCalendario = ref(false)

    const atualizarTextoDatas = () => {
      if (filtroDatas.value?.from && filtroDatas.value?.to) {
        const from = date.formatDate(filtroDatas.value.from, 'DD/MM/YYYY')
        const to = date.formatDate(filtroDatas.value.to, 'DD/MM/YYYY')
        textoDatas.value = `${from} até ${to}`
      } else if (filtroDatas.value?.from) {
        textoDatas.value = date.formatDate(filtroDatas.value.from, 'DD/MM/YYYY')
      } else {
        textoDatas.value = ''
      }
    }

    const eventosFiltrados = computed(() => {
      let filtrados = eventosStore.eventosList

      // filtro de intervalo de datas
      if (filtroDatas.value?.from && filtroDatas.value?.to) {
        const from = new Date(filtroDatas.value.from)
        const to = new Date(filtroDatas.value.to)
        filtrados = filtrados.filter(e => {
          const dataEvento = new Date(e.data_realizacao)
          return dataEvento >= from && dataEvento <= to
        })
      }

      // filtro tipo de evento (online/presencial)
      if (filtroTipo.value) {
        if (filtroTipo.value === 'Online / Virtual') {
          filtrados = filtrados.filter(e =>
            e.local?.toLowerCase().includes('online')
          )
        } else if (filtroTipo.value === 'Presencial') {
          filtrados = filtrados.filter(e =>
            !e.local?.toLowerCase().includes('online')
          )
        }
      }

      return filtrados
    })

    const totalPages = computed(() =>
      Math.ceil(eventosFiltrados.value.length / eventosPorPagina)
    )

    const eventosFiltradosPaginados = computed(() => {
      const start = (page.value - 1) * eventosPorPagina
      const end = start + eventosPorPagina
      return eventosFiltrados.value.slice(start, end)
    })

    const goToTop = () => {
      const el = document.getElementById('eventosSection')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const limparDatas = () => {
      filtroDatas.value = null
      textoDatas.value = ''
    }

    onMounted(() => {
      eventosStore.fetchEventos()
    })

    return {
      eventosStore,
      eventosFiltrados,
      eventosFiltradosPaginados,
      page,
      totalPages,
      filtroDatas,
      filtroTipo,
      textoDatas,
      abrirCalendario,
      atualizarTextoDatas,
      goToTop,
      limparDatas
    }
  }
})
</script>

<style>
.date_button .q-btn__content span {
    width: 100%;
    text-align: left;
    margin: 0 26px 0 0;
}
</style>
<style lang="scss" scoped>
.eventosComponent {
  padding: 8rem 4rem;
}

.eventosComponent h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: normal;
  margin: 0 0 32px;
}

.eventosComponent_main {
  max-width: var(--limit-page-width);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin: auto;
}

.eventosComponent_pagination {
    justify-content: center;
    margin: 2rem 0 0;
}

.eventosComponent_filtros {
    max-width: var(--limit-page-width);
    border: 1px solid var(--color-gray-op);
    border-radius: 8px 8px 0 0;
    padding: 1.5rem 2rem;
    margin: auto;
    border-bottom: none;
}

.eventosComponent_filtros h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 1rem;
}

.filtros_inputs {
    display: flex;
    gap: 1rem;
}

.input_tipoEvento, .input_datas {
    width: 50%;
}

.date_input_wrapper, .date_button {
    width: 100%;
}

.date_input_wrapper {
    position: relative;
}

.date_button {
    color: grey;
    padding: 8px 12px;
}

.date_button::before {
    border-color: #0000003d !important  ;
}

.clear_button {
    position: absolute;
    top: 4px;
    right: 8px;
}

.filtro_label {
    font-size: 14px;
    margin: 0 0 6px;
    display: block;
}

.eventosComponent_alert {
    text-align: center;
    background: var(--color-gray-op);
    padding: 1rem;
    border-radius: 6px;
    font-weight: 600;
    color: var(--color-gray);
}

@media screen and (max-width: 1024px) {
    .eventosComponent {
        padding: 6rem 4rem;
    }
}

@media screen and (max-width: 880px) {
    .filtros_inputs {
        flex-direction: column;
    }
    .input_tipoEvento, .input_datas {
        width: 100%;
    }
    .eventosComponent_filtros h2 {
        font-size: 18px;
        margin: 0 0 0.5rem;
    }
}

@media screen and (max-width: 680px) {
    .eventosComponent {
        padding: 4rem 2rem;
    }
    .filtro_label {
        font-size: 12px;
    }
    .eventosComponent_filtros {
        padding: 1rem ;
    }
}

@media screen and (max-width: 480px) {
    .eventosComponent {
        padding: 3rem 2rem;
    }
    .eventosComponent_main {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .eventosComponent h1{
        font-size: 18px;
    }
}
</style>
