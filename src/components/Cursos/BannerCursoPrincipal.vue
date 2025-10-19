<template>
    <section class="bannerCurso_container">
      <main class="bannerCurso">
        <main class="bannerCurso_main">
          <h1>Descubra o Futuro da Agricultura Sustentável</h1>
          <p>Explore nossos cursos especializados em biotecnologia agrícola, manejo integrado e gestão rural. Capacite-se com as mais recentes inovações para um cultivo eficiente e ecológico.</p>
          <buttonComponent
            class="bannerCurso_btn"
            label="Explorar Cursos"
            :outline="false"
            :rounded="false"
            :nocaps="true"
            @click="goToCursos()"
          />
        </main>
        <div class="bannerCurso_img">
          <img src="../../assets/cursos_banner.png" alt="Cusos" />
        </div>
      </main>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BannerCursoPrincipal',
  components: {
    buttonComponent
  },
  setup () {
    const router = useRouter()

    const goToCursos = () => {
      const cursosComponent = document.getElementById('cursosSection')
      if (cursosComponent) {
        cursosComponent.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      goToCursos
    }
  }
})
</script>

<style scoped>

.bannerCurso_container {
  background-color: var(--color-primary-light);
}

.bannerCurso {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rem;
  gap: 5rem;
  max-width: var(--limit-page-width);
  margin: auto;
  position: relative;
}

.bannerCurso_main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}

.bannerCurso_main h1 {
  font-size: 3rem;
  color: var(--color-dark);
  line-height: 1.2;
}

.text_destac {
  color: var(--color-primary);
}

.bannerCurso_main p {
  font-size: 1.3rem;
  color: var(--color-gray);
  line-height: 2.3rem;
}

.bannerCurso_btn {
  width: fit-content;
}

.bannerCurso_img {
  width: 50%;
  border-radius: 8px;
  overflow: hidden;
}

.bannerCurso_img img {
  width: 100%;
  height: auto;
}

@media screen and (max-width: 1224px) {
  .bannerCurso {
    gap: 2.5rem;
    padding: 6rem;
  }

  .bannerCurso_main h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  .bannerCurso_main p {
    font-size: 1rem;
    line-height: 2rem;
  }
}

@media screen and (max-width: 1024px) {

  .bannerCurso_container {
    background-color: var(--color-primary-light-op);
  }
  .bannerCurso {
    padding: 4rem;
    gap: 2rem;
  }
  .bannerCurso_main {
    width: 100%;
  }
  .bannerCurso_img {
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
  .bannerCurso_img img {
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 480px) {
  .bannerCurso {
    gap: 1.8rem;
    padding: 3rem 2rem;
  }

  .bannerCurso_main h1 {
    font-size: 1.6rem;
    text-align: center;
  }

  .bannerCurso_main p {
    font-size: 0.7rem;
    line-height: 1.8;
    text-align: center;
  }

  .bannerCurso_btn {
    margin: auto;
    font-size: 12px !important;
  }
}

@media screen and (max-width: 360px) {
  .bannerCurso {
    padding: 3rem 1rem;
  }
}
</style>
