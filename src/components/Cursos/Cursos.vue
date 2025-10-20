<template>
  <section class="CursosComponent" id="cursosSection">
    <h1>Cursos Ativos</h1>

    <main class="CursosComponent_main">
      <Card
        v-for="(curso, index) in cursosPaginados"
        :key="index"
        :infos="curso"
      />
    </main>

    <q-pagination
      v-if="totalPages > 1"
      v-model="page"
      :max="totalPages"
      direction-links
      flat
      active-color="primary"
      class="CursosComponent_pagination"
      @click="goToTop()"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import AprendizadoService from '../../../services/aprendizadoService'
import Card from 'src/components/Card.vue'

export default defineComponent({
  name: 'CursosComponent',
  components: {
    Card
  },
  setup () {
    const page = ref(1)
    const cursos = ref<atualizacoesInterfaces[]>([])
    const cursosPorPagina = 6
    const $q = useQuasar()

    const getAprendizado = async () => {
      try {
        const response = await AprendizadoService.getCurso({ top: 1000 })
        if (response.status === 200) {
          cursos.value = response.data
        } else {
          $q.notify({
            message: 'Erro ao carregar os cursos',
            color: 'negative'
          })
        }
      } catch (erro: any) {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      }
    }

    const totalPages = computed(() =>
      Math.ceil(cursos.value.length / cursosPorPagina)
    )

    const cursosPaginados = computed(() => {
      const start = (page.value - 1) * cursosPorPagina
      const end = start + cursosPorPagina
      return cursos.value.slice(start, end)
    })

    const goToTop = () => {
      const cursosComponent = document.getElementById('cursosSection')
      if (cursosComponent) {
        cursosComponent.scrollIntoView({ behavior: 'smooth' })
      }
    }

    onMounted(() => {
      getAprendizado()
    })

    return {
      cursos,
      cursosPaginados,
      page,
      totalPages,
      goToTop
    }
  }
})
</script>

<style lang="scss" scoped>
.CursosComponent {
  padding: 8rem 4rem;
}

.CursosComponent h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: normal;
  margin: 0 0 28px;
}

.CursosComponent_main {
  max-width: var(--limit-page-width);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin: auto;
}

.CursosComponent_pagination {
    justify-content: center;
    margin: 2rem 0 0;
}

@media screen and (max-width: 1024px) {
    .CursosComponent {
        padding: 6rem 4rem;
    }
}

@media screen and (max-width: 680px) {
    .CursosComponent {
        padding: 4rem 2rem;
    }
}

@media screen and (max-width: 480px) {
    .CursosComponent {
        padding: 3rem 2rem;
    }
    .CursosComponent_main {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .CursosComponent h1{
        font-size: 18px;
    }
}
</style>
