<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroAdminForm" ref="cadastroAdminForm" @submit="registrar">
      <div class="column q-mt-md q-mr-xl"  style="width: 45%">
        <div v-if="tab === 'editar'"  class="flex justify-start column q-mt-md" style="width: 100%">
          <p style="color: #7BB542" class="textInput text-bold q-mb-xs">Usuário para edição</p>
        </div>
        <q-select
          v-if="tab === 'editar'"
          v-model="userId"
          dense
          outlined
          rounded
          :options="userOptions"
          :loading="loadinFirstSelect"
          option-label="nome"
          option-value="id"
          emit-value
          map-options
          bg-color="light-green-1"
          @update:model-value="handleInputs"
          style="color: #7BB542"
          label="Informe o usuário que você deseja editar"
          class="inputCard q-mb-xs custom-select"
          :rules="[requiredSelectRules]"
          clearable
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Nome completo</p>
        </div>
        <q-input
          v-model="item.nome"
          dense
          outlined
          :disable="!usuarioSelecionado"
          rounded
          placeholder="Insira seu nome completo"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Email</p>
        </div>
        <q-input
          v-model="item.email"
          dense
          outlined
          :disable="!usuarioSelecionado"
          rounded
          placeholder="Insira seu e-mail aqui"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">CEP</p>
        </div>
        <q-input
          v-model="item.cep"
          dense
          outlined
          :disable="!usuarioSelecionado"
          rounded
          mask="###.###-##"
          unmasked-value
          placeholder="Insira o seu CEP"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Status</p>
        </div>
        <div v-if="tab === 'editar'" class="d-flex justify-between items-center">
          <label class="text-bold" :style="item.ativo === false? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-left">Inativo</label>
          <q-toggle
            v-model="item.ativo"
            :disable="!usuarioSelecionado"
            id="toggle-left"
            color="#7BB542"
          />
          <label class="text-bold" :style="item.ativo === true? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-right">Ativo</label>
        </div>
      </div>
      <div class="column"  style="width: 45%; margin-top: 34px">
        <div class="flex justify-start column" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Validade do usuário</p>
        </div>
        <q-input
          v-model="item.validade"
          dense
          outlined
          :disable="!usuarioSelecionado"
          rounded
          type="date"
          placeholder="Insira o período de validade do usuário"
          class="inputCard q-mb-xs"
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Senha</p>
        </div>
        <q-input
          v-model="item.senha  "
          dense
          outlined
          :disable="!usuarioSelecionado"
          rounded
          :placeholder="tab === 'editar'? 'Insira uma nova senha caso queira editar' : 'Insira uma senha'"
          class="inputCard q-mb-xs"
          :rules="tab === 'editar'? [] : [requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Localização</p>
        </div>
        <q-input
          v-model="item.cidade"
          dense
          outlined
          rounded
          :disable="!usuarioSelecionado"
          placeholder="Insira o nome da sua cidade"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Número de telefone</p>
        </div>
        <q-input
          v-model="item.telefone"
          dense
          outlined
          rounded
          unmasked-value
          :disable="!usuarioSelecionado"
          mask="(##) #####-####"
          placeholder="Insira seu número de telefone"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
        >
        </q-input>
      </div>
      <button-component
        :label="tab === 'editar'? 'Salvar edições de usuário' :'Cadastrar usuário administrador'"
        :outline="false" class="text-bold"
        nocaps
        style="margin-bottom: 3% ;font-size: 16px; width: 25vw; border-radius: 12px"
        type="submit"
        form="cadastroAdminForm"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { requiredRule, requiredSelectRules } from 'src/composables/InputRules'
import { CadastrolInterface, UserInterface } from 'src/interfaces/interfaces'
import { defineComponent, reactive, ref, watch } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, useQuasar } from 'quasar'
import UsuarioService from 'app/services/usuarioService'
import { GetErrorMessage } from 'src/composables/helper'

export default defineComponent({
  name: 'CadastroAdmin',
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  components: {
    buttonComponent
  },
  setup (props) {
    const item = reactive({}) as CadastrolInterface
    const cadastroAdminForm = ref<null | QForm>(null)
    const usuarioSelecionado = ref(true)
    const loading = ref(false)
    const loadinFirstSelect = ref(false)
    const userOptions = ref<Array<UserInterface>>([])
    const $q = useQuasar()
    const userId = ref<number>()

    const registrar = async () => {
      loading.value = true

      const isValid = await cadastroAdminForm.value?.validate()
      if (isValid) {
        if (userId.value) {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const userResp = await UsuarioService.setUser(userId.value, item).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })
          if (userResp) {
            $q.notify({
              message: 'Usuário editado com sucesso',
              color: 'positive'
            })
            usuarioSelecionado.value = true
            item.email = ''
            item.nome = ''
            item.validade = ''
            item.senha = ''
            item.cep = ''
            item.cidade = ''
            item.telefone = ''
            item.ativo = false
            userId.value = undefined
            getUsers()
          }
        } else {
          item.tipo_usuario = 'admin'
          item.estado = 'RS'
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const userResp = await UsuarioService.newUser(item).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })
          if (userResp) {
            $q.notify({
              message: 'Usuário cadastrado com sucesso',
              color: 'positive'
            })
            usuarioSelecionado.value = true
            item.email = ''
            item.nome = ''
            item.validade = ''
            item.senha = ''
            item.cep = ''
            item.cidade = ''
            item.telefone = ''
          }
        }
      }
    }

    const getUsers = async () => {
      loadinFirstSelect.value = true

      const userResp = await UsuarioService.getAll({ ativo: false }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      }).finally(() => {
        loadinFirstSelect.value = false
      })

      if (userResp) {
        userOptions.value = userResp.data.filter((user:UserInterface) => user.tipo_usuario === 'admin')
      }
    }

    const handleInputs = async (param:number) => {
      if (param != null) {
        const unicUserResp = await UsuarioService.getUser(param).catch(error => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'negative'
          })
        })
        if (unicUserResp) {
          item.email = unicUserResp.data.email
          item.nome = unicUserResp.data.nome
          item.validade = unicUserResp.data.validade
          item.cep = unicUserResp.data.cep
          item.cidade = unicUserResp.data.cidade
          item.telefone = unicUserResp.data.telefone
          item.ativo = unicUserResp.data.ativo
          usuarioSelecionado.value = true
        }
      }
    }

    watch(() => props.tab, (newVal) => {
      if (newVal === 'editar') {
        usuarioSelecionado.value = false
        getUsers()
        item.email = ''
        item.nome = ''
        item.validade = ''
        item.senha = ''
        item.cep = ''
        item.cidade = ''
        item.telefone = ''
        item.ativo = false
        userId.value = undefined
      } else {
        usuarioSelecionado.value = true
        item.email = ''
        item.nome = ''
        item.validade = ''
        item.senha = ''
        item.cep = ''
        item.cidade = ''
        item.telefone = ''
        userId.value = undefined
      }
    })

    return {
      requiredRule,
      requiredSelectRules,
      registrar,
      handleInputs,
      usuarioSelecionado,
      cadastroAdminForm,
      userId,
      loading,
      loadinFirstSelect,
      userOptions,
      item
    }
  }
})
</script>

<style scoped>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius:7px !important;
  padding-left: 7px;
}

.custom-select .q-field__label {
  color: #7BB542;
}
</style>
