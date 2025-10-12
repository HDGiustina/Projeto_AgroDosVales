// ProdutoresService.ts

import { api } from 'src/boot/axios'

class IndicacaoService {
  private static readonly endpoint = '/indicacoes'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }

  static async new (indicacao: { descricao: string }) {
    return await api.post(this.endpoint, indicacao)
  }

  static async update (indicacao: { ativo: boolean }, id: number) {
    return await api.put(this.endpoint + '/' + id, indicacao)
  }

  static async getIndicacao (id: number) {
    return await api.get(this.endpoint + '/' + id)
  }

  static async attachIndicacoes (dados: { indicacoes?: number[] }, id: number) {
    return await api.post(this.endpoint + '/' + id + '/attachindicacoes', dados)
  }

  static async attachPlantas (dados: { plantas?: number[] }, id: number) {
    return await api.post(this.endpoint + '/' + id + '/attachplantas', dados)
  }
}

export default IndicacaoService
