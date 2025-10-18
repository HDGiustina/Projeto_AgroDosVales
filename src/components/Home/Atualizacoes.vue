<template>
  <section class="atualizacoes">
    <h1>Últimas Atualizações</h1>
    <div class="atualizacoes_card">
        <CardSimple v-for="(card, ind) in groupedCards" :key="ind" :infos="card" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import AtualizacoesService from '../../../services/atualizacoesService'
import CardSimple from 'src/components/CardSimple.vue'

export default defineComponent({
  name: 'CarouselComponent',
  components: {
    CardSimple
  },
  setup () {
    const groupedCards = ref<atualizacoesInterfaces[]>()
    let cardsCaoussel = reactive<atualizacoesInterfaces[]>([])
    const $q = useQuasar()

    const getAtualizacoes = () => {
      const atualizacoes = AtualizacoesService.getHome({ top: 6 })

      atualizacoes.then(response => {
        if (response.status === 200) {
          cardsCaoussel = response.data
          groupedCards.value = cardsCaoussel
        }
      }).catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })
    }

    onMounted(() => {
      getAtualizacoes()
    })

    return {
      groupedCards
    }
  }
})
</script>

<style lang="scss" scoped>

.atualizacoes {
  padding: 4rem 6rem;
  max-width: var(--limit-page-width);
  margin: 0 auto;
}

.atualizacoes h1 {
  font-size: 36px;
  color: var(--color-dark);
  text-align: center;
  margin: 0 0 26px;
}

.atualizacoes_card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

@media screen and (max-width: 1024px) {
  .atualizacoes_card {
    grid-template-columns: 1fr 1fr;
  }
  .atualizacoes h1 {
    font-size: 26px;
  }
}

@media screen and (max-width: 824px) {
  .atualizacoes {
    padding: 3rem;
  }
}

@media screen and (max-width: 680px) {
  .atualizacoes {
    padding: 3rem 2rem;
  }
  .atualizacoes h1 {
    font-size: 24px;
    line-height: normal;
  }
  .atualizacoes_card {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 380px) {
  .atualizacoes {
    padding: 3rem 1rem;
  }
}
</style>
