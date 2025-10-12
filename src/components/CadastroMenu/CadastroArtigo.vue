<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="column q-mt-md q-mr-xl"  style="width: 45%">
        <div v-if="tab === 'editar'"  class="flex justify-start column q-mt-md" style="width: 100%">
          <p style="color: #7BB542" class="textInput text-bold q-mb-xs">Artigo para edição</p>
        </div>
        <q-select
          v-if="tab === 'editar'"
          v-model="editId"
          dense
          outlined
          rounded
          :options="optionsSelect.options"
          option-label="titulo"
          option-value="id"
          emit-value
          bg-color="light-green-1"
          map-options
          use-input
          :loading="loadinFirstSelect"
          input-debounce="0"
          @filter="filterFn"
          @update:model-value="handleInputs"
          label="Informe o artigo que você deseja editar"
          class="inputCard q-mb-xs custom-select"
          :rules="[requiredSelectRules]"
          hide-bottom-space
        >
        </q-select>

        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Título do artigo</p>
        </div>
        <q-input
          v-model="item.titulo"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          placeholder="Insira o título do artigo"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Link </p>
        </div>
        <q-input
          v-model="item.link"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          label="Insira o link para inscrição"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Ultima atualização</p>
        </div>
          <q-input
          v-model="item.updated_at"
          dense
          outlined
          disable
          rounded
          type="date"
          label="De:"
          class="inputCard q-mb-xs col"
          hide-bottom-space
          :rules="[requiredRule]"
          hint="Este campo é preenchido automáticamente"
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Imagem</p>
        </div>
        <q-file
          v-model="item.uploadImg"
          @update:model-value="updateft"
          dense
          accept=".jpg, .jpeg,image/*"
          outlined
          :disable="!targetSelected"
          rounded
          clearable
          label="Insira a capa do artigo"
          hint="Tipos de arquivo suportado: JPEG, PNG"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon name="app:Upload"/>
          </template>
        </q-file>
        <div class="" v-if="setErro2 == true" style="color: red">Campo obrigatório.</div>
        <div class="flex flex-center" v-if="setErro == true" style="color: red">Por favor, insira uma imagem de até 500 Kbytes.</div>
        <q-img
          v-if="mostraImg"
          loading="eager"
          :src="selectImage"
          spinner-color="white"
          fit="contain"
          style="height: 140px"
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
      </div>
      <div class="column"  style="width: 45%; margin-top: 17px">
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
          <p class="textInput text-bold q-mb-xs">Arquivo</p>
        </div>
        <q-file
          v-model="item.uploadArtigo"
          dense
          accept=".pdf"
          outlined
          :disable="!targetSelected"
          rounded
          use-chips
          chip-remove
          label="Selecione o arquivo do artigo"
          hint="Tipos de arquivo suportado: PDF"
          class="inputCard q-mb-xs"
          hide-bottom-space
          style="max-width: 100%"
        >
          <template v-slot:append>
            <q-icon name="app:Upload"/>
          </template>
        </q-file>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Vincular interesses</p>
        </div>
        <q-select
          v-model="item.interesses"
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
          :loading="loading"
          chip-remove
          multiple
          label="Selecione o assunto que é abordado"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-select>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Vincular Planta Bioativa</p>
        </div>
        <q-select
          v-model="item.plantas"
          dense
          :options="plantasOptions"
          emit-value
          map-options
          multiple
          use-chips
          :loading="loading"
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
      <button-component
        :label="tab === 'editar'? 'Salvar edições de artigo' :'Cadastrar novo artigo'"
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
import { Planta, UserInterface, indicacaoInterface, Interesse, Artigo, UpdateFunction } from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, date, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import InteresseService from 'app/services/interesseService'
import PlantasService from 'app/services/plantasService'
import ArtigosService from 'app/services/artigosService'

export default defineComponent({
  name: 'CadastroArtigo',
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
    const item = reactive({}) as Artigo
    const cadastroForm = ref<null | QForm>(null)
    const targetSelected = ref(true)
    const loading = ref(false)
    const loadinFirstSelect = ref(false)
    const $q = useQuasar()
    const editId = ref<number>()
    const plantasOptions = ref<Array<Planta>>([])
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
      if (isValid && (item.link !== '' || item.uploadArtigo !== undefined) && item.uploadImg !== undefined) {
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

          if (item.uploadArtigo instanceof File) {
            item.arquivo = item.uploadArtigo
            delete item.uploadArtigo
          }

          if (item.miniatura !== '') {
            isFormData = true
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const userResp = await ArtigosService.setArtigo(editId.value, item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (userResp) {
            $q.notify({
              message: 'Artigo editado com sucesso',
              color: 'positive'
            })

            targetSelected.value = false
            item.titulo = ''
            item.descricao = ''
            item.link = ''
            item.miniatura = ''
            item.miniatura = ''
            item.updated_at = ''
            item.criado_por = ''
            item.plantas = []
            item.interesses = []
            item.uploadImg = undefined
            item.ativo = false
            item.uploadImg = undefined
            selectImage.value = ''
            editId.value = undefined
            mostraImg.value = false
            await getArtigos()
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

          if (item.uploadArtigo instanceof File) {
            item.arquivo = item.uploadArtigo
            delete item.uploadArtigo
          }

          item.ativo = 1
          const plantaResp = await ArtigosService.newArtigo(item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (plantaResp) {
            $q.notify({
              message: 'Artigo cadastrado com sucesso',
              color: 'positive'
            })

            targetSelected.value = true
            item.titulo = ''
            item.descricao = ''
            item.link = ''
            item.miniatura = ''
            item.arquivo = ''
            item.updated_at = ''
            item.criado_por = ''
            item.plantas = []
            item.arquivo = ''
            item.interesses = []
            item.ativo = false
            item.uploadImg = undefined
            selectImage.value = ''
            editId.value = undefined
            mostraImg.value = false
          }
        }
      } else {
        setErro2.value = true
        loading.value = false
        $q.notify({
          message: 'Por favor insira um link ou faça o upload de um arquivo pdf para poder cadastrar um artigo',
          color: 'warning'
        })
      }
    }

    const getArtigos = async () => {
      loadinFirstSelect.value = true

      const getResp = await ArtigosService.getAll({ loadRelationsArtigo: true, ativo: false }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })

      if (getResp) {
        optionsSelect.lista = getResp.data
      }
      loadinFirstSelect.value = false
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

    const handleInputs = async (param:number) => {
      if (param != null) {
        const unicResp = await ArtigosService.getArtigo(param, { loadRelationsArtigo: true }).catch(error => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'negative'
          })
        }).finally(() => {
          loading.value = false
        })
        if (unicResp) {
          if (unicResp.data.link === '') {
            item.link = ''
          }
          item.titulo = unicResp.data.titulo
          item.descricao = unicResp.data.descricao
          item.updated_at = date.formatDate(unicResp.data.updated_at, 'YYYY-MM-DD')
          item.plantas = unicResp.data.plantas.map((planta:Planta) => planta.id)
          item.interesses = unicResp.data.interesses.map((interesses:Interesse) => interesses.id)
          item.ativo = unicResp.data.ativo
          UserLogado.nome = unicResp.data.criado_por
          selectImage.value = unicResp.data.miniatura
          mostraImg.value = true
          targetSelected.value = true
          item.link = unicResp.data.link
        }
      }
    }

    watch(() => props.tab, (newVal) => {
      if (newVal === 'editar') {
        targetSelected.value = false
        getArtigos()
        getPlantas()
        getInteresses()
        item.titulo = ''
        item.descricao = ''
        item.link = ''
        item.miniatura = ''
        item.updated_at = ''
        item.criado_por = ''
        item.plantas = []
        item.interesses = []
        item.ativo = false
        item.uploadImg = undefined
        selectImage.value = ''
        editId.value = undefined
        mostraImg.value = false
        UserLogado.nome = ''
      } else {
        targetSelected.value = true
        item.titulo = ''
        item.descricao = ''
        item.link = ''
        item.miniatura = ''
        item.updated_at = ''
        item.criado_por = ''
        item.plantas = []
        item.interesses = []
        item.ativo = false
        item.uploadImg = undefined
        selectImage.value = ''
        editId.value = undefined
        mostraImg.value = false
        const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
        if (userData && typeof userData === 'object') {
          UserLogado.nome = userData.nome || ''
        }
      }
    })

    const updateft = () => {
      setErro2.value = false
      setErro.value = false
      mostraImg.value = true
      if (item.uploadImg) {
        if (item.uploadImg.size > 512000) {
          setErro.value = true
          item.uploadImg = undefined
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

    const filterFn = (val:string, update: UpdateFunction) => {
      if (val === '') {
        update(() => {
          optionsSelect.options = optionsSelect.lista
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        optionsSelect.options = optionsSelect.lista.filter((v: Artigo) => {
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
      updateft,
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
      UserLogado,
      loading,
      loadinFirstSelect,
      selectImage,
      setErro,
      setErro2
    }
  }
})
</script>

<style>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius:7px !important;
  padding-left: 7px;
}

.custom-select .q-field__label {
  color: #7BB542;
}

</style>
