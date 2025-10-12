// ProdutoresService.ts

import { api } from 'src/boot/axios'

class ProdutoresService {
  private static readonly endpoint = '/produtor'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }
}

export default ProdutoresService
