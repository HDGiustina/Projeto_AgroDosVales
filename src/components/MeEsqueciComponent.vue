<template>
  <q-card style="width: 40%">
        <q-card-section >
          <q-form id="meEsqueciForm" ref="meEsqueciForm" @submit="esqueci" style="width: 100%" class=" column flex flex-center">
            <p class="text-h6 text-black text-bold q-mt-md">Para prosseguir insira seu e-mail cadastrado</p>
            <div class="column" style="width: 79%">
              <p class="q-mb-sm">E-mail</p>
            </div>
            <q-input
              v-model="email"
              dense
              outlined
              rounded
              placeholder="Insira seu e-mail já cadastrado aqui"
              class="inputCard"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Email" size="md" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="flex flex-center column">
          <buttonComponent
            label="Confirmar email"
            style="border-radius: 13px; width: 45%"
            :outline="false"
            no-caps
            type="submit"
            form="meEsqueciForm"
            class="text-boldbn q-mb-md"
          />
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import LoginService from 'app/services/loginService'
import { GetErrorMessage } from 'src/composables/helper'
import { requiredRule } from 'src/composables/InputRules'
import { QForm, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { updateUser } from 'src/composables/user'
export default defineComponent({
  name: 'MesqueciComponent',
  components: {
    buttonComponent
  },
  setup () {
    const email = ref<string>('')
    const $q = useQuasar()
    const meEsqueciForm = ref<null | QForm>(null)
    const loading = ref(false)
    const router = useRouter()

    const esqueci = async () => {
      loading.value = true
      const isValid = await meEsqueciForm.value?.validate()
      if (email.value && isValid) {
        const loginResponse = await LoginService.esqueci(email.value).catch(error => {
          $q.notify({
            color: 'warning',
            message: GetErrorMessage(error)
          })
        })
        if (loginResponse) {
          updateUser()
          $q.notify({
            message: 'Confira o email de recuperação de senha que foi enviado!',
            color: 'primary'
          })
          router.push({ name: 'login' })
        }
      }
    }

    return {
      email,
      meEsqueciForm,
      router,
      requiredRule,
      esqueci
    }
  }
})
</script>

<style>
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
