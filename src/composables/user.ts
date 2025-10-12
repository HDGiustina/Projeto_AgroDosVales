import { ref, Ref } from 'vue'
import { UserInterface } from 'src/interfaces/interfaces'

export const globalUser: Ref<UserInterface | null> = ref(null)

export const updateUser = () => {
  const userJson = localStorage.getItem('usuario')
  globalUser.value = userJson ? JSON.parse(userJson) : null
}

export const clearUser = () => {
  globalUser.value = null
}
