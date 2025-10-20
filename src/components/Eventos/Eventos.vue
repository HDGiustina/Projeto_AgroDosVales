<template>
  <section class="eventosComponent" id="eventosSection">
    <h1>Próximos Eventos</h1>

    <main class="eventosComponent_main">
      <Card
        v-for="(event, index) in eventosPaginados"
        :key="index"
        :infos="event"
      />
    </main>

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
import { useQuasar } from 'quasar'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import EventosService from '../../../services/eventosService'
import Card from 'src/components/Card.vue'

export default defineComponent({
  name: 'eventosComponent',
  components: {
    Card
  },
  setup () {
    const page = ref(1)
    const eventosList = ref<atualizacoesInterfaces[]>([])
    const eventosPorPagina = 6
    const $q = useQuasar()

    const getEventos = () => {
      const eventos = EventosService.getAll({ top: 9 })

      eventos.then(response => {
        if (response.status === 200) {
          eventosList.value = response.data
          console.log(eventosList.value)
        } else {
          $q.notify({
            message: 'Erro ao carregar os eventos',
            color: 'negative'
          })
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }

    const totalPages = computed(() =>
      Math.ceil(eventosList.value.length / eventosPorPagina)
    )

    const eventosPaginados = computed(() => {
      const start = (page.value - 1) * eventosPorPagina
      const end = start + eventosPorPagina
      return eventosList.value.slice(start, end)
    })

    const goToTop = () => {
      const eventosComponent = document.getElementById('eventosSection')
      if (eventosComponent) {
        eventosComponent.scrollIntoView({ behavior: 'smooth' })
      }
    }

    onMounted(() => {
      getEventos()
    })

    return {
      eventosList,
      eventosPaginados,
      page,
      totalPages,
      goToTop
    }
  }
})
</script>

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

@media screen and (max-width: 1024px) {
    .eventosComponent {
        padding: 6rem 4rem;
    }
}

@media screen and (max-width: 680px) {
    .eventosComponent {
        padding: 4rem 2rem;
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
