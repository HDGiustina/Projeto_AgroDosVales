<template>
  <q-page style="padding: 2.5%">
    <div>
      <p class="q-mb-xs" style="font-size: 25px; font-weight: bold; color: #5A645B">Olá, {{ usuario.firstName }}</p>
      <p class="" style="font-size: 12px; color: #5A645B">Seus interesses:</p>
      <q-carousel
        height="25vh"
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
          v-for="(cardGroup, index) in groupedPlantas"
          :key="index"
          :name="'slide' + index"
          style="padding-top: 0; padding-bottom: 0; padding-left: 0;"
        >
          <div class="row flex justify-between">
            <div
              v-for="(card, cardIndex) in cardGroup"
              :key="cardIndex"
              class="col"
              style="height: 100%; max-width: 24vw"
            >
              <div :class="usuario.tipo_usuario === 'admin' ? 'row' : 'row cursor-pointer'" @click="navegar">
                <q-img
                  loading="eager"
                  :src="card.imagem"
                  fit="contain"
                  height="9vh"
                  width="12vw"
                  class="q-mb-sm"
                  style="height: 12vh; width: 7vw"
                />
                <div class="q-mt-md q-ml-sm" >
                  <p tyle="width: 90%" class="q-mb-xs text-bold">{{ card.nome_popular }}</p>
                  <p style="font-size: 12px"><i>{{ card.nome_cientifico }}</i></p>
                </div>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <h6 style="font-weight: 600; color: #5A645B">Últimas atualizações</h6>
    <carousel-component :param="'home'"/>
  </q-page>
</template>

<script lang="ts">
import PlantasService from 'app/services/plantasService'
import { useQuasar } from 'quasar'
import CarouselComponent from 'src/components/CarouselComponent.vue'
import buttonComponent from 'src/components/Button.vue'
import { GetErrorMessage } from 'src/composables/helper'
import { Planta } from 'src/interfaces/interfaces'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'HomePage',
  components: {
    CarouselComponent,
    buttonComponent
  },
  setup () {
    const slide = ref('slide0')
    const router = useRouter()
    const loading = ref(false)
    const usuario = JSON.parse(localStorage.getItem('usuario') || '')
    const groupedPlantas = ref<Array<Planta[]>>()
    let plantasCaroussel = reactive<Planta[]>([])
    const $q = useQuasar()

    const getPlantas = async () => {
      loading.value = true

      const plantasResp = await PlantasService.getAll({ top: 9 }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })

      if (plantasResp) {
        plantasCaroussel = plantasResp.data
        groupedPlantas.value = computedPlantas(plantasCaroussel)
      }
    }

    const navegar = () => {
      if (usuario.tipo_usuario === 'admin') {
        return
      }
      router.push({ name: 'config' })
    }

    onMounted(() => {
      getPlantas()
    })

    const computedPlantas = (cards: Planta[]): Array<Planta[]> => {
      const groupSize = 3
      const result = []
      for (let i = 0; i < cards.length; i += groupSize) {
        result.push(cards.slice(i, i + groupSize))
      }
      return result
    }
    return {
      slide,
      groupedPlantas,
      usuario,
      navegar
    }
  }
})
</script>
