<template>
  <div class="card_simple">
    <q-chip v-if="infos.tipo" color="primary" text-color="white" class="card_chip">
      {{ infos.tipo }}
    </q-chip>
    <img :src="infos.miniatura" :alt="'Imagem de ' + infos.tipo" />
    <div class="card_main">
        <h2>{{ infos.titulo }}</h2>
        <p>{{ infos.descricao }}</p>
        <span v-if="infos.data_realizacao">Data: {{ date.formatDate(infos.data_realizacao, 'DD/MM/YYYY') }}</span>
        <span v-else-if="infos.inscricao_ate">Inscrição até: {{ date.formatDate(infos.inscricao_ate, 'DD/MM/YYYY') }}</span>
        <buttonComponent
          class="card_btn"
          :label="getText(infos)"
          :flat="true"
          :no-caps="true"
          iconRight="arrow_forward"
          @click="openScreen(infos)"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import { atualizacoesInterfaces } from 'src/interfaces/interfaces'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'CardSimple',
  components: {
    buttonComponent
  },
  props: {
    infos: {
      type: Object,
      required: true
    },
    page: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const router = useRouter()

    const openScreen = (card:atualizacoesInterfaces) => {
      if (card.tipo === 'artigo' && card.arquivo) {
        router.push({ name: 'readPdf', query: { arquivo: card.arquivo, descricao: card.titulo } })
      } if (props.page === 'artigo' && card.link) {
        router.push({ name: 'readPdf', query: { arquivo: card.link, descricao: card.titulo, back: 'educacao' } })
      } else {
        const linkDestino = card.link ?? card.link_inscricao
        window.open(linkDestino, '_blank')
      }
    }

    const getText = (card:atualizacoesInterfaces) => {
      const text = ""
      if (card.tipo === 'artigo' || props.page === 'artigo') {
        return 'Leia mais'
      } else if (card.tipo === 'evento') {
        return 'Inscrever-me no evento'
      } else if (card.tipo === 'curso') {
        return 'Inscrever-me no curso'
      }

      return text
    }

    return {
      date,
      openScreen,
      getText
    }
  }
})
</script>

<style lang="scss" scoped>
.card_simple {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-op);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  position: relative;
}

.card_chip {
  width: auto;
  position: absolute;
  top: 12px;
  left: 10px;
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 600;
}

.card_simple img {
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
  gap: 8px;
  height: 100%;
  justify-content: space-between;
}

.card_main h2 {
  font-size: 18px;
  color: var(--color-dark);
  line-height: normal;
}

.card_main p {
  font-size: 14px;
  color: var(--color-gray);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.card_main span {
  font-size: 14px;
  color: var(--color-gray);
}

.card_btn {
  align-self: flex-start;
  font-size: 14px;
}

.card_btn :nth-child(n):is(i) {
  font-size: 1rem;
}

@media screen and (max-width: 824px) {
  .card_main h2 {
    font-size: 16px;
  }

  .card_main p, .card_main span, .card_btn {
    font-size: 12px !important;
  }
}
</style>
