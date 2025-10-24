<template>
  <section class="destaque_content">
    <div v-if="eventosStore.carregando" class="loading">
      <q-spinner color="primary" size="3rem" />
    </div>

    <div v-else-if="eventoDestaque" class="destaque_infos">
      <main class="destaque_main">
        <div class="destaque_title">
            <q-chip color="primary" text-color="white" class="destaque_chip">
                Destaque
            </q-chip>
            <h1>{{ eventoDestaque?.titulo }}</h1>
            <p>{{ eventoDestaque?.descricao }}</p>
        </div>
        <section class="destaque_infosEvent">
            <div class="infosEvent_item">
              <img src="../../assets/icons/calendar_black.svg" alt="Data do evento">
              {{ date.formatDate(eventoDestaque?.data_realizacao, "D [de] MMMM [de] YYYY") }}
            </div>
            <div class="infosEvent_item">
              <img src="../../assets/icons/clock_black.svg" alt="Horário do evento">
              {{ date.formatDate(eventoDestaque?.data_realizacao, 'HH:mm') }}
            </div>
            <div class="infosEvent_item">
              <img src="../../assets/icons/map_black.svg" alt="Local do evento">
              {{ eventoDestaque?.local }}
            </div>
        </section>
         <buttonComponent
          class="destaque_btn"
          label="Ver Detalhes"
          :outline="false"
          :no-caps="true"
          @click="openScreen(eventoDestaque.link_inscricao)"
        />
      </main>
      <div class="destaque_img">
        <img :src="eventoDestaque?.miniatura" alt="imagem do Evento">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useEventosStore } from 'src/stores/useEventosStore'
import { date, Quasar } from 'quasar'
import langPt from 'quasar/lang/pt-BR'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'EventoDestaque',
  components: {
    buttonComponent
  },
  setup () {
    Quasar.lang.set(langPt)
    const eventosStore = useEventosStore()

    onMounted(() => {
      eventosStore.fetchEventos()
    })
    const eventoDestaque = computed(() => eventosStore.primeiroEvento())

    const openScreen = (linkDestino:string) => {
      window.open(linkDestino, '_blank')
    }

    return { eventoDestaque, eventosStore, date, openScreen }
  }
})
</script>

<style scoped>

.loading {
    display: flex;
    justify-content: center;
    padding: 8rem;
}

.destaque_content {
  background-color: var(--color-primary-light);
  padding: 8rem;
}

.destaque_infos {
  gap: 5rem;
  max-width: var(--limit-page-width);
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: 32px;
}

.destaque_main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
}

.destaque_chip {
  width: fit-content;
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 16px;
}

.destaque_title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.destaque_title h1 {
  font-size: 1.8rem;
  color: var(--color-dark);
  line-height: 1.2;
  font-weight: bold;
}

.destaque_title p {
  font-size: 1rem;
  line-height: normal;
  color: var(--color-gray);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
}

.destaque_infosEvent {
  display: flex;
  justify-content: space-between;
  padding: 0 16px 0 0;
  width: 100%;
  max-width: 600px;
  margin: auto;
  flex-wrap: wrap;
  gap: 20px;
}

.infosEvent_item {
  font-size: 14px;
  color: var(--color-dark);
  display: flex;
  align-items: center;
  gap: 6px;
}

.infosEvent_item img {
  width: 18px;
  height: 18px;
}

.destaque_btn {
    width: fit-content;
    font-weight: 600;
}

.destaque_img {
  width: 50%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}

.destaque_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

@media screen and (max-width: 1224px) {
    .destaque_content {
        padding: 5rem;
    }
    .destaque_chip {
        margin: 0 0 8px;
    }
    .destaque_infos {
        gap: 2.5rem;
    }

    .destaque_title h1 {
        font-size: 1.4rem;
        line-height: 1.2;
    }

    .destaque_title p {
        font-size: 0.8rem;
    }
}

@media screen and (max-width: 1024px) {
  .destaque_content {
    background-color: var(--color-primary-light-op);
    padding: 0;
  }

  .destaque_infos {
    padding: 5rem;
  }

  .destaque_main {
    width: 100%;
  }

  .destaque_title h1 {
    font-size: 1.3rem;
    text-align: center;
  }

  .destaque_title p {
    font-size: 0.7rem;
    line-height: 1.8;
    text-align: center;
  }

  .destaque_img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: auto;
    min-width: 100%;
    border-radius: 0;
    opacity: 0.2;
    height: 100%;
  }
  .destaque_img img {
    height: 100%;
    object-fit: cover;
  }

  .destaque_infosEvent {
    padding: 0;
  }

  .destaque_btn {
    margin: auto;
  }
  .infosEvent_item {
    font-size: 12px;
  }
}
@media screen and (max-width: 680px) {
  .destaque_infos {
    padding: 5rem 3rem;
  }
  .destaque_infosEvent {
    flex-direction: column;
  }
   .destaque_chip {
    margin: 0 auto;
  }
}
@media screen and (max-width: 480px) {
  .destaque_btn {
    font-size: 12px !important;
    width: 100%;
  }
  .destaque_infos {
    padding: 5rem 2rem;
  }
}
</style>
