// Busca eventos não logado

import { api } from 'src/boot/axios'
import { Artigo } from 'src/interfaces/interfaces'

class ArtigoService {
  private static readonly endpoint = '/artigo'

  static async getAll (param = {}) {
    const params = { ativo: true, ...param }
    return await api.get(this.endpoint, { params })
  }

  static async newArtigo (dados: Artigo, isFormData: boolean) {
    if (isFormData) {
      const formData = new FormData()
      Object.entries(dados).forEach(([key, value]) => {
        if (key === 'miniatura') {
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

  static async setArtigo (id: number, dados: Artigo, isFormData: boolean) {
    if (isFormData) {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      Object.entries(dados).forEach(([key, value]) => {
        if (key === 'miniatura') {
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

  static async getArtigo (id: number, param = {}) {
    return await api.get(this.endpoint + '/' + id, { params: param })
  }
}

export default ArtigoService
