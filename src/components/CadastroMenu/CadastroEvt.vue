<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="column q-mt-md q-mr-xl" style="width: 45%">
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p style="color: #7BB542" class="textInput text-bold q-mb-xs">Evento para edição</p>
        </div>
        <q-select
          v-if="tab === 'editar'"
          :loading="loadinFirstSelect"
          v-model="editId"
          dense
          outlined
          bg-color="light-green-1"
          rounded
          :options="optionsSelect.options"
          option-label="titulo"
          option-value="id"
          emit-value
          map-options
          use-input
          input-debounce="0"
          @filter="filterFn"
          @update:model-value="handleInputs"
          style="color: #7BB542"
          label="Informe o evento que você deseja editar"
          class="inputCard q-mb-xs custom-select"
          :rules="[requiredSelectRules]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Título do evento</p>
        </div>
        <q-input
          v-model="item.titulo"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          placeholder="Insira o título do evento"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Data de realização</p>
        </div>
        <q-input
          v-model="item.data_realizacao"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          label="Selecione a data que o evento será realizado"
          type="date"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        ></q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Descrição</p>
        </div>
        <q-input
          v-model="item.descricao"
          dense
          outlined
          type="textarea"
          :disable="!targetSelected"
          rounded
          placeholder="Insira uma breve descrição"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Duração</p>
        </div>
        <q-input
          v-model="item.duracao"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          placeholder="Insira a duração (horas)"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Vincular Planta Bioativa</p>
        </div>
        <q-select
          :loading="loading"
          v-model="item.plantas"
          dense
          :options="plantasOptions"
          emit-value
          map-options
          multiple
          use-chips
          chip-remove
          option-label="nome_popular"
          option-value="id"
          outlined
          rounded
          label="Selecione a planta que é utilizada"
          hide-bottom-space
          class="inputCard q-mb-xs"
          :disable="!targetSelected"
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Usuário do cadastro</p>
        </div>
        <q-input
          v-model="UserLogado.nome"
          dense
          outlined
          rounded
          disable
          class="inputCard q-mb-lg"
          hide-bottom-space
        />
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Status</p>
        </div>
        <div v-if="tab === 'editar'" class="d-flex justify-between items-center">
          <label class="text-bold" :style="item.ativo === false? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-left">Inativo</label>
          <q-toggle
            v-model="item.ativo"
            :disable="!targetSelected"
            id="toggle-left"
            color="#7BB542"
          />
          <label class="text-bold" :style="item.ativo === true? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-right">Ativo</label>
        </div>
      </div>
      <div class="column" style="width: 45%; margin-top: 34px">
        <div class="flex justify-start column" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Período de inscrição</p>
        </div>
        <div class="row q-gutter-lg">
          <q-input
            v-model="item.inscricao_de"
            dense
            outlined
            :disable="!targetSelected"
            rounded
            type="date"
            label="De:"
            class="inputCard q-mb-xs col"
            hide-bottom-space
            :rules="[requiredRule]"
          />
          <q-input
            v-model="item.inscricao_ate"
            dense
            outlined
            :disable="!targetSelected"
            rounded
            type="date"
            label="Até:"
            class="inputCard q-mb-xs col"
            hide-bottom-space
            :rules="[requiredRule]"
          />

        </div>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Link para incrição</p>
        </div>
        <q-input
          v-model="item.link_inscricao"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          label="Insira o link para inscrição"
          class="inputCard q-mb-xs"
          hide-bottom-space
          :rules="[requiredRule]"
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Local</p>
        </div>
        <q-input
          v-model="item.local"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          label="Insira o local onde o evento será realizado"
          class="inputCard q-mb-xs"
          hide-bottom-space
          :rules="[requiredRule]"
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Vincular interesses</p>
        </div>
        <q-select
          :loading="loading"
          v-model="item.interesses  "
          dense
          :options="InteressesOptions"
          outlined
          option-label="descricao"
          option-value="id"
          emit-value
          map-options
          :disable="!targetSelected"
          rounded
          use-chips
          chip-remove
          multiple
          label="Selecione o assunto que é abordado"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-select>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Imagem</p>
        </div>
        <q-file
          v-model="item.uploadImg"
          @update:model-value="updateftPlanta"
          dense
          accept=".jpg, .jpeg,image/*"
          outlined
          :disable="!targetSelected"
          rounded
          clearable
          label="Insira a capa do evento"
          hint="Tipos de arquivo suportado: JPEG, PNG"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon name="app:Upload"/>
            <q-icon name="app:Upload"/>
          </template>
        </q-file>
        <div class="" v-if="setErro2 == true" style="color: red">Campo obrigatório.</div>
        <div class="flex flex-center" v-if="setErro == true" style="color: red">Por favor, insira uma imagem de até 500 Kbytes.</div>
        <q-img
          v-if="mostraImg"
          :src="selectImage"
          loading="eager"
          spinner-color="white"
          fit="contain"
          style="height: 140px"
        />
      </div>
      <button-component
        :label="tab === 'editar'? 'Salvar edições de evento' :'Cadastrar novo evento'"
        :outline="false" class="text-bold"
        nocaps
        style="font-size: 16px; width: 25vw; border-radius: 12px; margin-bottom: 4%"
        type="submit"
        form="cadastroForm"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { requiredRule, requiredSelectRules, requiredFilesRules } from 'src/composables/InputRules'
import {
  Planta,
  UserInterface,
  Industria,
  indicacaoInterface,
  Evento,
  Interesse,
  UpdateFunction
} from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, date, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import EventosService from 'app/services/eventosService'
import InteresseService from 'app/services/interesseService'
import PlantasService from 'app/services/plantasService'

export default defineComponent({
  name: 'CadastroEvt',
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
    const item = reactive({}) as Evento
    const cadastroForm = ref<null | QForm>(null)
    const targetSelected = ref(true)
    const loading = ref(false)
    const loadinFirstSelect = ref(false)
    const $q = useQuasar()
    const editId = ref<number>()
    const plantasOptions = ref<Array<Industria>>([])
    const InteressesOptions = ref<Array<indicacaoInterface>>([])
    const selectImage = ref<string>('')
    const mostraImg = ref<boolean>(false)
    const setErro = ref(false)
    const setErro2 = ref(false)

    const UserLogado = reactive({
      nome: ''
    }) as UserInterface
    const optionsSelect = reactive({
      lista: [],
      options: []
    })

    const registrar = async () => {
      loading.value = true
      let isFormData = false

      const isValid = await cadastroForm.value?.validate()
      if (isValid && item.uploadImg !== undefined) {
        if (editId.value) {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.uploadImg instanceof File) {
            item.miniatura = item.uploadImg
            delete item.uploadImg
          }

          if (item.miniatura !== '') {
            isFormData = true
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const userResp = await EventosService.setEvento(editId.value, item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (userResp) {
            $q.notify({
              message: 'Evento editado com sucesso',
              color: 'positive'
            })

            targetSelected.value = false
            item.titulo = ''
            item.data_realizacao = ''
            item.descricao = ''
            item.duracao = undefined
            item.plantas = []
            item.inscricao_de = ''
            item.inscricao_ate = ''
            item.link_inscricao = ''
            item.local = ''
            item.interesses = []
            item.uploadImg = undefined
            item.ativo = false
            item.uploadImg = undefined
            selectImage.value = ''
            editId.value = undefined
            mostraImg.value = false
            await getEventos()
          }
        } else {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.uploadImg instanceof File) {
            item.miniatura = item.uploadImg
            delete item.uploadImg
          }

          if (item.miniatura !== '') {
            isFormData = true
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }
          const plantaResp = await EventosService.newEvento(item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (plantaResp) {
            $q.notify({
              message: 'Evento cadastrado com sucesso',
              color: 'positive'
            })

            targetSelected.value = true
            item.titulo = ''
            item.data_realizacao = ''
            item.descricao = ''
            item.duracao = undefined
            item.plantas = []
            item.inscricao_de = ''
            item.inscricao_ate = ''
            item.link_inscricao = ''
            item.local = ''
            item.interesses = []
            item.uploadImg = undefined
            item.ativo = false
            item.uploadImg = undefined
            selectImage.value = ''
            UserLogado.nome = ''
            editId.value = undefined
            mostraImg.value = false
          }
        }
      } else {
        setErro2.value = true
        loading.value = false
      }
    }

    const getEventos = async () => {
      loadinFirstSelect.value = true

      const plantasResp = await EventosService.getAll({ loadRelationsEvento: true, ativo: false }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      }).finally(() => {
        loadinFirstSelect.value = false
      })

      if (plantasResp) {
        optionsSelect.lista = plantasResp.data
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

    const getInteresses = async () => {
      loading.value = true

      const getResp = await InteresseService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (getResp) {
        InteressesOptions.value = getResp.data
      }
    }

    const handleInputs = async (param: number) => {
      if (param != null) {
        const unicPlantaResp = await EventosService.getEvento(param, { loadRelationsEvento: true }).catch(error => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'negative'
          })
        })
        if (unicPlantaResp) {
          item.titulo = unicPlantaResp.data.titulo
          item.data_realizacao = date.formatDate(unicPlantaResp.data.data_realizacao, 'YYYY-MM-DD')
          item.descricao = unicPlantaResp.data.descricao
          item.duracao = unicPlantaResp.data.duracao
          item.plantas = unicPlantaResp.data.plantas.map((planta: Planta) => planta.id)
          item.interesses = unicPlantaResp.data.interesses.map((interesses: Interesse) => interesses.id)
          item.inscricao_de = date.formatDate(unicPlantaResp.data.inscricao_de, 'YYYY-MM-DD')
          item.inscricao_ate = date.formatDate(unicPlantaResp.data.inscricao_ate, 'YYYY-MM-DD')
          item.link_inscricao = unicPlantaResp.data.link_inscricao
          item.local = unicPlantaResp.data.local
          item.uploadImg = unicPlantaResp.data.uploadImg
          item.ativo = unicPlantaResp.data.ativo
          item.uploadImg = unicPlantaResp.data.uploadImg
          item.ativo = unicPlantaResp.data.ativo
          UserLogado.nome = unicPlantaResp.data.criado_por
          selectImage.value = unicPlantaResp.data.miniatura
          mostraImg.value = true
          targetSelected.value = true
        }
      }
    }

    watch(() => props.tab, (newVal) => {
      if (newVal === 'editar') {
        targetSelected.value = false
        getEventos()
        getPlantas()
        getInteresses()
        item.titulo = ''
        item.data_realizacao = ''
        item.descricao = ''
        item.duracao = undefined
        item.plantas = []
        item.inscricao_de = ''
        item.inscricao_ate = ''
        item.link_inscricao = ''
        item.local = ''
        item.interesses = []
        item.uploadImg = undefined
        item.ativo = false
        item.uploadImg = undefined
        selectImage.value = ''
        UserLogado.nome = ''
        mostraImg.value = false
        editId.value = undefined
      } else {
        targetSelected.value = true
        item.titulo = ''
        item.data_realizacao = ''
        item.descricao = ''
        item.duracao = undefined
        item.plantas = []
        item.inscricao_de = ''
        item.inscricao_ate = ''
        item.link_inscricao = ''
        item.local = ''
        item.interesses = []
        item.uploadImg = undefined
        item.ativo = false
        item.uploadImg = undefined
        selectImage.value = ''
        mostraImg.value = false
        editId.value = undefined
        const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
        if (userData && typeof userData === 'object') {
          UserLogado.nome = userData.nome || ''
        }
      }
    })

    const updateftPlanta = () => {
      setErro.value = false
      setErro2.value = false
      mostraImg.value = true
      if (item.uploadImg) {
        if (item.uploadImg.size > 512000) {
          item.uploadImg = undefined
          setErro.value = true
          return
        }
        selectImage.value = URL.createObjectURL(item.uploadImg)
      }
    }

    onMounted(() => {
      const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
      if (userData && typeof userData === 'object') {
        UserLogado.nome = userData.nome || ''
      }
      getPlantas()
      getInteresses()
    })
    const filterFn = (val: string, update: UpdateFunction) => {
      if (val === '') {
        update(() => {
          optionsSelect.options = optionsSelect.lista
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        optionsSelect.options = optionsSelect.lista.filter((v: Evento) => {
          if (v.titulo.toLowerCase().includes(needle)) {
            return true
          }
          return false
        })
      })
    }

    return {
      requiredRule,
      requiredSelectRules,
      registrar,
      handleInputs,
      updateftPlanta,
      filterFn,
      requiredFilesRules,
      targetSelected,
      mostraImg,
      cadastroForm,
      editId,
      optionsSelect,
      plantasOptions,
      InteressesOptions,
      item,
      loadinFirstSelect,
      loading,
      UserLogado,
      selectImage,
      setErro,
      setErro2
    }
  }
})
</script>

<style>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 7px !important;
  padding-left: 7px;
}

.custom-select .q-field__label {
  color: #7BB542;
}
</style>
