<template>
  <router-view />
</template>

<script  lang="ts">
import { useQuasar } from 'quasar'
import { IconListInterface } from 'src/interfaces/interfaces'

export default {
  name: 'App',
  setup () {
    const iconPath = 'img:custom/'
    const $q = useQuasar()
    const appIcons: {[key:string]: string} = {
      'app:miniData': 'datavizMini.svg',
      'app:Insta': 'insta.svg',
      'app:Face': 'face.svg',
      'app:Whats': 'whats.svg',
      'app:Email': 'Email.svg',
      'app:Green': 'greenLine.svg',
      'app:White': 'whiteLine.svg',
      'app:Lock': 'Lock.svg',
      'app:User': 'user.svg',
      'app:Aprendizado': 'Aprendizado.svg',
      'app:Cadastro': 'Cadastro.svg',
      'app:Eventos': 'Eventos.svg',
      'app:Home': 'Home.svg',
      'app:Produtos': 'Produtos.svg',
      'app:AdmCad': 'AdmCad.svg',
      'app:ArtigoCad': 'ArtigoCad.svg',
      'app:CursoCad': 'CursoCad.svg',
      'app:EventoCad': 'EventoCad.svg',
      'app:IndicacoesCad': 'IndicacoesCadastro.svg',
      'app:ContraindicacoesCad': 'ContraindicacoesCadastro.svg',
      'app:IndustriaCad': 'IndustriaCad.svg',
      'app:PlantaCad': 'PlantaCad.svg',
      'app:Credentials': 'Credentials.svg',
      'app:CidadeMarker': 'CidadeMarker.svg',
      'app:CepMarker': 'CepMarker.svg',
      'app:CalendarEntrega': 'CalendarEntrega.svg',
      'app:Halter': 'Halter.svg',
      'app:Plantas': 'Plantas.svg',
      'app:Interesses': 'Interesses.svg',
      'app:Upload': 'Upload.svg',
      'app:WebIcon': 'WebIcon.svg'
    }
    $q.iconMapFn = (iconName) => {
      const icon = appIcons[iconName as keyof IconListInterface]
      if (icon !== void 0) {
        return { icon: iconPath + icon }
      }
      return void 0
    }
  }
}

</script>
