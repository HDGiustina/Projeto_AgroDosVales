<template>
  <div>
    <q-carousel
      height="30vh"
      style="width: 80vw;"
      v-model="slide"
      arrows
      prev-icon="arrow_left"
      next-icon="arrow_right"
      control-color="black"
      :slides-per-page="1"
      class="q-pb-xl"
    >
      <q-carousel-slide
        v-for="(cardGroup, index) in groupedPatrocinadores"
        :key="index"
        :name="'slide' + index"
        style="padding-top: 0; padding-bottom: 0"
      >
        <div class="row">
          <div
            v-for="(card, cardIndex) in cardGroup"
            :key="cardIndex"
            class="col"
            style="height: 100%"
          >
          <q-img
            loading="eager"
            :src="card.logo"
            fit="contain"
            class="q-mb-sm"
            style="height: 17vh; width: 10vw"
          />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
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
