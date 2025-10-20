<template>
  <div class="card">
    <img :src="infos.miniatura" :alt="'Imagem de ' + infos.tipo" />
    <div class="card_main">
        <h2>{{ infos.titulo }}</h2>
        <div class="card_infos">
          <span class="card_text" v-if="infos.data_realizacao">
            <img src="../assets/icons/calendar_gray.svg" alt="Data">
            {{ date.formatDate(infos.data_realizacao, "D [de] MMMM [de] YYYY") }}
          </span>
          <span class="card_text" v-else>
            <img src="../assets/icons/calendar_gray.svg" alt="Data">
            {{ date.formatDate(infos.data_inicio, 'DD/MM/YYYY') }}
            {{ date.formatDate(date.extractDate(infos.data_inicio, 'YYYY-MM-DD'), 'YYYY-MM-DD') !== date.formatDate(date.extractDate(infos.data_fim, 'YYYY-MM-DD'), 'YYYY-MM-DD') ? ' - ' + date.formatDate(infos.data_fim, 'DD/MM/YYYY') : ''
            }}
          </span>
          <span class="card_text" v-if="infos.data_realizacao">
            <img src="../assets/icons/clock.svg" alt="Horario">
            {{ date.formatDate(infos.data_realizacao, 'HH:mm') }}
          </span>
          <span class="card_text" v-else>
            <img src="../assets/icons/clock.svg" alt="Horario">
            {{ date.formatDate(infos.data_inicio, 'HH:mm') }}
            {{
              date.formatDate(infos.data_inicio, 'HH:mm') !== date.formatDate(infos.data_fim, 'HH:mm') ? ' - ' + date.formatDate(infos.data_fim, 'HH:mm') : ''
            }}
          </span>
          <span class="card_text">
            <img src="../assets/icons/map.svg" alt="Local">
            {{ infos.local }}
          </span>
        </div>
        <p>{{ infos.descricao }}</p>
        <buttonComponent
          class="card_btn"
          label="Saber mais"
          :outline="false"
          :no-caps="true"
          @click="openScreen(infos)"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { date, Quasar } from 'quasar'
import langPt from 'quasar/lang/pt-BR'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'CardComponent',
  components: {
    buttonComponent
  },
  props: {
    infos: {
      type: Object,
      required: true
    }
  },
  setup () {
    Quasar.lang.set(langPt)

    const openScreen = (card:atualizacoesInterfaces) => {
      const linkDestino = card.link ?? card.link_inscricao
      window.open(linkDestino, '_blank')
    }

    return {
      date,
      openScreen
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-op);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  position: relative;
  max-width: 600px;
}

.card img {
  flex-shrink: 0;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
}

.card_main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  justify-content: space-between;
}

.card_main h2 {
  font-size: 18px;
  color: var(--color-dark);
  line-height: normal;
}

.card_infos {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
}

.card_text {
  font-size: 14px;
  color: var(--color-gray);
  display: flex;
  align-items: center;
  gap: 6px;
}

.card_text img {
  width: 16px;
  height: 16px;
}

.card_main p {
  font-size: 14px;
  color: var(--color-dark);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.card_btn {
  align-self: flex-start;
  font-size: 14px;
  width: 100%;
  padding: 8px 16px;
}

.card_btn :nth-child(n):is(i) {
  font-size: 1rem;
}

@media screen and (max-width: 824px) {
  .card_main {
    gap: 8px;
  }

  .card_main h2 {
    font-size: 16px;
  }

  .card_main p, .card_text, .card_btn {
    font-size: 12px !important;
  }

  .card_main p{
    -webkit-line-clamp: 4;
  }
}
</style>
