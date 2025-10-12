<template>
 <div class="row q-gutter-x-xl flex flex-center">
  <div v-if="tab === 'anual'" class="row q-gutter-x-xl flex flex-center">
    <div v-for="(item, indx) in monthData"  :key="indx"  :class="{
        'hidden-md-down': indx < monthData.length - 6,
        'align-left-lg': indx >= monthData.length - 1
      }">
      <div class="flex flex-center" style="background-color: #006334; height: 25px; border-bottom: 0px; border-top-right-radius: 9px; border-top-left-radius: 9px; margin-top: 10vh;">
        <span style="color: white;">{{ item.nomeMes }}</span>
      </div>
      <div class="column" style="height: 450px;">
        <q-date
          v-model="item.date"
          :events="item.eventos"
          :disable-past-days="true"
          readonly
          minimal
          style="max-height: 245px; border-top-right-radius: 0px; padding-top: 5px;"
          color="white"
          text-color="black"
          event-color="green-10"
        />
        <div class="q-mt-md" v-if="!!item.titleDate">
          <div v-for="(title, index) in item.titleDate" :key="index">
            <q-chip style="background-color: #006334; color: white; border-radius: 8px;" v-if="title.titulo.length <= 10">{{ date.formatDate(title.dataEvnt, 'DD/MM') }} - {{ title.titulo }}</q-chip>
            <q-chip style="background-color: #006334; color: white; border-radius: 8px;" v-else>{{ date.formatDate(title.dataEvnt, 'DD/MM') }} - {{ title.titulo.substring(0, 9) + '...' }}
              <q-tooltip>{{ title.titulo }}</q-tooltip>
            </q-chip>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="column">
    <div class="flex flex-center" style="background-color: #006334; height: 25px; border-bottom: 0px; border-top-right-radius: 9px; border-top-left-radius: 9px; margin-top: 10vh;">
        <span style="color: white;">{{ currentMonth }}</span>
      </div>
    <q-date
      v-model="currentDateFormated"
      :events="currentMonthEvents"
      :disable-past-days="true"
      readonly
      minimal
      style="max-height: 245px; border-top-right-radius: 0px; padding-top: 5px;"
      color="white"
      text-color="black"
      event-color="green-10"
    />
    <div class="q-mt-md" v-if="!!currentMonthEventsTitles">
      <div v-for="(title, index) in currentMonthEventsTitles" :key="index">
        <q-chip style="background-color: #006334; color: white;" v-if="title.titulo.length <= 10">{{ date.formatDate(title.dataEvnt, 'DD/MM') }} - {{ title.titulo }}</q-chip>
        <q-chip style="background-color: #006334; color: white;" v-else>{{ date.formatDate(title.dataEvnt, 'DD/MM') }} - {{ title.titulo.substring(0, 9) + '...' }}
          <q-tooltip>{{ title.titulo }}</q-tooltip>
        </q-chip>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { QDate, date, useQuasar } from 'quasar'
import EventosService from 'app/services/eventosService'
import { Evento } from 'src/interfaces/interfaces'

interface MonthData {
  date: string;
  eventos: string[];
  nomeMes: string;
  titleDate: Array<{ dataEvnt: string, titulo: string }>
}

export default defineComponent({
  name: 'CalendarComponent',
  components: {
    QDate
  },
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  setup () {
    const currentDate = new Date()
    const currentDateFormated = date.formatDate(currentDate, 'YYYY/MM/DD')
    const year: number = currentDate.getFullYear()
    const monthDates = ref<Array<{ eventos: string[], mesAtual: string, mesNome: string, titleDate: Array<{ dataEvnt: string, titulo: string }>}>>([])
    const $q = useQuasar()
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]

    const getEventos = async () => {
      const eventos = await EventosService.getAll().catch(erro => {
        $q.notify({
          message: erro.message,
          color: 'negative'
        })
      })

      if (eventos) {
        for (let month = 0; month < 12; month++) {
          const firstDayOfMonth = new Date(year, month, 1)
          const data: string = date.formatDate(firstDayOfMonth, 'YYYY/MM/DD')
          const monthName: string = meses[month]
          const markedDates = eventos.data
            .filter((evento: Evento) => {
              const dateObj = new Date(evento.data_realizacao)
              return dateObj.getFullYear() === year && dateObj.getMonth() === month
            })
            .map((evento: Evento) => date.formatDate(new Date(evento.data_realizacao), 'YYYY/MM/DD'))

          const dateTitle:Array<{ dataEvnt: string, titulo: string }> = eventos.data
            .filter((evento: Evento) => {
              const dateObj = new Date(evento.data_realizacao)
              return dateObj.getFullYear() === year && dateObj.getMonth() === month
            })
            .map((evento: Evento) => {
              return {
                dataEvnt: date.formatDate(new Date(evento.data_realizacao), 'YYYY/MM/DD'),
                titulo: evento.titulo
              }
            }).sort((a: { dataEvnt: string }, b: { dataEvnt: string }) => {
              const dateA = new Date(a.dataEvnt)
              const dateB = new Date(b.dataEvnt)
              return dateA.getTime() - dateB.getTime() // Alteração aqui
            })

          monthDates.value.push({
            eventos: markedDates,
            mesAtual: data,
            mesNome: monthName,
            titleDate: dateTitle
          })
        }
      }
    }

    const monthData = computed<Array<MonthData>>(() => {
      return monthDates.value.map((item) => {
        return {
          date: item.mesAtual,
          eventos: item.eventos,
          nomeMes: item.mesNome,
          titleDate: item.titleDate
        }
      })
    })

    const currentMonth = computed<string>(() => {
      const selectedMonth = currentDate.getMonth()
      return meses[selectedMonth]
    })

    const currentMonthData = computed<MonthData | undefined>(() => {
      const selectedMonth = new Date(currentDate).getMonth()
      const selectedYear = new Date(currentDate).getFullYear()
      return monthData.value.find(item => {
        const month = new Date(item.date).getMonth()
        const year = new Date(item.date).getFullYear()
        return month === selectedMonth && year === selectedYear
      })
    })

    const currentMonthEventsTitles = computed<Array<{ dataEvnt: string, titulo: string }>>(() => {
      const currentMonthDataValue = currentMonthData.value
      return currentMonthDataValue ? currentMonthDataValue.titleDate : []
    })

    const currentMonthEvents = computed(() => {
      const currentMonthDataValue = currentMonthData.value
      return currentMonthDataValue ? currentMonthDataValue.eventos : [] as Array<{ dataEvnt: string, titulo: string }>
    })

    onMounted(() => {
      getEventos()
    })

    return {
      monthData,
      date,
      currentDateFormated,
      currentMonth,
      currentMonthEventsTitles,
      currentMonthEvents
    }
  }
})
</script>
<style>
@media only screen and (max-width: 1366px) {
  .align-left-lg {
  margin-right: 0px;
}
}

@media only screen and (min-width: 1370px) {
  .align-left-lg {
  margin-right: 56%
}

}
</style>
