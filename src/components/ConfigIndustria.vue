<template>
  <q-page>
    <q-form class="" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="row justify-between">
        <div class="column q-mt-md q-mr-xl"  style="width:46%">
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">E-mail</p>
          </div>
          <q-input
            v-model="item.email"
            dense
            outlined
            rounded
            placeholder="Insira seu e-mail aqui"
            class="inputCard q-mb-xs"
            :rules="[requiredRule]"
            hide-bottom-space
          >
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">Senha</p>
          </div>
          <q-input
            v-model="item.senha"
            dense
            outlined
            rounded
            placeholder="Crie uma senha"
            class="inputCard q-mb-xs"
            hide-bottom-space
          >
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput text-bold q-mb-xs">Localização</p>
          </div>
          <q-input
            v-model="item.localizacao"
            dense
            outlined
            rounded
            readonly
            placeholder="Insira a cidade"
            class="inputCard q-mb-xs"
            :rules="[requiredRule]"
            hide-bottom-space
          />
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput text-bold q-mb-xs">Vincular interesses</p>
          </div>
          <q-select
            v-model="item.interesse"
            dense
            :options="InteressesOptions"
            outlined
            option-label="descricao"
            option-value="id"
            emit-value
            map-options
            readonly
            rounded
            use-chips
            :loading="loading"
            chip-remove
            multiple
            label="Selecione o assunto que é abordado"
            class="inputCard q-mb-xs"
            hide-bottom-space
          >
          </q-select>
        </div>
        <div class="column"  style="width:46%; margin-top: 17px; margin-bottom: 4%">
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">Nome</p>
          </div>
          <q-input
            v-model="item.nome"
            dense
            outlined
            rounded
            placeholder="Insira seu nome completo"
            class="inputCard q-mb-xs"
            :rules="[requiredRule]"
            hide-bottom-space
          >
          </q-input>
          <div class="flex justify-start column q-mt-md">
            <p class="textInput text-bold q-mb-xs">Link </p>
          </div>
          <q-input
            v-model="item.link"
            dense
            outlined
            readonly
            rounded
            label="Insira o link do site da empresa"
            class="inputCard q-mb-xs"
            hide-bottom-space
          >
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">CEP</p>
          </div>
          <q-input
            v-model="item.cep"
            dense
            outlined
            readonly
            rounded
            mask="###.###-##"
            unmasked-value
            placeholder="Insira o seu CEP"
            class="inputCard q-mb-xs"
            :rules="[requiredRule]"
            hide-bottom-space
          >
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">Planta bioativa</p>
          </div>
            <q-select
              v-model="item.plantas"
              dense
              :options="plantasOptions"
              emit-value
              map-options
              multiple
              readonly
              use-chips
              chip-remove
              :loading="loading"
              option-label="nome_popular"
              option-value="id"
              outlined
              rounded
              label="Selecione a planta que é utilizada"
              hide-bottom-space
              class="inputCard q-mb-xs"
            >
            </q-select>
        </div>
      </div>
      <div class="flex flex-center">
        <button-component
          label="Salvar alterações de cadastro"
          :outline="false" class="text-bold"
          nocaps
          style="font-size: 16px; width: 25vw; border-radius: 12px; margin-bottom: 4%"
          type="submit"
          form="cadastroForm"
        />
      </div>
    </q-form>
    <q-inner-loading
      color="primary"
      :showing="visible"
      label="Por favor aguarde um instante, estamos trazendo suas iformações"
      label-class="text-teal"
      label-style="font-size: 1.3em"
    />
  </q-page>
</template>

<script lang="ts">
import { requiredRule } from 'src/composables/InputRules'
import { newIndustriaInterface, Planta, Interesse } from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
import UsuarioService from 'app/services/usuarioService'
import InteresseService from 'app/services/interesseService'

export default defineComponent({
  name: 'ConfigIndustria',
  components: {
    buttonComponent
  },
  setup () {
    const item = reactive({}) as newIndustriaInterface
    const cadastroForm = ref<null | QForm>(null)
    const plantasOptions = ref<Array<Planta>>([])
    const userDados = reactive({}) as newIndustriaInterface
    const InteressesOptions = ref<Array<Interesse>>([])
    const loading = ref(false)
    const $q = useQuasar()
    const visible = ref(false)

    const registrar = async () => {
      loading.value = true

      const isValid = await cadastroForm.value?.validate()
      if (isValid) {
        if (item.id) {
          const userResp = await UsuarioService.setUser(item.id, item).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (userResp) {
            $q.notify({
              message: 'Usuário editado com sucesso',
              color: 'positive'
            })
          }
        }
      }
    }

    const getPlantas = async () => {
      const getResp = await PlantasService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      })

      if (getResp) {
        plantasOptions.value = getResp.data
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

    const getUser = async (param:number) => {
      const unicUserResp = await UsuarioService.getUser(param, { loadRelationsUsuario: true }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })
      if (unicUserResp) {
        item.id = unicUserResp.data.id
        item.email = unicUserResp.data.email
        item.localizacao = unicUserResp.data.cidade
        item.plantas = unicUserResp.data.plantas
        item.interesse = unicUserResp.data.interesses
        item.nome = unicUserResp.data.nome
        userDados.plantas = unicUserResp.data.plantas
        item.cep = unicUserResp.data.cep
      }
    }

    onMounted(async () => {
      visible.value = true
      const user = await JSON.parse(localStorage.getItem('usuario') || '{}')
      await getInteresses()
      await getPlantas()
      await getUser(user.id)
      visible.value = false
    })

    return {
      requiredRule,
      registrar,
      cadastroForm,
      plantasOptions,
      InteressesOptions,
      item,
      loading,
      visible
    }
  }
})
</script>

<style>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius:7px !important;
  padding-left: 7px;
}
</style>
