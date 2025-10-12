<template>
  <q-page>
    <q-form class="flex justify-around" id="cadastroForm" ref="cadastroForm" @submit="registrar">
      <div class="row q-mt-md q-mr-xl" style="width: 100%; margin-left: 4vw">
        <div class="flex justify-start column q-mt-md" style="width: 100%">
          <div v-if="tab === 'contraindicacoes'" class="row q-gutter-lg">
            <div class="col">
              <p class="textInput text-bold q-mb-xs">Planta</p>
              <q-select
                v-model="selectedPlanta"
                dense
                :options="plantasOptions"
                map-options
                use-input
                :loading="loadingPlantas"
                chip-remove
                option-label="nome_popular"
                option-value="id"
                outlined
                rounded
                bg-color="light-green-1"
                style="color: #7BB542"
                label="Selecione a planta"
                hide-bottom-space
                class="inputCard q-mb-xs custom-select"
                @filter="(value, update) => filterFn(value, update, 'planta')"
                @update:model-value="handlePlantaSelect"
              />
            </div>
            <div class="col">
              <p class="textInput text-bold q-mb-xs">Contra Indicações</p>
              <q-select
                v-model="selectedIndicacao"
                dense
                outlined
                rounded
                :options="indicacoesOptions"
                option-label="descricao"
                option-value="id"
                map-options
                use-input
                :loading="loadingIndicacoes"
                input-debounce="0"
                label="Selecione as contra indicações"
                class="inputCard q-mb-xs"
                hide-bottom-space
                @filter="(value, update) => filterFn(value, update, 'contraindicacao')"
                @update:model-value="handleIndicacaoSelect"
              />
              <q-chip
                v-for="(item, index) in indicacoesChips"
                v-bind:key="index"
                :label="item.descricao"
                removable
                @remove="removeChip(index)"
              />
            </div>
          </div>
          <div v-if="tab === 'plantas'" class="row q-gutter-lg">
            <div class="col">
              <p class="textInput text-bold q-mb-xs">Contra indicação</p>
              <q-select
                v-model="selectedIndicacao"
                dense
                outlined
                rounded
                :options="indicacoesOptions"
                option-label="descricao"
                option-value="id"
                bg-color="light-green-1"
                map-options
                use-input
                :loading="loadingIndicacoes"
                input-debounce="0"
                style="color: #7BB542"
                label="Selecione a contra indicação"
                class="inputCard q-mb-xs custom-select"
                hide-bottom-space
                @filter="(value, update) => filterFn(value, update, 'contraindicacao')"
                @update:model-value="handleIndicacaoSelect"
              />
            </div>
            <div class="col">
              <p class="textInput text-bold q-mb-xs">Plantas</p>
              <q-select
                v-model="selectedPlanta"
                dense
                :options="plantasOptions"
                map-options
                use-input
                :loading="loadingPlantas"
                chip-remove
                option-label="nome_popular"
                option-value="id"
                outlined
                rounded
                label="Selecione as plantas"
                hide-bottom-space
                class="inputCard q-mb-xs"
                @filter="(value, update) => filterFn(value, update, 'planta')"
                @update:model-value="handlePlantaSelect"
              />
              <q-chip
                v-for="(item, index) in plantasChips"
                v-bind:key="index"
                :label="item.descricao"
                removable
                @remove="removeChip(index)"
              />
            </div>
          </div>
          <div v-if="tab === 'cadastrar'" class="row q-gutter-lg">
            <div class="column full-width" style="width: 100%">
              <div class="col q-px-md">
                <p class="textInput text-bold q-mb-xs">Descrição da Indicação</p>
                <auto-complete-input :loadingFields="loadingNew" :model-value="novaIndicacao"
                                     :options="indicacoesOptions" label="Contra Indicação"
                                     @update:modelValue="novaIndicacao = $event"/>
                <div class="q-mt-md" v-if="showToggle">
                  <p class="textInput text-bold q-mb-xs">Status Contra Indicação</p>
                  <q-toggle
                    v-model="indicacaoAtiva"
                    :label="indicacaoAtiva ? 'Ativa' : 'Inativa'"
                  />
                </div>
              </div>
              <button-component
                v-if="tab === 'cadastrar'"
                :label="showToggle ? 'Salvar' : 'Cadastrar'"
                :outline="false"
                class="self-center q-mt-xl text-bold"
                nocaps
                style="font-size: 16px; width: 15vw; border-radius: 12px; margin-bottom: 4%"
                type="submit"
                form="cadastroForm"
              />
            </div>
          </div>
          <button-component
            v-if="tab !== 'cadastrar'"
            label="Salvar"
            :outline="false"
            class="self-center q-mt-xl text-bold"
            nocaps
            style="font-size: 16px; width: 15vw; border-radius: 12px; margin-bottom: 4%"
            type="submit"
            form="cadastroForm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { AxiosResponse } from 'axios'
import PlantasService from 'app/services/plantasService'
import buttonComponent from 'components/Button.vue'
import { useQuasar } from 'quasar'
import { GetErrorMessage } from 'src/composables/helper'
import ContraindicacaoService from 'app/services/contraindicacaoService'
import { UpdateFunction } from 'src/interfaces/interfaces'
import AutoCompleteInput from 'components/component/AutoCompleteInput.vue'

type PlantaType = {
  id: number;
  contraindicacoes?: { id: number, descricao: string }[];
  nome_popular: string;
}

type IndicacaoType = {
  id: number;
  descricao: string;
  plantas?: PlantaType[];
  ativo: boolean
}

export default defineComponent({
  name: 'CadastroForm',
  components: { AutoCompleteInput, buttonComponent },
  props: {
    tab: {
      type: String,
      default: 'contraindicacoes'
    }
  },
  setup (props) {
    const $q = useQuasar()
    const selectedIndicacao = ref<IndicacaoType>()
    const selectedPlanta = ref<PlantaType>()

    const indicacoesChips = ref<{ id: number, descricao: string }[]>([])
    const plantasChips = ref<{ id: number, descricao: string }[]>([])

    const indicacoesOptions = ref<IndicacaoType[]>([])
    const plantasOptions = ref<PlantaType[]>([])
    const indicacoesLista = ref<IndicacaoType[]>([])
    const plantasLista = ref<PlantaType[]>([])
    const novaIndicacao = ref('')
    const loadingNew = ref(false)
    const indicacaoAtiva = ref(false)
    const showToggle = ref(false)

    const loadIndicacoes = () => {
      ContraindicacaoService.getAll({ loadRelationsIndicacao: true }).then((resp: AxiosResponse<IndicacaoType[]>) => {
        indicacoesOptions.value = resp.data
        indicacoesLista.value = resp.data
      })
    }

    const loadPlantas = () => {
      PlantasService.getAll({ loadRelationsPlanta: true }).then((resp: AxiosResponse<PlantaType[]>) => {
        plantasOptions.value = resp.data
        plantasLista.value = resp.data
      })
    }

    const loadingIndicacoes = ref(false)
    const loadingPlantas = ref(false)

    watch(selectedIndicacao, newVal => {
      if (props.tab === 'plantas') {
        const selectedIndicacao = indicacoesOptions.value.find((indicacao: IndicacaoType) => indicacao.id === newVal?.id)
        if (selectedIndicacao && Array.isArray(selectedIndicacao.plantas)) {
          plantasChips.value = selectedIndicacao.plantas.map(planta => ({
            id: planta.id,
            descricao: planta.nome_popular
          }))
        }
      }
    })

    watch(selectedPlanta, newVal => {
      if (props.tab === 'contraindicacoes') {
        const selectedPlant = plantasOptions.value.find((plant: PlantaType) => plant.id === newVal?.id)
        if (selectedPlant && Array.isArray(selectedPlant.contraindicacoes)) {
          indicacoesChips.value = selectedPlant.contraindicacoes
        }
      }
    })

    const handleIndicacaoSelect = (newValue: IndicacaoType) => {
      if (props.tab === 'contraindicacoes') {
        if (newValue) {
          indicacoesChips.value.push({ id: newValue.id, descricao: newValue.descricao })
        }
      }
    }

    const handlePlantaSelect = (newValue: PlantaType) => {
      if (props.tab === 'plantas') {
        if (newValue) {
          plantasChips.value.push({ id: newValue.id, descricao: newValue.nome_popular })
        }
      }
    }

    const removeChip = (index: number) => {
      if (props.tab === 'contraindicacoes') {
        indicacoesChips.value.splice(index, 1)
      } else if (props.tab === 'plantas') {
        plantasChips.value.splice(index, 1)
      }
    }
    const filterFn = (val: string, update: UpdateFunction, select: string) => {
      if (val === '') {
        switch (select) {
          case 'planta':
            update(() => {
              plantasOptions.value = plantasLista.value
            })
            break
          case 'contraindicacao':
            update(() => {
              indicacoesOptions.value = indicacoesLista.value
            })
            break
        }
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        switch (select) {
          case 'planta':
            plantasOptions.value = plantasLista.value.filter((v: PlantaType) =>
              v.nome_popular.toLowerCase().includes(needle)
            )
            break
          case 'contraindicacao':
            indicacoesOptions.value = indicacoesLista.value.filter((v: IndicacaoType) =>
              v.descricao.toLowerCase().includes(needle)
            )
            break
        }
      })
    }
    const registrar = () => {
      if (props.tab === 'contraindicacoes') {
        if (selectedPlanta.value) {
          const id = selectedPlanta.value.id
          const dados = { contraindicacoes: [] as number[] }
          if (indicacoesChips.value) {
            indicacoesChips.value.forEach((item: { id: number, descricao: string }) => {
              dados.contraindicacoes.push(item.id)
            })
          }
          ContraindicacaoService.attachIndicacoes(dados, id).then((resp) => {
            if (resp.status === 200) {
              $q.notify({
                message: 'Registros Salvos',
                color: 'primary'
              })
            }
          }).finally(() => {
            clearFields()
            loadIndicacoes()
            loadPlantas()
          }).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })
        }
      }
      if (props.tab === 'plantas') {
        if (selectedIndicacao.value) {
          const id = selectedIndicacao.value.id
          const dados = { plantas: [] as number[] }
          if (plantasChips.value) {
            plantasChips.value.forEach((item: { id: number, descricao: string }) => {
              dados.plantas.push(item.id)
            })
          }
          ContraindicacaoService.attachPlantas(dados, id).then((resp) => {
            if (resp.status === 200) {
              $q.notify({
                message: 'Registros Salvos',
                color: 'primary'
              })
            }
          }).finally(() => {
            clearFields()
            loadIndicacoes()
            loadPlantas()
          }).catch(error => {
            $q.notify({
              message: GetErrorMessage(error),
              color: 'negative'
            })
          })
        }
      }
      if (props.tab === 'cadastrar') {
        criarContraIndicacao()
      }
    }
    const criarContraIndicacao = () => {
      loadingNew.value = true
      const index = indicacoesLista.value.findIndex((x: IndicacaoType) => x.descricao === novaIndicacao.value)
      if (index !== -1) {
        const id = indicacoesLista.value[index].id
        ContraindicacaoService.update({ ativo: indicacaoAtiva.value }, id).then((resp) => {
          if (resp.status === 200) {
            $q.notify({
              message: 'Registro Atualizado',
              color: 'primary'
            })
            loadIndicacoes()
          }
        }).finally(() => {
          novaIndicacao.value = ''
          loadingNew.value = false
        })
      } else {
        ContraindicacaoService.new({ descricao: novaIndicacao.value }).then((resp) => {
          if (resp.status === 201) {
            $q.notify({
              message: 'Registro Salvo',
              color: 'primary'
            })
            loadIndicacoes()
          }
        }).finally(() => {
          novaIndicacao.value = ''
          loadingNew.value = false
        })
      }
    }
    const clearFields = () => {
      selectedIndicacao.value = undefined
      selectedPlanta.value = undefined
      indicacoesChips.value = []
      plantasChips.value = []
    }
    onMounted(() => {
      loadIndicacoes()
      loadPlantas()
    })
    watch(() => props.tab, clearFields)
    watch(novaIndicacao, newVal => {
      const index = indicacoesLista.value.findIndex((indicacao: IndicacaoType) => indicacao.descricao === newVal)
      if (index !== -1) {
        showToggle.value = true
        indicacaoAtiva.value = indicacoesLista.value[index].ativo
      } else {
        showToggle.value = false
      }
    })

    return {
      novaIndicacao,
      loadingNew,
      indicacaoAtiva,
      showToggle,
      selectedIndicacao,
      selectedPlanta,
      indicacoesChips,
      plantasChips,
      indicacoesOptions,
      plantasOptions,
      loadingIndicacoes,
      loadingPlantas,
      handleIndicacaoSelect,
      handlePlantaSelect,
      removeChip,
      registrar,
      filterFn
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
