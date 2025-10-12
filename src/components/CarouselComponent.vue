<template>
  <div>
    <q-carousel
      height="470px"
      v-model="slide"
      navigation
      :slides-per-page="1"
      class="q-pb-xl"
    >
      <template v-slot:navigation-icon="{ active, onClick }">
        <buttonComponent v-if="active" size="xl" icon="app:Green"  color="yellow" flat round dense @click="onClick" />
        <buttonComponent v-else size="xl" icon="app:White" flat round dense @click="onClick" />
      </template>
      <q-carousel-slide
        v-for="(cardGroup, index) in groupedCards"
        :key="index"
        :name="'slide' + index"
        :style="param === 'home'? 'padding-left: 0px' : 'padding-left: 0px'"
      >
        <div class="row">
          <div
            v-for="(card, cardIndex) in cardGroup"
            :key="cardIndex"
            class="col-4"
          >
            <q-card class="no-shadow q-pa-none cardContainer" >
              <q-img
                loading="eager"
                :src="card.miniatura"
                height="35%"
                class="q-mb-sm"
                style="border-top-right-radius: 30px; border-top-left-radius: 30px"
              />
              <q-card-section class="q-px-md q-pt-none">
                <p class="q-my-none" style="color: #5A645B; font-size: 14px" v-show="false">{{date.formatDate(card.created_at, 'DD/MM/YYYY')}}</p>
                <p class="q-mt-none" style="color: #5A645B; font-size: 14px; font-weight: 600" v-if="param === 'home'">{{card.tipo.charAt(0).toUpperCase() + card.tipo.slice(1)}}</p>
                <p :class="param === 'home'? 'q-mt-none': 'q-mt-md'" style="color: #5A645B; font-size: 12px; font-weight: 600; line-height: 15px; letter-spacing: 0px">{{ card.titulo }}</p>
                <q-scroll-area :class="param === 'home'? 'q-mt-none': 'q-mt-md'" style="height: 6vh">
                  <p style="color: #5A645B; font-size: 12px; line-height: 15px; letter-spacing: 0px">{{ card.descricao }}</p>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions  class="q-card__actions--vert absolute-bottom">
                <buttonComponent
                  :label="card.tipo === 'artigo' ? 'Conferir matéria completa' : (card.tipo == 'evento' ? 'Inscrever-me no evento' : 'Inscrever-me no curso')"
                  outline
                  rounded
                  @click="openScreen(card)"
                  dense
                  no-caps
                  text-color="green"
                  color="grey"
                />
                <q-space/>
                <buttonComponent
                  outline
                  icon="mdi-arrow-right"
                  @click="openScreen(card)"
                  round
                  dense
                  no-caps
                  text-color="green"
                  color="grey"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import buttonComponent from 'src/components/Button.vue'
import { date, useQuasar } from 'quasar'
import AtualizacoesService from '../../services/atualizacoesService'
import EventosService from '../../services/eventosService'
import AprendizadoService from '../../services/aprendizadoService'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CarouselComponent',
  components: {
    buttonComponent
  },
  props: {
    param: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const slide = ref('slide0')
    const loading = ref(false)
    const groupedCards = ref<Array<atualizacoesInterfaces[]>>()
    let cardsCaoussel = reactive<atualizacoesInterfaces[]>([])
    const router = useRouter()
    const $q = useQuasar()

    const getAtualizacoes = () => {
      loading.value = true

      const atualizacoes = AtualizacoesService.getHome({ top: 9 })

      atualizacoes.then(response => {
        if (response.status === 200) {
          cardsCaoussel = response.data
          groupedCards.value = computeGroupedCards(cardsCaoussel)
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }

    const getAprendizado = () => {
      loading.value = true

      const aprendizado = AprendizadoService.getCurso({ top: 9 })

      aprendizado.then(response => {
        if (response.status === 200) {
          cardsCaoussel = response.data
          groupedCards.value = computeGroupedCards(cardsCaoussel)
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }
    const getEventos = () => {
      loading.value = true

      const eventos = EventosService.getAll({ top: 9 })

      eventos.then(response => {
        if (response.status === 200) {
          cardsCaoussel = response.data
          groupedCards.value = computeGroupedCards(cardsCaoussel)
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }

    const openScreen = (card:atualizacoesInterfaces) => {
      if (card.tipo === 'artigo' && card.arquivo) {
        router.push({ name: 'readPdf', query: { arquivo: card.arquivo, descricao: card.titulo } })
      } else {
        console.log('here')
        const linkDestino = card.link ? card.link : card.link_inscricao
        window.open(linkDestino, '_blank')
      }
    }

    onMounted(() => {
      if (props.param === 'home') {
        getAtualizacoes()
      } else if (props.param === 'eventos') {
        getEventos()
      } else if (props.param === 'aprendizado') {
        getAprendizado()
      }
    })

    const computeGroupedCards = (cards: atualizacoesInterfaces[]): Array<atualizacoesInterfaces[]> => {
      const groupSize = 3
      const result = []
      for (let i = 0; i < cards.length; i += groupSize) {
        result.push(cards.slice(i, i + groupSize))
      }
      return result
    }

    return {
      slide,
      groupedCards,
      date,
      router,
      openScreen
    }
  }
})
</script>

<style lang="scss" scoped>
  .cardContainer {
    transition: transform 0.6s;
    box-sizing: border-box;
    // position: absolute;
    width: 90%;
    height: 370px;
    margin-left: 2px;

    border: 1px solid #FFFFFF;
    filter: drop-shadow(1px 0px 2px rgba(90, 100, 90, 0.5)) drop-shadow(0px 0px 3px rgba(90, 100, 90, 0.5));
    border-radius: 30px;
  }
  .cardContainer:hover {
    transform: scale(1.02);
  }
</style>
