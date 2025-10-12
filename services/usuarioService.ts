// ProdutoresService.ts

import { api } from 'src/boot/axios'
import { newInteresseInterface, NovoCadastroInteressadoInterface, newProdutorInterface, CadastrolInterface, newIndustriaInterface, NovoCadastroInterface, Planta } from 'src/interfaces/interfaces'

class UsuarioService {
  private static readonly endpoint = '/usuario'

  static async getAll (param = {}) {
    return await api.get(this.endpoint, { params: param })
  }

  static async newUser (dados:newProdutorInterface | CadastrolInterface | newIndustriaInterface | newInteresseInterface) {
    return await api.post(this.endpoint, dados)
  }

  static async setUser (id:number, dados:newProdutorInterface | newIndustriaInterface | CadastrolInterface | NovoCadastroInterface | NovoCadastroInteressadoInterface, isFormData = false) {
    if (isFormData === true) {
      const formData = new FormData()
      formData.append('_method', 'PUT')

      Object.entries(dados).forEach(([key, value]) => {
        if (key === 'miniatura') {
          formData.append(key, value, value.name)
        } else if (key === 'plantas') {
          value.forEach((planta: Planta, index: number) => {
            formData.append(`plantas[${index}][planta_id]`, planta.planta_id.toString())
            formData.append(`plantas[${index}][producao_est]`, planta.producao_est)
            formData.append(`plantas[${index}][data_entrega_est]`, planta.data_entrega_est)
          })
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

  static async getUser (id:number, param = {}) {
    return await api.get(this.endpoint + '/' + id, { params: param })
  }
}

export default UsuarioService
