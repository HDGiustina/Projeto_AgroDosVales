<template>
    <section class="bannerInfo">
        <main class="banneInfo_main">
          <h1>Trazendo informações <b class="text_destac">confiáveis</b> com base <b class="text_destac">científica</b> e fazendo o intermédio das <b class="text_destac">Conexões</b> entre Produtores e Indústrias</h1>
          <p>Uma plataforma dedicada a conectar o conhecimento científico sobre plantas bioativas com o setor produtivo, impulsionando a inovação e o desenvolvimento sustentável.</p>
          <buttonComponent
            class="banneInfo_btn"
            label="Descubra mais"
            :outline="false"
            :rounded="false"
            :nocaps="true"
            @click="navegar('login')"
          />
        </main>
        <div class="bannerInfo_img">
          <img src="../../assets\home_banner.png" alt="Plantas Bioativas" />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BannerInfo',
  components: {
    buttonComponent
  },
  setup () {
    const router = useRouter()

    const navegar = (tipo: string) => {
      router.push({ name: tipo })
    }

    return {
      navegar
    }
  }
})
</script>

<style scoped>

.bannerInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rem;
  gap: 5rem;
  max-width: var(--limit-page-width);
  margin: auto;
  position: relative;
}

.banneInfo_main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}

.banneInfo_main h1 {
  font-size: 2.5rem;
  color: var(--color-dark);
  line-height: 1.2;
}

.text_destac {
  color: var(--color-primary);
}

.banneInfo_main p {
  font-size: 1rem;
  color: var(--color-gray);
}

.banneInfo_btn {
  width: fit-content;
}

.bannerInfo_img {
  width: 50%;
  border-radius: 8px;
  overflow: hidden;
}

.bannerInfo_img img {
  width: 100%;
  height: auto;
}

@media screen and (max-width: 1224px) {
  .bannerInfo {
    gap: 2.5rem;
    padding: 6rem;
  }

  .banneInfo_main h1 {
    font-size: 2rem;
    line-height: 1.2;
  }

  .banneInfo_main p {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 1024px) {

  .bannerInfo {
    padding: 4rem;
    gap: 2rem;
    background-color: var(--color-quaternary-op);
  }
  .banneInfo_main {
    width: 100%;
  }
  .bannerInfo_img {
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
  .bannerInfo_img img {
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 480px) {
  .bannerInfo {
    gap: 1.8rem;
    padding: 3rem 2rem;
  }

  .banneInfo_main h1 {
    font-size: 1.6rem;
    text-align: center;
  }

  .banneInfo_main p {
    font-size: 0.7rem;
    line-height: 1.8;
    text-align: center;
  }

  .banneInfo_btn {
    margin: auto;
    font-size: 12px !important;
  }
}

@media screen and (max-width: 360px) {
  .bannerInfo {
    padding: 3rem 1rem;
  }
}
</style>
