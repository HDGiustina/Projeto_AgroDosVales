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
import { defineComponent, ref, onMounted, reactive, watch } from 'vue'
import { PatrocinadoresInterface } from 'src/interfaces/interfaces'
import { useQuasar } from 'quasar'
import PatrocinadoresService from '../../services/patrocinadoresService'

export default defineComponent({
  name: 'PatrocinadoresComponent',
  setup () {
    const slide = ref('slide0')
    const groupedPatrocinadores = ref<Array<PatrocinadoresInterface[]>>([])
    let patrocinadoresCaroussel = reactive<PatrocinadoresInterface[]>([])
    const $q = useQuasar()

    const getGroupSize = () => {
      if ($q.screen.lt.sm) return 1
      if ($q.screen.lt.md) return 3
      if ($q.screen.lt.lg) return 4
      return 6
    }

    const computedPatrocinadores = (cards: PatrocinadoresInterface[]): Array<PatrocinadoresInterface[]> => {
      const groupSize = getGroupSize()
      const result = []
      for (let i = 0; i < cards.length; i += groupSize) {
        result.push(cards.slice(i, i + groupSize))
      }
      return result
    }

    const getPatrocinadores = () => {
      PatrocinadoresService.getAll()
        .then(response => {
          if (response.status === 200) {
            patrocinadoresCaroussel = response.data
            groupedPatrocinadores.value = computedPatrocinadores(patrocinadoresCaroussel)
          }
        })
        .catch(erro => {
          $q.notify({
            message: erro.message,
            color: 'negative'
          })
        })
    }

    // Atualiza o número de itens por slide quando a tela muda de tamanho
    watch(() => $q.screen.name, () => {
      groupedPatrocinadores.value = computedPatrocinadores(patrocinadoresCaroussel)
    })

    onMounted(() => {
      getPatrocinadores()
    })

    return {
      slide,
      groupedPatrocinadores
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

.carousel_slide,
.carousel_slide div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.carousel_image {
  width: 170px;
  height: 170px;
}
@media screen and (max-width: 880px) {
  .patrocinadores_main {
    padding: 3rem 1rem;
  }

  .patrocinadores_main h3 {
    font-size: 24px;
  }

  .carousel_image {
    width: 120px;
    height: 120px;
  }
}
</style>
