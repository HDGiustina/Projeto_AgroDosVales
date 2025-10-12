<template>
  <q-page style="z-index: 2" class="flex flex-center">
    <q-card
      class="q-pa-sm"
      bordered
      style="width: 500px; border-radius: 10px;"
    >
      <q-card-section>
        <q-form id="form" ref="form" @submit="alterasenha" class="q-gutter-md column flex flex-center">
          <p class="text-black text-bold q-mt-md">Insira sua nova senha!</p>
            <div class="column" style="width: 94%">
              <p class="q-ma-none">Nova senha</p>
            </div>
            <q-input
              v-model="senha"
              dense
              outlined
              rounded
              style="width: 95%;"
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
          <div class="column" style="width: 94%">
              <p class="q-ma-none">Confirme sua senha</p>
            </div>
          <q-input
            outlined
            dense
            rounded
            class="inputCard"
            v-model="confSenha"
            label="Confirmar Senha"
            style="width: 95%;"
            :type="isPwd ? 'password' : 'text'"
            :rules="[conferirSenha]"
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

      <q-card-section>
        <div class="row justify-center">
          <buttonComponent
            form="form"
            style="width: 100%; border-radius: 10px;"
            type="submit"
            :outline="false"
            label="Trocar Senha"
          />
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import LoginService from 'app/services/loginService'
import { GetErrorMessage } from 'src/composables/helper'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'RecuperarSenhaPage',
  components: {
    buttonComponent
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      console.log(route.query)
    })
    const $q = useQuasar()
    const senha = ref(null)
    const confSenha = ref(null)
    const loading = ref(null)
    const conferirSenha = (value) => {
      return value === senha.value || 'As senhas não conferem'
    }

    const gotoLogin = () => {
      router.push({ name: 'login' })
    }

    const alterasenha = async () => {
      loading.value = true
      const dados = {
        email: route.query.email,
        codigo: route.query.codigo,
        senha: senha.value,
        conf_senha: confSenha.value
      }
      const loginResponse = await LoginService.novaSenha(dados).catch(error => {
        $q.notify({
          color: 'negative',
          message: GetErrorMessage(error)
        })
      }).finally(() => {
        loading.value = false
      })
      if (loginResponse) {
        router.push({ name: 'login' })
        $q.notify({
          color: 'primary',
          message: 'Sua senha foi alterada!',
          actions: [
            { label: 'Login', color: 'green', handler: gotoLogin }
          ]
        })
      }
    }

    onMounted(() => {
      console.log('recuperasi')
    })

    return {
      isPwd: ref(true),
      senha,
      confSenha,
      loading,

      conferirSenha,
      alterasenha
    }
  }
})
</script>

<style >
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 10px !important;
  padding-left: 7px;
}
</style>
