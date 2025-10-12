// Busca aprendizados não logado

import { api } from 'src/boot/axios'

class EventosService {
  private static readonly endpoint = '/curso'

  static async getCurso (param = {}) {
    const params = { ativo: true, ...param }
    return await api.get(this.endpoint, { params })
  }
}

export default EventosService
