<template>
  <section class="agendaComponent" id="agendaSection">
    <h1>Agenda de Eventos</h1>

    <div class="agendaComponent_content">
      <!-- FILTROS -->
      <aside class="agendaComponent_filtros">
        <h2>Filtros de Eventos</h2>

        <div class="filtro_group">
          <label class="filtro_label">Intervalo de Datas</label>
          <div class="date_input_wrapper">
            <q-btn
              outline
              no-caps
              :label="textoDatas || 'Selecione uma data'"
              class="date_button"
            >
              <q-popup-proxy
                v-model="abrirCalendario"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="filtroDatas"
                  range
                  mask="YYYY-MM-DD"
                  @update:model-value="atualizarTextoDatas"
                />
              </q-popup-proxy>
            </q-btn>
            <q-btn
              v-if="textoDatas"
              flat
              round
              dense
              icon="cancel"
              size="sm"
              color="grey"
              class="clear_button"
              @click="limparDatas"
            />
          </div>
        </div>

        <div class="filtro_group">
          <label class="filtro_label">Tipo de Evento</label>
          <q-select
            outlined
            v-model="filtroTipo"
            :options="['Online / Virtual', 'Presencial']"
            dense
            clearable
            placeholder="Selecione o tipo"
          />
        </div>
      </aside>

      <!-- CALENDÁRIO -->
      <main class="agendaComponent_calendario">
        <div class="calendario_header">
          <q-btn
            flat
            round
            dense
            icon="chevron_left"
            @click="mesAnterior"
          />
          <h3>{{ mesAnoAtual }}</h3>
          <q-btn
            flat
            round
            dense
            icon="chevron_right"
            @click="proximoMes"
          />
        </div>

        <div class="calendario_grid">
          <div
            v-for="dia in diasSemana"
            :key="dia"
            class="calendario_dia_semana"
          >
            {{ dia }}
          </div>

          <div
            v-for="(dia, index) in diasDoMes"
            :key="index"
            :class="[
              'calendario_dia',
              {
                'dia_vazio': !dia.numero,
                'dia_com_evento': dia.numero && temEventoNoDia(dia.data),
                'dia_atual': dia.numero && ehDiaAtual(dia.data)
              }
            ]"
          >
            <span v-if="dia.numero" class="dia_numero">{{ dia.numero }}</span>
            <div
              v-if="dia.numero && temEventoNoDia(dia.data)"
              class="dia_indicador"
            ></div>

            <!-- Modal de eventos ao hover -->
            <q-menu
              v-if="dia.numero && temEventoNoDia(dia.data)"
              anchor="center middle"
              self="center middle"
              :offset="[0, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-card class="eventos_modal">
                <q-card-section class="modal_header">
                  <strong>{{ formatarData(dia.data) }}</strong>
                </q-card-section>
                <q-card-section class="modal_eventos">
                  <div
                    v-for="(evento, idx) in getEventosDoDia(dia.data)"
                    :key="idx"
                    class="modal_evento_item"
                  >
                    <div class="evento_detalhes">
                      <strong>{{ evento.titulo }}</strong>
                      <span class="evento_local">{{ evento.local }}</span>
                      <span class="evento_horario">{{ extrairHorario(evento.data_realizacao) }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-menu>
          </div>
        </div>

      </main>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { date } from 'quasar'
import { useEventosStore } from 'src/stores/useEventosStore'

export default defineComponent({
  name: 'AgendaEventos',
  setup () {
    const eventosStore = useEventosStore()
    const diaSelecionado = ref('')

    // Filtros
    const filtroDatas = ref<any>(null)
    const filtroTipo = ref<string | null>(null)
    const textoDatas = ref('')
    const abrirCalendario = ref(false)

    // Calendário
    const mesAtual = ref(new Date().getMonth())
    const anoAtual = ref(new Date().getFullYear())

    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

    const mesAnoAtual = computed(() => {
      const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
      return `${meses[mesAtual.value]} ${anoAtual.value}`
    })

    const eventosFiltrados = computed(() => {
      let filtrados = eventosStore.eventosList

      // filtro de intervalo de datas
      if (filtroDatas.value?.from && filtroDatas.value?.to) {
        const from = new Date(filtroDatas.value.from)
        const to = new Date(filtroDatas.value.to)
        filtrados = filtrados.filter(e => {
          const dataEvento = new Date(e.data_realizacao)
          return dataEvento >= from && dataEvento <= to
        })
      }

      // filtro tipo de evento (online/presencial)
      if (filtroTipo.value) {
        if (filtroTipo.value === 'Online / Virtual') {
          filtrados = filtrados.filter(e =>
            e.local?.toLowerCase().includes('online')
          )
        } else if (filtroTipo.value === 'Presencial') {
          filtrados = filtrados.filter(e =>
            !e.local?.toLowerCase().includes('online')
          )
        }
      }

      return filtrados
    })

    const diasDoMes = computed(() => {
      const primeiroDia = new Date(anoAtual.value, mesAtual.value, 1)
      const ultimoDia = new Date(anoAtual.value, mesAtual.value + 1, 0)

      // Ajustar para começar na segunda-feira (0 = Domingo, 1 = Segunda)
      let diaSemanaInicio = primeiroDia.getDay() - 1
      if (diaSemanaInicio === -1) diaSemanaInicio = 6

      const dias: Array<{ numero: number | null; data: string }> = []

      // Adicionar dias vazios no início
      for (let i = 0; i < diaSemanaInicio; i++) {
        dias.push({ numero: null, data: '' })
      }

      // Adicionar dias do mês
      for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const data = new Date(anoAtual.value, mesAtual.value, dia)
        const dataStr = date.formatDate(data, 'YYYY-MM-DD')
        dias.push({ numero: dia, data: dataStr })
      }

      return dias
    })

    const getEventosDoDia = (data: string) => {
      return eventosFiltrados.value.filter(e => {
        const dataEvento = date.formatDate(new Date(e.data_realizacao), 'YYYY-MM-DD')
        return dataEvento === data
      })
    }

    const temEventoNoDia = (data: string) => {
      if (!data) return false
      return eventosFiltrados.value.some(e => {
        const dataEvento = date.formatDate(new Date(e.data_realizacao), 'YYYY-MM-DD')
        return dataEvento === data
      })
    }

    const ehDiaAtual = (data: string) => {
      if (!data) return false
      const hoje = date.formatDate(new Date(), 'YYYY-MM-DD')
      return data === hoje
    }

    const extrairHorario = (dataCompleta: string) => {
      return date.formatDate(new Date(dataCompleta), 'HH:mm')
    }

    const selecionarDia = (data: string) => {
      diaSelecionado.value = data
    }

    const mesAnterior = () => {
      if (mesAtual.value === 0) {
        mesAtual.value = 11
        anoAtual.value--
      } else {
        mesAtual.value--
      }
    }

    const proximoMes = () => {
      if (mesAtual.value === 11) {
        mesAtual.value = 0
        anoAtual.value++
      } else {
        mesAtual.value++
      }
    }

    const atualizarTextoDatas = () => {
      if (filtroDatas.value?.from && filtroDatas.value?.to) {
        const from = date.formatDate(filtroDatas.value.from, 'DD/MM/YYYY')
        const to = date.formatDate(filtroDatas.value.to, 'DD/MM/YYYY')
        textoDatas.value = `${from} até ${to}`
      } else if (filtroDatas.value?.from) {
        textoDatas.value = date.formatDate(filtroDatas.value.from, 'DD/MM/YYYY')
      } else {
        textoDatas.value = ''
      }
    }

    const limparDatas = () => {
      filtroDatas.value = null
      textoDatas.value = ''
    }

    const formatarData = (data: string) => {
      return date.formatDate(data + ' 00:00:00', 'DD/MM/YYYY')
    }

    onMounted(() => {
      eventosStore.fetchEventos()
    })

    return {
      filtroDatas,
      filtroTipo,
      textoDatas,
      abrirCalendario,
      mesAtual,
      anoAtual,
      diasSemana,
      mesAnoAtual,
      diasDoMes,
      getEventosDoDia,
      temEventoNoDia,
      ehDiaAtual,
      extrairHorario,
      mesAnterior,
      proximoMes,
      atualizarTextoDatas,
      limparDatas,
      formatarData
    }
  }
})
</script>

<style scoped lang="scss">
.agendaComponent {
  padding: 6rem 8rem;
  background-color: var(--color-gray-light);
}

.agendaComponent h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: normal;
  margin: 0 0 32px;
}

.agendaComponent_content {
  max-width: var(--limit-page-width);
  margin: auto;
  display: grid;
  grid-template-columns: 35% 1fr;
  gap: 2rem;
}

.agendaComponent_filtros {
  border: 1px solid var(--color-gray-op);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  background-color: #ffffff;
  min-width: 30%;
}

.agendaComponent_filtros h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 1.5rem;
}

.filtro_group {
  margin-bottom: 1.5rem;
}

.filtro_group:last-child {
  margin-bottom: 0;
}

.filtro_label {
  font-size: 14px;
  margin: 0 0 6px;
  display: block;
  font-weight: 500;
}

.date_input_wrapper {
  position: relative;
  width: 100%;
}

.date_button {
  width: 100%;
  color: grey;
  padding: 8px 12px;
  justify-content: flex-start;
}

.date_button::before {
  border-color: #0000003d !important;
}

.clear_button {
  position: absolute;
  top: 4px;
  right: 8px;
}

.agendaComponent_calendario {
  border: 1px solid var(--color-gray-op);
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #ffffff;
}

.calendario_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendario_header h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.calendario_grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendario_dia_semana {
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  padding: 8px;
  color: var(--color-gray);
}

.calendario_dia {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gray-op);
  border-radius: 8px;
  position: relative;
  transition: all 0.2s;
}

.calendario_dia:not(.dia_vazio) {
  cursor: pointer;
}

.calendario_dia:not(.dia_vazio):hover {
  background: var(--color-gray-op);
  transform: scale(1.05);
}

.dia_vazio {
  border: none;
  cursor: default;
}

.dia_numero {
  font-size: 14px;
  font-weight: 500;
}

.dia_com_evento {
  background: #e8f5e9;
  border-color: #4caf50;
}

.dia_atual {
  background: #e3f2fd;
  border-color: #2196f3;
  font-weight: bold;
}

.dia_com_evento.dia_atual {
  background: linear-gradient(135deg, #e3f2fd 50%, #e8f5e9 50%);
}

.dia_indicador {
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  background: #4caf50;
  border-radius: 50%;
}

.eventos_modal {
  min-width: 280px;
  max-width: 350px;
}

.modal_header {
  padding: 12px 16px;
  background: var(--color-terciary);
  border-bottom: 1px solid #e0e0e0;
}

.modal_header strong {
  font-size: 14px;
  color: #333;
}

.modal_eventos {
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.modal_evento_item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  background: #fafafa;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.modal_evento_item:last-child {
  margin-bottom: 0;
}

.modal_evento_item:hover {
  background: #f0f0f0;
}

.evento_horario {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-dark);
  min-width: 45px;
  flex-shrink: 0;
}

.evento_detalhes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.evento_detalhes strong {
  font-size: 14px;
  color: #333;
  line-height: 1.3;
}

.evento_local {
  font-size: 12px;
  color: var(--color-gray);
}

@media screen and (max-width: 1024px) {
  .agendaComponent {
    padding: 6rem 4rem;
  }

  .agendaComponent_content {
    grid-template-columns: 1fr;
  }

  .agendaComponent_filtros {
    width: 100%;
  }
}

@media screen and (max-width: 680px) {
  .agendaComponent {
    padding: 4rem 2rem;
  }

  .agendaComponent h1 {
    font-size: 24px;
  }

  .calendario_header h3 {
    font-size: 18px;
  }

  .calendario_dia_semana {
    font-size: 12px;
    padding: 4px;
  }

  .dia_numero {
    font-size: 12px;
  }

  .calendario_grid {
    gap: 4px;
  }
}

@media screen and (max-width: 480px) {
  .agendaComponent {
    padding: 3rem 1rem;
  }

  .agendaComponent h1 {
    font-size: 20px;
  }

  .agendaComponent_filtros {
    padding: 1rem;
  }

  .agendaComponent_calendario {
    padding: 1rem;
  }

  .filtro_label {
    font-size: 12px;
  }
}
</style>
