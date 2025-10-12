
import { api } from 'src/boot/axios'

class PatrocinadoresService {
  private static readonly endpoint = '/patrocinador'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }
}

export default PatrocinadoresService
