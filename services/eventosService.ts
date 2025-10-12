// Busca eventos não logado

import { api } from 'src/boot/axios'
import { Evento } from 'src/interfaces/interfaces'

class EventosService {
  private static readonly endpoint = '/evento'

  static async getAll (param = {}) {
    const params = { ativo: true, ...param }
    return await api.get(this.endpoint, { params })
  }

  static async newEvento (dados: Evento, isFormData: boolean) {
    if (isFormData) {
      const formData = new FormData()
      Object.entries(dados).forEach(([key, value]) => {
        if (key === 'imagem') {
          formData.append(key, value, value.name)
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v))
        } else {
          formData.append(key, value)
        }
      })
      return api.post(this.endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      return api.post(this.endpoint, dados)
    }
  }

  static async setEvento (id:number, dados: Evento, isFormData: boolean) {
    if (isFormData) {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      Object.entries(dados).forEach(([key, value]) => {
        if (key === 'imagem') {
          formData.append(key, value, value.name)
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v))
        } else {
          formData.append(key, value)
        }
      })
      return api.post(this.endpoint + '/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      return await api.put(this.endpoint + '/' + id, dados)
    }
  }

  static async getEvento (id:number, param = {}) {
    return await api.get(this.endpoint + '/' + id, { params: param })
  }
}

export default EventosService
