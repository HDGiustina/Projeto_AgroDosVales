<template>
  <q-card style="width: 40%">
        <q-card-section >
          <q-form id="cadastroProdutorForm" ref="cadastroProdutorForm" @submit="register" style="width: 100%" class=" column flex flex-center">
            <p class="text-h5 text-black text-bold q-mt-md">Ola, seja bem vindo!</p>
            <div class="flex justify-start column" style="width: 79%">
              <p class="textInput q-mb-xs">Número de telefone</p>
            </div>
            <q-input
              v-model="item.telefone"
              dense
              outlined
              rounded
              unmasked-value
              mask="(##) #####-####"
              placeholder="Insira seu número de telefone"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Whats" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79%">
              <p class="textInput q-mb-xs">Localização</p>
            </div>
            <q-input
              v-model="item.cidade"
              dense
              outlined
              rounded
              placeholder="Insira o nome da sua cidade"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:CidadeMarker" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79%">
              <p class="textInput q-mb-xs">CEP</p>
            </div>
            <q-input
              v-model="item.cep"
              dense
              outlined
              rounded
              mask="###.###-##"
              unmasked-value
              placeholder="Insira o seu CEP"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:CepMarker" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start row" style="width: 79%">
              <p class="textInput q-mb-xs">Qual planta bioativa tem interesse</p>
            </div>
            <q-select
              v-model="item.planta_id"
              dense
              :options="plantasOptions"
              map-options
              emit-value
              use-chips
              option-label="nome_popular"
              option-value="id"
              outlined
              remove-chips
              rounded
              multiple
              label="Selecione o(s) tipo(s) de planta bioativa"
              class="inputCard q-mb-xs"
              :rules="[requiredSelectRules]"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="app:Plantas" size="md" />
              </template>
            </q-select>
            <div class="flex justify-start column q-mt-md" style="width: 79%">
              <p class="textInput q-mb-xs">Vincular interesses</p>
            </div>
            <q-select
              v-model="item.interesse_id"
              dense
              :options="InteressesOptions"
              outlined
              option-label="descricao"
              option-value="id"
              emit-value
              map-options
              rounded
              use-chips
              chip-remove
              multiple
              label="Selecione o assunto que é abordado"
              class="inputCard q-mb-xs"
              hide-bottom-space
              :rules="[requiredSelectRules]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Interesses" size="md" />
              </template>
            </q-select>
          </q-form>
        </q-card-section>
        <q-card-actions class="flex flex-center column">
          <buttonComponent
            label="Cadastrar"
            style="border-radius: 13px; width: 45%"
            :outline="false"
            no-caps
            type="submit"
            form="cadastroProdutorForm"
            class="text-bold q-mb-md"
          />
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { Planta, indicacaoInterface, newInteresseInterface } from 'src/interfaces/interfaces'
import { requiredRule, requiredSelectRules } from 'src/composables/InputRules'
import { QForm, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import usuarioService from '../../services/usuarioService'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
import InteresseService from 'app/services/interesseService'
export default defineComponent({
  name: 'CadProdutor',
  components: {
    buttonComponent
  },
  setup () {
    const $q = useQuasar()
    const cadastroProdutorForm = ref<null | QForm>(null)
    const loading = ref(false)
    const router = useRouter()
    const setErro = ref(false)
    const InteressesOptions = ref<Array<indicacaoInterface>>([])
    const item = reactive({}) as newInteresseInterface
    const plantasOptions = ref<Array<Planta>>([])

    const register = async () => {
      loading.value = true
      const isValid = await cadastroProdutorForm.value?.validate()
      if (isValid) {
        if (item.planta_id && item.interesse_id) {
          const interessado = JSON.parse(localStorage.getItem('interessado') || '')
          const plantas = item.planta_id.map(planta => ({ planta_id: planta }))
          const interesses = item.interesse_id.map(interesse => ({ interesse_id: interesse }))

          const dados: newInteresseInterface = {
            nome: interessado.nome,
            estado: 'RS',
            email: interessado.email,
            senha: interessado.senha,
            tipo_usuario: interessado.tipo_usuario,
            telefone: item.telefone,
            cep: item.cep,
            cidade: item.cidade,
            plantas,
            interesses
          }

          const usuarioProdutorResp = await usuarioService.newUser(dados)
          if (usuarioProdutorResp) {
            $q.notify({
              color: 'secondary',
              message: 'Cadastro feito com sucesso por favor, faça Login para acessar a plataforma'
            })
            localStorage.removeItem('interessado')
            router.push({ name: 'login' })
          }
          loading.value = false
        }
      }
    }

    const getPlantas = async () => {
      loading.value = true

      const plantasResp = await PlantasService.getAll().catch(error => {
        $q.notify({
          color: 'negative',
          message: GetErrorMessage(error)
        })
      })
      if (plantasResp) {
        plantasOptions.value = plantasResp.data
      }
    }
    const getInteresses = async () => {
      const getResp = await InteresseService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      })

      if (getResp) {
        InteressesOptions.value = getResp.data
      }
    }

    onMounted(() => {
      getPlantas()
      getInteresses()
    })
    return {
      cadastroProdutorForm,
      router,
      item,
      setErro,
      plantasOptions,
      InteressesOptions,
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
