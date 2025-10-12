<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="column q-mt-md q-mr-xl" style="width: 45%">
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p style="color: #7BB542" class="textInput text-bold q-mb-xs">indústria para edição</p>
        </div>
        <q-select
          v-if="tab === 'editar'"
          v-model="editId"
          dense
          outlined
          rounded
          :options="optionsSelect.options"
          option-label="fantasia"
          option-value="id"
          emit-value
          map-options
          use-input
          bg-color="light-green-1"
          :loading="loadinFirstSelect"
          input-debounce="0"
          @filter="filterFn"
          @update:model-value="handleInputs"
          style="color: #7BB542"
          label="Informe a indústria que você deseja editar"
          class="inputCard q-mb-xs custom-select"
          :rules="[requiredSelectRules]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Razão Social</p>
        </div>
        <q-input
          v-model="item.razao_social"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          placeholder="Insira a razão social"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Cidade </p>
        </div>
        <q-input
          v-model="item.cidade"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          label="Insira o endereço da indústria"
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
          class="inputCard"
          hide-bottom-space
          :rules="[requiredRule]"
          hint="Este campo é preenchido automáticamente"
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
          label="Insira o link do site da empresa"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Logo</p>
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
          label="Insira o logo da empresa"
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
          :src="selectImage"
          loading="eager"
          spinner-color="white"
          fit="contain"
          style="height: 140px"
        />
      </div>
      <div class="column" style="width: 45%; margin-top: 17px">
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Nome Fantasia</p>
        </div>
        <q-input
          v-model="item.fantasia"
          dense
          outlined
          :disable="!targetSelected"
          rounded
          placeholder="Insira o nome fantasia"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">CEP</p>
        </div>
        <q-input
          v-model="item.cep"
          dense
          outlined
          mask="#####-###"
          :disable="!targetSelected"
          rounded
          placeholder="Insira o CEP da indústria"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
          @blur="consultarCep"
        />
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
          rounded
          use-chips
          :loading="loading"
          chip-remove
          multiple
          label="Selecione os interesses da indústria"
          class="inputCard q-mb-xs"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Contato</p>
        </div>
        <q-input
          v-model="item.contato"
          dense
          outlined
          mask="(##) #####-####"
          unmasked-value
          :disable="!targetSelected"
          rounded
          placeholder="Insira o contato da empresa"
          class="inputCard q-mb-xs"
          :rules="[requiredRule]"
          hide-bottom-space
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
      <button-component
        :label="tab === 'editar'? 'Salvar edições de indústria' :'Cadastrar nova indústria'"
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
import { Planta, UserInterface, Industria, Interesse, UpdateFunction } from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, date, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
import IndustriaService from 'app/services/industriasService'
import InteresseService from 'app/services/interesseService'

export default defineComponent({
  name: 'CadastroIndustria',
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
    const item = reactive({}) as Industria
    const cadastroForm = ref<null | QForm>(null)
    const targetSelected = ref(true)
    const loading = ref(false)
    const loadinFirstSelect = ref(false)
    const $q = useQuasar()
    const editId = ref<number>()
    const plantasOptions = ref<Array<Planta>>([])
    const InteressesOptions = ref<Array<Interesse>>([])
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
        setErro2.value = false
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

          const userResp = await IndustriaService.setIndustria(editId.value, item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (userResp) {
            $q.notify({
              message: 'Industria editada com sucesso',
              color: 'positive'
            })

            targetSelected.value = false
            item.razao_social = ''
            item.cidade = ''
            item.updated_at = ''
            item.link = ''
            item.uploadImg = undefined
            mostraImg.value = false
            selectImage.value = ''
            item.miniatura = ''
            item.fantasia = ''
            item.cep = ''
            item.plantas = []
            item.interesses = []
            item.contato = ''
            item.uploadImg = undefined
            item.ativo = false
            editId.value = undefined
            UserLogado.nome = ''
            await getIndustrias()
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

          item.ativo = 1
          item.estado = 'RS'
          item.localizacao = item.cidade + '-' + item.estado
          const plantaResp = await IndustriaService.newIndustria(item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          }).finally(() => {
            loading.value = false
          })

          if (plantaResp) {
            $q.notify({
              message: 'Industria cadastrada com sucesso',
              color: 'positive'
            })

            targetSelected.value = true
            item.razao_social = ''
            item.cidade = ''
            item.updated_at = ''
            item.link = ''
            item.uploadImg = undefined
            mostraImg.value = false
            selectImage.value = ''
            item.miniatura = ''
            item.fantasia = ''
            item.cep = ''
            item.plantas = []
            item.interesses = []
            item.contato = ''
            item.uploadImg = undefined
            item.ativo = false
            editId.value = undefined
            UserLogado.nome = ''
          }
        }
      } else {
        setErro2.value = true
        loading.value = false
      }
    }

    const getIndustrias = async () => {
      loadinFirstSelect.value = true

      const getResp = await IndustriaService.getAll({ loadRelationsIndustria: true, ativo: false }).catch(error => {
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

    const handleInputs = async (param: number) => {
      if (param != null) {
        const unicResp = await IndustriaService.getIndustria(param, { loadRelationsIndustria: true }).catch(error => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'negative'
          })
        }).finally(() => {
          loading.value = false
        })
        if (unicResp) {
          item.razao_social = unicResp.data.razao_social
          item.cidade = unicResp.data.localizacao
          item.updated_at = date.formatDate(unicResp.data.updated_at, 'YYYY-MM-DD')
          item.link = unicResp.data.link
          mostraImg.value = true
          selectImage.value = unicResp.data.miniatura
          item.fantasia = unicResp.data.fantasia
          item.cep = unicResp.data.cep
          item.plantas = unicResp.data.plantas.map((planta: Planta) => planta.id)
          item.interesses = unicResp.data.interesses.map((interesse: Interesse) => interesse.id)
          item.contato = unicResp.data.contato
          item.ativo = unicResp.data.ativo
          UserLogado.nome = unicResp.data.criado_por
          targetSelected.value = true
        }
      }
    }

    const consultarCep = async () => {
      if (!item.cep) {
        $q.notify({
          message: 'Informe o CEP antes de fazer a consulta.',
          color: 'warning'
        })
        return
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${item.cep}/json/`)
        const data = await response.json()
        if (data.uf === 'RS') {
          item.endereco = data.logradouro + ', ' + data.complemento
        } else {
          $q.notify({
            message: 'Apenas endereços no Rio Grande do Sul são permitidos.',
            color: 'warning'
          })
        }
      } catch (error) {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      }
    }

    watch(() => props.tab, (newVal) => {
      if (newVal === 'editar') {
        targetSelected.value = false
        getIndustrias()
        getPlantas()
        getInteresses()
        item.razao_social = ''
        item.cidade = ''
        item.updated_at = ''
        item.link = ''
        item.uploadImg = undefined
        mostraImg.value = false
        selectImage.value = ''
        item.miniatura = ''
        item.fantasia = ''
        item.cep = ''
        item.plantas = []
        item.interesses = []
        item.contato = ''
        item.uploadImg = undefined
        item.ativo = false
        editId.value = undefined
        UserLogado.nome = ''
      } else {
        targetSelected.value = true
        item.razao_social = ''
        item.cidade = ''
        item.updated_at = ''
        item.link = ''
        item.uploadImg = undefined
        mostraImg.value = false
        selectImage.value = ''
        item.miniatura = ''
        item.fantasia = ''
        item.cep = ''
        item.plantas = []
        item.interesses = []
        item.contato = ''
        item.uploadImg = undefined
        item.ativo = false
        editId.value = undefined
        const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
        if (userData && typeof userData === 'object') {
          UserLogado.nome = userData.nome || ''
        }
      }
    })

    const updateft = () => {
      setErro.value = false
      setErro2.value = false
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

    const filterFn = (val: string, update: UpdateFunction) => {
      if (val === '') {
        update(() => {
          optionsSelect.options = optionsSelect.lista
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        optionsSelect.options = optionsSelect.lista.filter((v: Industria) => {
          if (v.fantasia.toLowerCase().includes(needle)) {
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
      consultarCep,
      targetSelected,
      mostraImg,
      cadastroForm,
      editId,
      optionsSelect,
      plantasOptions,
      item,
      UserLogado,
      loading,
      loadinFirstSelect,
      InteressesOptions,
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
