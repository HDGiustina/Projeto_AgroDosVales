<template>
    <section class="ListaArtigos">
        <h1>Recursos de Aprendizado</h1>
        <main class="ListaArtigos_cards">
            <CardSimple v-for="(card, ind) in artigoList" :key="ind" :infos="card" page="artigo"/>
        </main>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Artigo } from 'components/models'
import ArtigosService from 'app/services/artigosService'
import CardSimple from 'src/components/CardSimple.vue'

export default defineComponent({
  name: 'ListaArtigos',
  components: {
    CardSimple
  },
  setup () {
    const artigoList = ref<Artigo[]>()
    ArtigosService.getAll({ ativo: true }).then((resp) => {
      artigoList.value = resp.data
    })
    return {
      artigoList
    }
  }
})
</script>

<style scoped>
.ListaArtigos {
    padding: 2rem 6rem 6rem;
    background-color: var(--color-gray-light);
}

.ListaArtigos h1{
    font-size: 28px;
    text-align: center;
    line-height: normal;
    margin: 0 0 28px;
}

.ListaArtigos_cards {
    max-width: var(--limit-page-width);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin: auto;
}

@media screen and (max-width: 1024px) {
    .ListaArtigos {
        padding: 2rem 4rem;
    }
    .ListaArtigos h1{
        font-size: 20px;
    }
}

@media screen and (max-width: 680px) {
    .ListaArtigos {
        padding: 2rem 2rem;
    }
}

@media screen and (max-width: 480px) {
    .ListaArtigos_cards {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .ListaArtigos h1{
        font-size: 18px;
    }
}
</style>
