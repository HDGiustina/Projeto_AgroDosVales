// ProdutoresService.ts

import { Cookies, LocalStorage } from 'quasar'
import { api } from 'src/boot/axios'

class LoginService {
  private static readonly endpoint = '/login'

  static async login (email:string, senha:string) {
    return await api.post(this.endpoint, {
      email,
      senha
    })
  }

  static async esqueci (email:string) {
    return await api.post('/esqueceuSenha', {
      email
    })
  }

  static async novaSenha (params = {}) {
    return await api.post('/novaSenha', params)
  }

  static logout () {
    Cookies.remove('token')
    LocalStorage.clear()
    location.replace('/login?path=' + encodeURIComponent(location.pathname))
  }
}

export default LoginService
