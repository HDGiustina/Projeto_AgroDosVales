import { api } from 'src/boot/axios'

class InteresseService {
  private static readonly endpoint = '/interesse'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }
}

export default InteresseService
