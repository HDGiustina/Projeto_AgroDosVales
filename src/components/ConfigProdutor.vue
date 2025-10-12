<template>
  <q-page>
    <q-form class="" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="row justify-between">
        <div class="column q-mt-md q-mr-xl" style="width:46%">
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
            <template v-slot:prepend>
              <q-icon name="app:Email" size="md"/>
            </template>
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
            <template v-slot:prepend>
              <q-icon name="app:Lock" size="md"/>
            </template>
          </q-input>
          <div class="row">
            <div class="flex justify-start column q-mt-md" style="width: 100%">
              <p class="textInput q-mb-xs" style="font-weight: 600">CEP</p>
            </div>
            <q-input
              v-model="item.cep"
              dense
              outlined
              rounded
              mask="#####-###"
              unmasked-value
              placeholder="Insira o seu CEP"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="app:CepMarker" size="md"/>
              </template>
            </q-input>
          </div>
          <div class="row">
            <div class="flex justify-start column q-mt-md" style="width: 100%">
              <p class="textInput q-mb-xs" style="font-weight: 600">Localização</p>
            </div>
            <q-input
              v-model="item.localizacao"
              dense
              outlined
              rounded
              placeholder="Insira o nome da Planta Bioativa"
              class="inputCard q-mb-xs"
              hide-bottom-space
            />
          </div>
        </div>
        <div class="column" style="width:46%; margin-top: 17px;">
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
            <template v-slot:prepend>
              <q-icon name="app:Credentials" size="md"/>
            </template>
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">Número de telefone</p>
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
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="app:Whats" size="md"/>
            </template>
          </q-input>
          <div class="flex justify-start column q-mt-md" style="width: 100%">
            <p class="textInput q-mb-xs" style="font-weight: 600">Imagem da plantação</p>
          </div>
          <q-file
            v-model="item.uploadImg"
            @update:model-value="updateft"
            dense
            accept=".jpg, .jpeg,image/*"
            outlined
            rounded
            clearable
            label="Selecione a imagem da planta"
            hint="Tipos de arquivo suportado: JPEG, PNG"
            class="inputCard q-mb-xs"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon name="app:Upload"/>
            </template>
          </q-file>
          <q-img
            loading="eager"
            v-if="mostraImg"
            :src="fotoPlantacao"
            spinner-color="white"
            fit="contain"
            style="height: 130px"
          />
        </div>
      </div>
      <div class="q-mb-md">
        <div>
          <div class="q-my-lg justify-center">
            <q-card flat>
              <q-card-section>
                <div class="row justify-center">
                  <div class="col-4">Planta</div>
                  <div class="col-4">Produção estimada (Kg)</div>
                  <div class="col-3">Data estimada</div>
                </div>
              </q-card-section>
              <div class="custom-green-line"></div>
            </q-card>
          </div>
        </div>
        <div>
          <div class="q-my-sm" v-for="(data, index) in plantasProdutor" :key="index">
            <q-card flat>
              <q-card-section>
                <div class="row justify-center q-py-xs"
                     style="border: black 1px solid; border-radius: 10px; display:flex; align-items: center">
                  <div class="col-4  flex flex-center">
                    <q-select
                      dense
                      style="width: 90%"
                      v-model="data.planta_id"
                      :options="plantasOptions"
                      option-label="nome_popular"
                      option-value="id"
                      emit-value
                      map-options
                    >
                      <template v-slot:prepend>
                        <q-icon name="app:Plantas" size="md"/>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-4 flex flex-center">
                    <q-input
                      v-model="data.producao_est"
                      dense
                      style="width: 90%"
                      placeholder="Insira a estimativa deste plantio"
                    >
                      <template v-slot:prepend>
                        <q-icon name="app:Halter" size="md"/>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-3 flex flex-center">
                    <q-input
                      v-model="data.data_entrega_est"
                      style="width: 80%"
                      type="date"
                      dense
                      placeholder="Insira a estimativa de entrega da sua produção"
                    >
                      <template v-slot:prepend>
                        <q-icon name="app:CalendarEntrega" size="md"/>
                      </template>
                    </q-input>
                  </div>
                  <q-btn @click="removeVinculo(index)" color="primary" icon="mdi-delete" round size="sm"
                         class="justify-end">
                    <q-tooltip>Excluir planta</q-tooltip>
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="q-my-sm">
            <q-card flat>
              <q-card-section>
                <div class="row">
                  <div class="col-2 flex justify-center">
                    <q-btn @click="addVinculo" round icon="mdi-plus" color="primary" class="q-mr-sm">
                      <q-tooltip>Adicionar planta</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
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
import { CadastrolInterface, NovoCadastroInterface, Planta, PlantasProdutor } from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { date, QForm, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
import UsuarioService from 'app/services/usuarioService'
import { useStyledScrollArea } from 'src/composables/StyledScrollArea'

export default defineComponent({
  name: 'ConfigProdutor',
  components: {
    buttonComponent
  },
  setup () {
    const item = reactive({}) as CadastrolInterface
    const cadastroForm = ref<null | QForm>(null)
    const plantasOptions = ref<Array<Planta>>([])
    const userDados = reactive({}) as CadastrolInterface
    const loading = ref(false)
    const $q = useQuasar()
    const fotoPlantacao = ref<string>('')
    const mostraImg = ref<boolean>(false)
    const visible = ref(false)
    const { thumbStylePerso, barStyle } = useStyledScrollArea()
    const plantasProdutor = ref<PlantasProdutor[]>([])

    const registrar = async () => {
      loading.value = true

      if (item.uploadImg instanceof File) {
        item.miniatura = item.uploadImg
        delete item.uploadImg
      }

      const isValid = await cadastroForm.value?.validate()
      if (isValid) {
        const plantasFiltradas = plantasProdutor.value.filter(planta => planta.planta_id !== undefined)
        const dados: NovoCadastroInterface = {
          id: item.id,
          nome: item.nome,
          email: item.email,
          localizacao: item.localizacao,
          senha: item.senha,
          miniatura: item.miniatura,
          telefone: item.telefone,
          cep: item.cep,
          plantas: plantasFiltradas
        }
        let isFormData = false
        if (item.miniatura !== undefined) {
          isFormData = true
        }

        const userResp = await UsuarioService.setUser(item.id, dados, isFormData).catch(error => {
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

    const getPlantas = async () => {
      loading.value = true

      const getResp = await PlantasService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (getResp) {
        plantasOptions.value = getResp.data
      }
    }

    const getUser = async (param: number) => {
      const unicUserResp = await UsuarioService.getUser(param, { loadRelationsUsuario: true }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })
      if (unicUserResp) {
        plantasProdutor.value = unicUserResp.data.plantas.map((planta: PlantasProdutor) => {
          return {
            planta_id: planta.planta_id,
            producao_est: planta.producao_est,
            data_entrega_est: date.formatDate(planta.data_entrega_est, 'YYYY-MM-DD')
          }
        })
        item.id = unicUserResp.data.id
        item.email = unicUserResp.data.email
        item.localizacao = unicUserResp.data.cidade
        item.nome = unicUserResp.data.nome
        item.telefone = unicUserResp.data.telefone
        userDados.plantas = unicUserResp.data.plantas
        item.cep = unicUserResp.data.cep
        fotoPlantacao.value = unicUserResp.data.miniatura
        mostraImg.value = true
      }
    }

    const updateft = () => {
      mostraImg.value = true
      if (item.uploadImg) {
        fotoPlantacao.value = URL.createObjectURL(item.uploadImg)
      }
    }

    const addVinculo = () => {
      plantasProdutor.value.push({
        planta_id: undefined,
        producao_est: undefined,
        data_entrega_est: undefined
      })
    }
    const removeVinculo = (index: number) => {
      plantasProdutor.value.splice(index, 1)
    }

    onMounted(async () => {
      visible.value = true
      const user = await JSON.parse(localStorage.getItem('usuario') || '{}')
      await getPlantas()
      await getUser(user.id)
      visible.value = false
    })

    return {
      addVinculo,
      removeVinculo,
      plantasProdutor,
      requiredRule,
      registrar,
      updateft,
      cadastroForm,
      mostraImg,
      fotoPlantacao,
      plantasOptions,
      thumbStylePerso,
      barStyle,
      item,
      loading,
      visible
    }
  }
})
</script>

<style>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 7px !important;
  padding-left: 7px;
}

.custom-green-line {
  height: 4px;
  background-color: #55B957;
}
</style>
