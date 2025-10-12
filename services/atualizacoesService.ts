// Busca atualizações para home não logado

import { api } from 'src/boot/axios'

class AtualizacoesService {
  private static readonly endpoint = '/home'

  static async getHome (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }
}

export default AtualizacoesService
