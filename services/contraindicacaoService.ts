// ProdutoresService.ts

import { api } from 'src/boot/axios'

class ContraindicacoesService {
  private static readonly endpoint = '/contraindicacoes'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }

  static async new (indicacao: { descricao: string }) {
    return await api.post(this.endpoint, indicacao)
  }

  static async update (indicacao: { ativo: boolean }, id: number) {
    return await api.put(this.endpoint + '/' + id, indicacao)
  }

  static async getContraIndicacao (id: number) {
    return await api.get(this.endpoint + '/' + id)
  }

  static async attachIndicacoes (dados: { contraindicacoes?: number[] }, id: number) {
    return await api.post(this.endpoint + '/' + id + '/attachcontraindicacoes', dados)
  }

  static async attachPlantas (dados: { plantas?: number[] }, id: number) {
    return await api.post(this.endpoint + '/' + id + '/attachplantas', dados)
  }
}

export default ContraindicacoesService
