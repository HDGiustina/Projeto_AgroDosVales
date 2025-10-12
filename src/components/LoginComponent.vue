<template>
  <q-card style="width: 40%">
        <q-card-section >
          <q-form id="loginForm" ref="loginForm" @submit="login" style="width: 100%" class=" column flex flex-center">
            <p class="text-h5 text-black text-bold q-mt-md">Bem-vindo à nossa plataforma!</p>
            <div class="column" style="width: 79%">
              <p class="q-mb-sm">E-mail</p>
            </div>
            <q-input
              v-model="email"
              dense
              outlined
              rounded
              placeholder="Insira seu e-mail aqui"
              class="inputCard q-mb-md"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Email" size="md" />
              </template>
              <template v-slot:error>
                <div>{{ requiredRule }}</div>
              </template>
            </q-input>
            <div class="column" style="width: 79%">
              <p class="q-mb-sm">Senha</p>
            </div>
            <q-input
              v-model="senha"
              dense
              outlined
              rounded
              placeholder="Insira sua senha aqui"
              class="inputCard q-mb-md"
              :rules="[requiredRule]"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:prepend>
                <q-icon name="app:Lock" size="md" />
              </template>
              <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="flex flex-center column">
          <buttonComponent
            label="Entrar"
            style="border-radius: 13px; width: 45%"
            :outline="false"
            no-caps
            type="submit"
            form="loginForm"
            class="text-boldbn"
          />
          <p class="q-mt-lg cursor-pointer" @click="navegar" style="color: #B3B3B3; text-decoration: underline">Esqueci minha senha</p>
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import LoginService from 'app/services/loginService'
import { GetErrorMessage } from 'src/composables/helper'
import { UserInterface } from 'src/interfaces/interfaces'
import { requiredRule } from 'src/composables/InputRules'
import { QForm, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { updateUser } from 'src/composables/user'
export default defineComponent({
  name: 'LoginComponent',
  components: {
    buttonComponent
  },
  setup () {
    const email = ref<string>('')
    const $q = useQuasar()
    const senha = ref<string>('')
    const loginForm = ref<null | QForm>(null)
    const loading = ref(false)
    const router = useRouter()

    const saudacao = () => {
      const hora = new Date().getHours()

      if (hora >= 6 && hora < 12) {
        return 'Bom dia'
      } else if (hora >= 12 && hora < 18) {
        return 'Boa Tarde'
      } else {
        return 'Boa Noite'
      }
    }

    const login = async () => {
      loading.value = true
      const isValid = await loginForm.value?.validate()
      if (email.value && senha.value && isValid) {
        const loginResponse = await LoginService.login(email.value, senha.value).catch(error => {
          $q.notify({
            color: 'warning',
            message: GetErrorMessage(error)
          })
          for (const i in $q.cookies.getAll()) {
            $q.cookies.remove(i)
          }
          localStorage.clear()
        })
        if (loginResponse) {
          const user: UserInterface = { ...loginResponse.data.user }
          user.firstName = user.nome.split(' ')[0]
          $q.cookies.set('accessToken', loginResponse.data.access_token)
          localStorage.setItem('usuario', JSON.stringify(user))
          updateUser()
          $q.notify({
            color: 'primary',
            message: saudacao() + ', ' + user.firstName + '!'
          })
          router.push({ name: 'home' })
        }
      }
    }

    const navegar = () => {
      console.log('navegar')
      router.push({ name: 'esqueci' })
    }
    return {
      email,
      isPwd: ref(true),
      senha,
      loginForm,
      router,
      requiredRule,
      login,
      navegar
    }
  }
})
</script>

<style scoped>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 10px !important;
  padding-left: 7px;
}
.inputCard {
  width: 80%;
}
.q-field__bottom.row.items-start.q-field__bottom--animated {
  padding: none;
}
</style>
