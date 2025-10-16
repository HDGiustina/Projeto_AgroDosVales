<template>
    <section class="bannerConceito">
        <h1 class="bannerConceito_title">
            <img src="../../assets/icons/flower.svg" alt="Icone flor" />
            <span>O que são Plantas Bioativas?</span>
        </h1>
        <p>
            O conceito de "plantas bioativas" é relativamente recente e, por vezes, pode causar estranheza, quando se leva em conta que toda a planta possui uma atividade biológica inerente a si própria. Contudo, a expressão foi criada para designar aquelas plantas que possuem alguma ação sobre outros seres vivos e cujo efeito pode manifestar-se tanto pela sua presença em um ambiente quanto pelo uso direto de substâncias delas extraídas, desde que mediante uma intenção ou consciência humana deste efeito. Assim, são consideradas bioativas as plantas medicinais, aromáticas, condimentares, inseticidas, repelentes, tóxicas, bactericidas e até mesmo as que possuem cunho místico ou religioso.
        </p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BannerConceito'
})
</script>

<style scoped>
.bannerConceito {
    margin: auto;
    padding: 6rem 8rem;
    background-color: var(--color-gray-light);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bannerConceito_title {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 28px;
    color: var(--color-dark);
    font-weight: bold;
}

.bannerConceito_title img {
    width: 30px;
    height: 30px;
}

.bannerConceito p{
    font-size: 16px;
    color: var(--color-gray);
    text-align: center;
    line-height: 1.5;   
    max-width: 700px;
}

@media screen and (max-width: 1024px) {
    .bannerConceito_title {
        font-size: 24px;
    }
}
@media screen and (max-width: 680px) {
    .bannerConceito {
        padding: 4rem;
    }
    .bannerConceito_title {
        font-size: 20px;
    }
    .bannerConceito_title img {
        width: 22px;
        height: 22px;
    }
    .bannerConceito p{
        font-size: 12px;
    }
}

@media screen and (max-width: 480px) {
    .bannerConceito {
        padding: 3rem 1.5rem;
    }
    .bannerConceito_title { 
        gap: 0.2rem;
    }
}
@media screen and (max-width: 380px) {
    .bannerConceito_title {
        font-size: 16px;
        line-height: 4;
    }
}
</style>
