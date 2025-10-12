<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroPlantasForm" ref="cadastroPlantasForm" @submit="registrar">
      <div class="column q-mt-md q-mr-xl" style="width: 45%">
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p style="color: #7BB542" class="textInput text-bold q-mb-xs">Planta para edição</p>
        </div>
        <q-select
          v-if="tab === 'editar'"
          v-model="plantaId"
          dense
          outlined
          :loading="loadinFirstSelect"
          rounded
          :options="plantasOptions.options"
          option-label="nome_popular"
          option-value="id"
          emit-value
          map-options
          use-input
          bg-color="light-green-1"
          input-debounce="0"
          @filter="filterFn"
          @update:model-value="handleInputs"
          style="color: #7BB542"
          label="Informe a planta que você deseja editar"
          class="inputCard q-mb-xs custom-select"
          :rules="[requiredSelectRules]"
          hide-bottom-space
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Nome científico</p>
        </div>
        <q-input
          v-model="item.nome_cientifico"
          dense
          outlined
          :disable="!plantaSelecionada"
          rounded
          placeholder="Insira o nome científico da planta bioativa"
          class="inputCard q-mb-xs text-italic"
          :rules="[requiredRule]"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Sinonímia</p>
        </div>
        <q-input
          v-model="item.sinonimia"
          dense
          outlined
          :disable="!plantaSelecionada"
          rounded
          placeholder="Insira a Sinonímia da planta bioativa"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Indicações de uso</p>
        </div>
        <q-select
          v-model="item.indicacoes"
          dense
          :options="indicacoesOptions"
          outlined
          :loading="loading"
          option-label="descricao"
          option-value="id"
          emit-value
          map-options
          :disable="!plantaSelecionada"
          use-chips
          multiple
          rounded
          label="Insira as indicações de uso da planta bioativa"
          class="inputCard q-mb-xs"
          hide-bottom-space
          style="max-width: 100%"
          chip-remove
        >
        </q-select>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Imagem da planta</p>
        </div>
        <q-file
          v-model="item.uploadImg"
          @update:model-value="updateftPlanta"
          dense
          accept=".jpg, .jpeg,image/*"
          outlined
          :disable="!plantaSelecionada"
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
        <div class="" v-if="setErro2 == true" style="color: red">Campo obrigatório.</div>
        <div class="flex flex-center" v-if="setErro == true" style="color: red">Por favor, insira uma imagem de até 500
          Kbytes.
        </div>
        <q-img
          v-if="mostraImg"
          :src="fotoPlanta"
          loading="eager"
          spinner-color="white"
          fit="contain"
          style="height: 140px"
        />
      </div>
      <div class="column" style="width: 45%; margin-top: 34px">
        <div class="flex justify-start column" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Nome popular</p>
        </div>
        <q-input
          v-model="item.nome_popular"
          dense
          outlined
          :disable="!plantaSelecionada"
          rounded
          placeholder="Insira o nome popular da planta bioativa"
          class="inputCard q-mb-xs"
          hide-bottom-space
          :rules="[requiredRule]"
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Autor</p>
        </div>
        <q-input
          v-model="item.autor"
          dense
          outlined
          :disable="!plantaSelecionada"
          rounded
          placeholder="Insira o nome do autor da planta bioativa"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-input>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Contra indicações</p>
        </div>
        <q-select
          v-model="item.contraindicacoes"
          dense
          :options="contraIndicacoesOptions"
          outlined
          :loading="loading"
          option-label="descricao"
          option-value="id"
          emit-value
          map-options
          :disable="!plantaSelecionada"
          use-chips
          multiple
          rounded
          label="Insira as contra indicações de uso da planta bioativa"
          class="inputCard q-mb-xs"
          hide-bottom-space
          style="max-width: 100%"
          chip-remove
        />
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Indústrias</p>
        </div>
        <q-select
          v-model="item.industrias"
          dense
          :loading="loading"
          :options="industriaOptions"
          outlined
          option-label="fantasia"
          option-value="id"
          emit-value
          map-options
          :disable="!plantaSelecionada"
          rounded
          use-chips
          chip-remove
          multiple
          label="Selecione as indústrias que utilizam esta Planta"
          class="inputCard q-mb-xs"
          hide-bottom-space
        >
        </q-select>
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Usuário do cadastro</p>
        </div>
        <q-input
          v-model="userCad.nome"
          dense
          outlined
          rounded
          disable
          class="inputCard q-mb-md"
          hide-bottom-space
        >
        </q-input>
        <div v-if="tab === 'editar'" class="flex justify-start column q-mt-md" style="width: 100%">
          <p class="textInput text-bold q-mb-xs">Status</p>
        </div>
        <div v-if="tab === 'editar'" class="d-flex justify-between items-center q-mb-md">
          <label class="text-bold" :style="item.ativo === false? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-left">Inativo</label>
          <q-toggle
            v-model="item.ativo"
            :disable="!plantaSelecionada"
            id="toggle-left"
            color="#7BB542"
          />
          <label class="text-bold" :style="item.ativo === true? 'color: #5A645B' : 'color: #B3B3B3'" for="toggle-right">Ativo</label>
        </div>
      </div>
      <button-component
        :label="tab === 'editar'? 'Salvar edições de plantas' :'Cadastrar planta bioativa'"
        :outline="false" class="text-bold"
        nocaps
        style="margin-bottom: 2%;font-size: 16px; width: 25vw; border-radius: 12px"
        type="submit"
        form="cadastroPlantasForm"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { requiredFilesRules, requiredRule, requiredSelectRules } from 'src/composables/InputRules'
import { indicacaoInterface, Industria, Planta, UpdateFunction, UserInterface } from 'src/interfaces/interfaces'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { QForm, useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
import IndustriasService from 'app/services/industriasService'
import IndicacaoService from 'app/services/indicacaoService'
import ContraindicacaoService from 'app/services/contraindicacaoService'

type PlantaType = {
  id: number;
  indicacoes?: { id: number, descricao: string }[];
  nome_popular: string;
}
type IndicacaoType = {
  id: number;
  descricao: string;
  plantas?: PlantaType[]
}
export default defineComponent({
  name: 'CadastroPlanta',
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
    const item = reactive({}) as Planta
    const cadastroPlantasForm = ref<null | QForm>(null)
    const plantaSelecionada = ref(true)
    const loading = ref(false)
    const loadinFirstSelect = ref(false)
    const $q = useQuasar()
    const plantaId = ref<number>()
    const industriaOptions = ref<Array<Industria>>([])
    const indicacoesOptions = ref<IndicacaoType[]>([])
    const indicacoesLista = ref<IndicacaoType[]>([])
    const contraIndicacoesOptions = ref<IndicacaoType[]>([])
    const contraIndicacoesLista = ref<IndicacaoType[]>([])
    const fotoPlanta = ref<string>('')
    const mostraImg = ref<boolean>(false)
    const setErro = ref(false)
    const setErro2 = ref(false)

    const userCad = reactive({
      nome: ''
    }) as UserInterface
    const plantasOptions = reactive({
      lista: [],
      options: []
    })

    const registrar = async () => {
      loading.value = true
      let isFormData = false

      const isValid = await cadastroPlantasForm.value?.validate()
      console.log('uplimag', item)
      console.log('uplimag', fotoPlanta.value)
      if (isValid && fotoPlanta.value !== '') {
        setErro2.value = false
        if (plantaId.value) {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.uploadImg instanceof File) {
            item.imagem = item.uploadImg
            delete item.uploadImg
          }

          if (item.imagem !== '') {
            isFormData = true
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const userResp = await PlantasService.setPlanta(plantaId.value, item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })

          if (userResp) {
            $q.notify({
              message: 'Planta editada com sucesso',
              color: 'positive'
            })

            plantaSelecionada.value = false
            item.nome_cientifico = ''
            item.indicacoes = []
            item.nome_popular = ''
            item.industrias = []
            item.contraindicacoes = []
            userCad.nome = ''
            item.imagem = ''
            plantaId.value = undefined
            item.uploadImg = undefined
            mostraImg.value = false
            item.ativo = false
            loading.value = false
            getPlantas()
          }
        } else {
          for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key) && item[key as keyof typeof item] === '') {
              delete item[key as keyof typeof item]
            }
          }

          if (item.uploadImg instanceof File) {
            item.imagem = item.uploadImg
            delete item.uploadImg
          }

          if (item.imagem !== '') {
            isFormData = true
          }

          if (item.ativo === true) {
            item.ativo = 1
          } else {
            item.ativo = 0
          }

          const plantaResp = await PlantasService.newPlanta(item, isFormData).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })

          if (plantaResp) {
            $q.notify({
              message: 'Planta cadastrada com sucesso',
              color: 'positive'
            })

            plantaSelecionada.value = true
            item.nome_cientifico = ''
            item.indicacoes = []
            item.nome_popular = ''
            item.industrias = []
            userCad.nome = ''
            item.imagem = ''
            item.uploadImg = undefined
            mostraImg.value = false
            item.ativo = false
            loading.value = false
          }
        }
      } else {
        setErro2.value = true
        loading.value = false
      }
    }

    const getPlantas = async () => {
      loadinFirstSelect.value = true

      const plantasResp = await PlantasService.getAll({ loadRelationsPlanta: true, ativo: false }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negative'
        })
      })

      if (plantasResp) {
        plantasOptions.lista = plantasResp.data
      }
      loadinFirstSelect.value = false
    }

    const getIndustrias = async () => {
      loading.value = true

      const industriaResp = await IndustriasService.getAll().catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (industriaResp) {
        industriaOptions.value = industriaResp.data
      }
    }

    const getIndicacoes = async () => {
      loading.value = true

      const indicacoesResp = await IndicacaoService.getAll({ ativo: true }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (indicacoesResp) {
        indicacoesOptions.value = indicacoesResp.data
      }
    }
    const getContraIndicacoes = async () => {
      loading.value = true

      const contraIndicacoesResp = await ContraindicacaoService.getAll({ ativo: true }).catch(error => {
        $q.notify({
          message: GetErrorMessage(error),
          color: 'negaitve'
        })
      }).finally(() => {
        loading.value = false
      })

      if (contraIndicacoesResp) {
        contraIndicacoesOptions.value = contraIndicacoesResp.data
        contraIndicacoesLista.value = contraIndicacoesResp.data
      }
    }

    const handleInputs = async (param: number) => {
      console.log('here', param)
      if (param != null) {
        const unicPlantaResp = await PlantasService.getPlanta(param, { loadRelationsPlanta: true }).finally(() => {
          item.contraindicacoes = []
          item.indicacoes = []
          getContraIndicacoes()
          getIndicacoes()
          getPlantas()
        }).catch(error => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'negative'
          })
        })
        if (unicPlantaResp) {
          item.ativo = unicPlantaResp.data.ativo
          item.nome_cientifico = unicPlantaResp.data.nome_cientifico
          item.indicacoes = unicPlantaResp.data.indicacoes.map((indicacao: indicacaoInterface) => indicacao.id)
          item.contraindicacoes = unicPlantaResp.data.contraindicacoes.map((contraIndicacao: {
            id: number,
            descricao: string,
            ativo: boolean
          }) => contraIndicacao.id)
          item.nome_popular = unicPlantaResp.data.nome_popular
          userCad.nome = unicPlantaResp.data.criado_por
          item.industrias = unicPlantaResp.data.industrias.map((industria: Industria) => industria.id)
          fotoPlanta.value = unicPlantaResp.data.imagem
          mostraImg.value = true
          plantaSelecionada.value = true
        }
      }
    }

    watch(() => props.tab, (newVal) => {
      if (newVal === 'editar') {
        plantaSelecionada.value = false
        getPlantas()
        getIndustrias()
        getIndicacoes()
        getContraIndicacoes()
        item.nome_cientifico = ''
        item.indicacoes = []
        item.uploadImg = undefined
        item.nome_popular = ''
        item.industrias = []
        userCad.nome = ''
        item.ativo = false
        fotoPlanta.value = ''
        mostraImg.value = false
        plantaId.value = undefined
      } else {
        plantaSelecionada.value = true
        item.nome_cientifico = ''
        item.indicacoes = []
        item.nome_popular = ''
        item.industrias = []
        item.uploadImg = undefined
        item.ativo = false
        fotoPlanta.value = ''
        mostraImg.value = false
        plantaId.value = undefined
        const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
        if (userData && typeof userData === 'object') {
          userCad.nome = userData.nome || ''
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
        fotoPlanta.value = URL.createObjectURL(item.uploadImg)
      }
    }

    onMounted(() => {
      const userData = JSON.parse(localStorage.getItem('usuario') || '{}')
      if (userData && typeof userData === 'object') {
        userCad.nome = userData.nome || ''
      }
      getIndustrias()
      getIndicacoes()
      getContraIndicacoes()
    })
    const filterIndicacoesFn = (val: string, update: UpdateFunction, select: string) => {
      if (val === '') {
        switch (select) {
          case 'indicacao':
            update(() => {
              indicacoesOptions.value = indicacoesLista.value
            })
            break
          case 'contraindicacao':
            update(() => {
              contraIndicacoesOptions.value = contraIndicacoesLista.value
            })
            break
        }
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        switch (select) {
          case 'indicacao':
            indicacoesOptions.value = indicacoesLista.value.filter((v: IndicacaoType) =>
              v.descricao?.toLowerCase().includes(needle)
            )
            break
          case 'contraindicacao':
            contraIndicacoesOptions.value = contraIndicacoesLista.value.filter((v: IndicacaoType) =>
              v.descricao.toLowerCase().includes(needle)
            )
            break
        }
      })
    }
    const filterFn = (val: string, update: UpdateFunction) => {
      if (val === '') {
        update(() => {
          plantasOptions.options = plantasOptions.lista
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        plantasOptions.options = plantasOptions.lista.filter((v: Planta) => {
          if (v.nome_cientifico.toLowerCase().includes(needle) || v.nome_popular.toLowerCase().includes(needle)) {
            return true
          }
          return false
        })
      })
    }

    return {
      filterIndicacoesFn,
      requiredRule,
      requiredSelectRules,
      registrar,
      handleInputs,
      updateftPlanta,
      filterFn,
      requiredFilesRules,
      plantaSelecionada,
      mostraImg,
      cadastroPlantasForm,
      plantaId,
      plantasOptions,
      industriaOptions,
      contraIndicacoesOptions,
      indicacoesOptions,
      item,
      loading,
      loadinFirstSelect,
      userCad,
      fotoPlanta,
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
