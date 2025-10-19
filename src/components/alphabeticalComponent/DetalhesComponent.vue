<template>
  <div class="data-detalhes">
    <div class="row q-pa-lg">
      <div style="margin-right: 30px;">
        <q-img
          v-if="miniatura"
          loading="eager"
          :src="miniatura"
          alt="Imagem Detalhe"
          fit="fill"
          width="200px"
          height="200px"
          style="border-radius: 30px"
        />
        <div v-else class="detalhe_semFoto">
          <img src="../../assets/icons/user.svg" alt="Sem foto">
        </div>
      </div>
      <div style="position: relative;">
        <div class="text-h5 text-capitalize">{{ nome }}</div>
        <div class="detalhes_infos">
          <div v-for="item in dataDetalhe" :key="item.field" class="row flex-nowrap items-center">
            <b class="">{{ item.field }}</b>
            <div v-if="item.value">
              <span v-if="!item.domelement" class="q-ml-sm">{{ item.value }}</span>
              <div v-if="Array.isArray(item.value) && item.value.length > 0" class="q-ml-sm">
                <span v-for="(link, index) in item.value" :key="index">
                  <a :href="link.link ?? null" target="_blank" style="color: black">
                    <span v-if="typeof link.descricao === 'string' && link.descricao.length <= 23">{{ link.descricao }}</span>
                    <span v-else-if="typeof link.descricao === 'string'">{{ link.descricao.substring(0, 15) + '...' }}
                      <q-tooltip>{{ link.descricao }}</q-tooltip>
                    </span>
                  </a>
                  <span v-if="index < item.value.length - 1">, </span>
                </span>
              </div>
            </div>
            <!-- <q-icon v-else class="q-ml-md" size="20px" name="mdi-eye-off-outline"/> -->
            <div v-else class="q-ml-sm text-negative detalhe_restrito">Restrito</div>
          </div>
        </div>

        <span class="detalhe_alert"><a @click="router.push({name: 'login'})" class="detalhe_link">Faça login</a> para liberar o acesso completo às informações.</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { Artigo, Curso, Industria, MappedDetalhe, Planta, Produtor } from 'src/interfaces/interfaces'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DetalhesComponent',
  props: {
    unmappedData: {
      type: Object as () => Planta | Produtor | Industria,
      required: true
    },
    tab: {
      type: String,
      required: true
    }
  },
  computed: {
    date () {
      return date
    }
  },
  setup (props) {
    const router = useRouter()
    const mapData = (unmappedData: Planta | Produtor | Industria): MappedDetalhe[] | void => {
      switch (props.tab) {
        case 'plantas':
          return mapPlanta(unmappedData)
        case 'produtores':
          return mapProdutor(unmappedData)
        case 'industrias':
          return mapIndustria(unmappedData)
      }
    }
    const nome = ref('')
    const miniatura = ref<string | File | undefined>('')
    const mapPlanta = (unmappedPlanta: Planta | Produtor | Industria): MappedDetalhe[] | void => {
      if ('nome_cientifico' in unmappedPlanta) {
        const artigos: { descricao: string, link: string }[] = []
        if (unmappedPlanta.artigos) {
          unmappedPlanta.artigos.forEach((artigo: Artigo) => {
            artigos.push({ descricao: artigo.descricao, link: artigo.link })
          })
        }
        miniatura.value = unmappedPlanta.imagem
        nome.value = unmappedPlanta.nome_popular
        const mappedData = [
          { field: 'Nome Cientifíco: ', value: unmappedPlanta.nome_cientifico },
          { field: 'Produtores: ', value: unmappedPlanta.n_produtores },
          { field: 'Indústrias: ', value: unmappedPlanta.n_industrias },
          { field: 'Indicações de uso: ', value: unmappedPlanta.indicacoesUso },
          { field: 'Contra indicações de uso: ', value: unmappedPlanta.contraindicacao },
          { field: 'Artigos Relacionados: ', value: artigos.length > 0 ? artigos : null, domelement: true }
        ]
        if ('n_produtores' in unmappedPlanta && typeof unmappedPlanta.n_produtores === 'string') {
          const posicao = mappedData.findIndex(item => item.field === 'Produtores: ')
          const produtores = mappedData.splice(posicao, 1)
          mappedData.splice(posicao + 2, 0, produtores[0])
        }

        if ('n_industrias' in unmappedPlanta && typeof unmappedPlanta.n_industrias === 'string') {
          const posicao = mappedData.findIndex(item => item.field === 'Indústrias: ')
          const industrias = mappedData.splice(posicao, 1)
          mappedData.splice(posicao + 2, 0, industrias[0])
        }

        if (unmappedPlanta?.cursos) {
          const cursos: { descricao: string, link: string }[] = []
          unmappedPlanta.cursos.forEach((curso: Curso) => {
            cursos.push({ descricao: curso.descricao, link: curso.link_inscricao })
          })
          const addCursos = { field: 'Cursos Relacionados: ', value: cursos, domelement: true }
          mappedData.push(addCursos)
        }

        if (unmappedPlanta?.updated_at) {
          const addUpdated = {
            field: 'Ultima atualização: ',
            value: date.formatDate(unmappedPlanta.updated_at, 'D/M/YYYY')
          }
          mappedData.push(addUpdated)
        }

        return mappedData
      }
    }
    const mapProdutor = (unmappedProdutor: Planta | Produtor | Industria): MappedDetalhe[] | void => {
      if ('nome' in unmappedProdutor) {
        miniatura.value = unmappedProdutor.miniatura
        nome.value = unmappedProdutor.nome
        const mappedData = [
          { field: 'Produção: ', value: unmappedProdutor.plantasNomes },
          { field: 'Localização: ', value: unmappedProdutor.localizacao },
          { field: 'Contato: ', value: unmappedProdutor.telefone },
          { field: 'Produção estimada: ', value: unmappedProdutor.quantidade_estimada },
          { field: 'Data estimadade entrega: ', value: unmappedProdutor.data_estimada },
          { field: 'Ultima atualização: ', value: date.formatDate(unmappedProdutor.updated_at, 'DD/MM/YYYY') }
        ]
        if (unmappedProdutor.telefone) {
          const telefoneIndex = mappedData.findIndex(item => item.field === 'Contato: ')
          const telefone = mappedData.splice(telefoneIndex, 1)
          mappedData.splice(3, 0, telefone[0])
        }
        return mappedData
      }
    }
    const mapIndustria = (unmappedIndustria: Planta | Produtor | Industria): MappedDetalhe[] | void => {
      if ('fantasia' in unmappedIndustria) {
        miniatura.value = unmappedIndustria.miniatura
        nome.value = unmappedIndustria.fantasia
        const link = [{ descricao: unmappedIndustria.link, link: unmappedIndustria.link }]
        return [
          { field: 'Interesse em: ', value: unmappedIndustria.interessesEm },
          { field: 'Planta: ', value: unmappedIndustria.plantasNomes },
          { field: 'Localização: ', value: unmappedIndustria.localizacao },
          { field: 'Link: ', value: link, domelement: true },
          { field: 'Contato: ', value: unmappedIndustria.contato },
          { field: 'Últimas atualizações: ', value: date.formatDate(unmappedIndustria.updated_at, 'DD/MM/YYYY') }
        ]
      }
    }
    const dataDetalhe = ref<MappedDetalhe[] | void>(mapData(props.unmappedData))
    return {
      nome,
      miniatura,
      dataDetalhe,
      router
    }
  }
})
</script>

<style scoped>
.data-detalhes {
  width: 100%;
  background-color: white;
}

.detalhes_infos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 50px;
  margin: 16px 0 0;
}

.detalhe_restrito {
  border: 1px solid var(--q-negative);
  padding: 2px 8px;
  border-radius: 12px;
}

.detalhe_alert {
  position: absolute;
  bottom: 0;
  background: var(--color-primary-light);
  padding: 5px 16px;
  border-radius: 10px;
}

.detalhe_link {
  color: var(--color-primary);
  text-decoration: underline;
  cursor: pointer;
}

.detalhe_semFoto {
  background-color: var(--color-primary-light);
  padding: 3rem;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
}

.detalhe_semFoto img {
  width: 80%;
  height: auto;
}
</style>
