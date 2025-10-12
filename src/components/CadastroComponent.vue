<template>
  <q-card style="width: 40%">
        <q-card-section >
          <q-form id="cadastroForm" ref="cadastroForm" @submit="register" style="width: 100%" class=" column flex flex-center">
            <p class="text-h5 text-black text-bold q-mt-md">Bem-vindo à nossa plataforma!</p>
            <div class="flex justify-start column" style="width: 79.9%">
              <p class="textInput q-mb-xs">Nome completo</p>
            </div>
            <q-input
              v-model="item.nome"
              dense
              outlined
              rounded
              placeholder="Insira seu nome completo"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Credentials" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79.9%">
              <p class="textInput q-mb-xs">Email</p>
            </div>
            <q-input
              v-model="item.email"
              dense
              outlined
              rounded
              placeholder="Insira seu e-mail aqui"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Email" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79.9%">
              <p class="textInput q-mb-xs">Senha</p>
            </div>
            <q-input
              v-model="item.senha"
              dense
              outlined
              rounded
              placeholder="Crie uma senha"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Lock" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79.9%">
              <p class="textInput q-mb-xs">Tipo de usuário</p>
            </div>
            <q-select
              v-model="item.tipo_usuario"
              dense
              :options="[
                {label:'Produtor', value:'produtor'},
                {label:'Indústria', value:'industria'},
                {label:'Tenho interesse em produzir', value:'interessado'}
              ]"
              emit-value
              option-label="label"
              option-value="value"
              outlined
              rounded
              label="Selecione seu tipo de usuário"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:User" size="md" />
              </template>
            </q-select>
              <div v-if="item.tipo_usuario === 'industria'" class="flex justify-start column" style="width: 100%">
                <p class="textInput q-mb-xs">Indústria</p>
              </div>
              <q-select
              v-if="item.tipo_usuario === 'industria'"
                v-model="item.industria"
                dense
                :options="industriaOptions"
                emit-value
                map-options
                option-label="razao_social"
                option-value="id"
                outlined
                rounded
                label ="Selecione a indústria que você trabalha"
                class="inputCard q-mb-xs"
                :rules="[requiredSelectRules]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-factory"  size="md" />
                </template>
              </q-select>
            <div class="row flex flex-center">
              <q-checkbox @update:model-value="setErro = false"  :rules="[requiredRule]" keep-color v-model="checkBValue"  color="primary" />
              <p class="q-mb-none">Aceito as <span style="text-decoration: underline; color: #7BB542">Políticas de Privacidade</span> do site.</p>
            </div>
            <div v-if="setErro == true" style="color: red">Por favor, aceite as políticas de privacidade.</div>
          </q-form>
        </q-card-section>
        <q-card-actions class="flex flex-center column">
          <buttonComponent
            label="Cadastrar"
            style="border-radius: 13px; width: 45%"
            :outline="false"
            no-caps
            type="submit"
            form="cadastroForm"
            class="text-bold q-mb-md"
          />
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { CadastrolInterface, Industria } from 'src/interfaces/interfaces'
import { requiredRule, requiredSelectRules } from 'src/composables/InputRules'
import { QForm, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import usuarioService from '../../services/usuarioService'
import { GetErrorMessage } from 'src/composables/helper'
import IndustriasService from 'app/services/industriasService'
export default defineComponent({
  name: 'CadastroComponent',
  components: {
    buttonComponent
  },
  setup () {
    const $q = useQuasar()
    const cadastroForm = ref<null | QForm>(null)
    const loading = ref(false)
    const router = useRouter()
    const setErro = ref(false)
    const industriaOptions = ref<Array<Industria>>()
    const item = reactive({}) as CadastrolInterface
    const checkBValue = ref<boolean>(false)

    const register = async () => {
      loading.value = true
      const isValid = await cadastroForm.value?.validate()
      if (isValid && checkBValue.value !== false) {
        item.privacidade = checkBValue.value
        if (item.tipo_usuario === 'produtor') {
          localStorage.setItem('produtor', JSON.stringify(item))
          router.push({ name: 'CadProdutor' })
        } else if (item.tipo_usuario === 'interessado') {
          localStorage.setItem('interessado', JSON.stringify(item))
          router.push({ name: 'CadInteressado' })
        } else {
          const usuario = await usuarioService.newUser(item).catch(erro => {
            $q.notify({
              color: 'negative',
              message: GetErrorMessage(erro)
            })
          })
          if (usuario) {
            $q.notify({
              color: 'secondary',
              message: 'Cadastro feito com sucesso por favor, faça Login para acessar a plataforma'
            })
            router.push({ name: 'login' })
          }
        }
      } else {
        setErro.value = true
      }
    }

    const getIndustia = async () => {
      loading.value = true
      const industriaResp = await IndustriasService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })
      if (industriaResp) {
        industriaOptions.value = industriaResp.data
      }
    }

    onMounted(() => {
      getIndustia()
    })

    return {
      cadastroForm,
      router,
      item,
      setErro,
      checkBValue,
      industriaOptions,
      requiredRule,
      requiredSelectRules,
      register
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
</style>
