import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import EventosService from '../../services/eventosService'
import type { atualizacoesInterfaces } from 'src/interfaces/interfaces'

export const useEventosStore = defineStore('eventos', () => {
  const $q = useQuasar()
  const eventosList = ref<atualizacoesInterfaces[]>([])
  const carregando = ref(false)
  const carregado = ref(false) // <- novo controle para saber se já buscou uma vez

  async function fetchEventos () {
    // evita requests duplicadas
    if (carregando.value || carregado.value) return

    carregando.value = true
    try {
      const response = await EventosService.getAll({ top: 1000 })
      if (response.status === 200) {
        eventosList.value = response.data
        carregado.value = true
      } else {
        $q.notify({ message: 'Erro ao carregar eventos', color: 'negative' })
      }
    } catch (erro: any) {
      $q.notify({ message: erro.message, color: 'negative' })
    } finally {
      carregando.value = false
    }
  }

  const primeiroEvento = () =>
    eventosList.value.length > 0 ? eventosList.value[0] : null

  return { eventosList, carregando, carregado, fetchEventos, primeiroEvento }
})
