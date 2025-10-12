<template>
  <q-card style="width: 40%">
        <q-card-section >
          <q-form id="cadastroProdutorForm" ref="cadastroProdutorForm" @submit="register" style="width: 100%" class=" column flex flex-center">
            <p class="text-h5 text-black text-bold q-mt-md">Ola, produtor!</p>
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
              <p class="textInput q-mb-xs">Qual planta bioativa você produz?</p>
              <q-icon color="grey" class="q-ml-sm" size="sm" name="mdi-alert-octagon-outline">
                <q-tooltip anchor="bottom right" style="padding: 1px">
                  <q-card style="padding: 5px">
                      <p style="color: black; margin-bottom: 0">
                        Informe apenas 1 Planta<br/>
                        Bioativa.  Caso tenha mais<br/>
                        de uma, informe após o<br/>
                        cadastro, em <span style="color: red">Configuraçoes de perfil</span><br/>
                        dentro da plataforma.<br/>
                      </p>
                    </q-card>
                  </q-tooltip>
              </q-icon>
            </div>
            <q-select
              v-model="item.planta_id"
              dense
              :options="plantasOptions"
              map-options
              emit-value
              clearable
              option-label="nome_popular"
              option-value="id"
              outlined
              remove-chips
              rounded
              label="Selecione o(s) tipo(s) de planta bioativa"
              class="inputCard q-mb-xs"
              :rules="[requiredSelectRules]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Plantas" size="md" />
              </template>
            </q-select>
            <div class="flex justify-start column" style="width: 79%">
              <p class="textInput q-mb-xs">Produção estimada</p>
            </div>
            <q-input
              v-model="item.quantidade_estimada"
              dense
              outlined
              rounded
              placeholder="Insira a estimativa de produção do seu plantio"
              class="inputCard q-mb-xs"
              suffix="kg"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:Halter" size="md" />
              </template>
            </q-input>
            <div class="flex justify-start column" style="width: 79%">
              <p class="textInput q-mb-xs">Data estimada de entrega</p>
            </div>
            <q-input
              v-model="item.data_estimada"
              dense
              outlined
              rounded
              type="date"
              placeholder="Insira a estimativa de entrega da sua produção"
              class="inputCard q-mb-xs"
              :rules="[requiredRule]"
            >
              <template v-slot:prepend>
                <q-icon name="app:CalendarEntrega" size="md" />
              </template>
            </q-input>
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
import { Planta, newProdutorInterface } from 'src/interfaces/interfaces'
import { requiredRule, requiredSelectRules } from 'src/composables/InputRules'
import { QForm, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import usuarioService from '../../services/usuarioService'
import { GetErrorMessage } from 'src/composables/helper'
import PlantasService from 'app/services/plantasService'
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
    const item = reactive({}) as newProdutorInterface
    const plantasOptions = ref<Array<Planta>>([])

    const register = async () => {
      loading.value = true
      const isValid = await cadastroProdutorForm.value?.validate()
      if (isValid) {
        const produtor = JSON.parse(localStorage.getItem('produtor') || '')
        if (item.planta_id) {
          const plantas = [
            {
              planta_id: item.planta_id,
              producao_est: item.quantidade_estimada,
              data_entrega_est: item.data_estimada
            }
          ]
          const dados: newProdutorInterface = {
            nome: produtor.nome,
            estado: 'RS',
            email: produtor.email,
            senha: produtor.senha,
            tipo_usuario: produtor.tipo_usuario,
            quantidade_estimada: item.quantidade_estimada,
            data_estimada: item.data_estimada,
            telefone: item.telefone,
            cep: item.cep,
            cidade: item.cidade,
            plantas
          }
          loading.value = false
          const usuarioProdutorResp = await usuarioService.newUser(dados)
          if (usuarioProdutorResp) {
            $q.notify({
              color: 'secondary',
              message: 'Cadastro feito com sucesso por favor, faça Login para acessar a plataforma'
            })
            localStorage.removeItem('produtor')
            router.push({ name: 'login' })
          }
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

    onMounted(() => {
      getPlantas()
    })
    return {
      cadastroProdutorForm,
      router,
      item,
      setErro,
      plantasOptions,
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
