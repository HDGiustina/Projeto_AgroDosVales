<template>
  <section class="patrocinadores_main">
    <h3>Nossos Parceiros</h3>
    <q-carousel
      v-model="slide"
      arrows
      control-color="primary"
      swipeable
      :slides-per-page="1"
      class="patrocinadores_main_carousel"
    >
      <q-carousel-slide
        v-for="(cardGroup, index) in groupedPatrocinadores"
        :key="index"
        :name="'slide' + index"
      >
        <div class="row carousel_slide">
          <div
            v-for="(card, cardIndex) in cardGroup"
            :key="cardIndex"
            class="col"
          >
          <q-img
            loading="eager"
            :src="card.logo"
            fit="contain"
            class="carousel_image"
          />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { PatrocinadoresInterface } from 'src/interfaces/interfaces'
import { date, useQuasar } from 'quasar'
import PatrocinadoresService from '../../services/patrocinadoresService'

export default defineComponent({
  name: 'PatrocinadoresComponent',
  setup () {
    const slide = ref('slide0')
    const loading = ref(false)
    const groupedPatrocinadores = ref<Array<PatrocinadoresInterface[]>>()
    let patrocinadoresCaroussel = reactive<PatrocinadoresInterface[]>([])
    const $q = useQuasar()

    const getPatrocinadores = () => {
      loading.value = true

      const atualizacoes = PatrocinadoresService.getAll()

      atualizacoes.then(response => {
        if (response.status === 200) {
          patrocinadoresCaroussel = response.data
          groupedPatrocinadores.value = computedPatrocinadores(patrocinadoresCaroussel)
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }

    onMounted(() => {
      getPatrocinadores()
    })

    const computedPatrocinadores = (cards: PatrocinadoresInterface[]): Array<PatrocinadoresInterface[]> => {
      const groupSize = 6
      const result = []
      for (let i = 0; i < cards.length; i += groupSize) {
        result.push(cards.slice(i, i + groupSize))
      }
      return result
    }

    return {
      slide,
      groupedPatrocinadores,
      date
    }
  }
})
</script>

<style scoped>
.patrocinadores_main {
  max-width: var(--limit-page-width);
  margin: auto;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.patrocinadores_main h3 {
  font-size: 32px;
  font-weight: bold;
  line-height: normal;
}
.patrocinadores_main_carousel {
  width: 100%;
  height: auto;
}
.carousel_slide, .carousel_slide div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel_image {
  width: 170px;
  height: 170px;
  padding: 1rem;
}
</style>
