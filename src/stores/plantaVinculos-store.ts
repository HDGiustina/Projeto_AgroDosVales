import { defineStore } from 'pinia'

export const usePLantaVinculosStore = defineStore('plantaVinculos', {
  state: () => ({
    planta_id: 0,
    planta: '',
    pagina: ''
  }),
  getters: {
    plantaInfo: (state) => {
      return { id: state.planta_id, planta: state.planta, pagina: state.pagina }
    }
  },
  actions: {
    setPlanta (plantaId: number, planta: string, pagina: string) {
      this.planta_id = plantaId
      this.planta = planta
      this.pagina = pagina
    }
  }
})
