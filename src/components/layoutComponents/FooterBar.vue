<template>
  <q-footer style="background-color: rgba(247, 245, 245, 0.726)" class="flex">
      <q-toolbar class="q-ml-md q-mt-lg">
        <q-toolbar-title class="q-mb-md">
            <q-img src="../../assets/agroVales.png" fit="contain" width="200px" loading="eager"/>
        </q-toolbar-title>
      </q-toolbar>
      <div class="row" style="display: flex; flex-wrap: wrap">
        <div class="column col" style="min-width: 20vw">
          <p style="color: #5A645B; font-weight: 600" class="q-ml-lg">Inova RS</p>
          <p style="color: #5A645B; font-weight: 400" class="q-ml-lg">CEP: 90020-020</p>
          <p style="color: #5A645B; font-weight: 400" class="q-ml-lg">CNPJ: 52.624.053/0001-06</p>
          <p style="color: #5A645B; font-weight: 400" class="q-ml-lg">Av. Borges de Medeiros, 1.501, Praia de Belas</p>
          <p style="color: #5A645B; font-weight: 400" class="q-ml-lg">Centro Administrativo Fernando Ferrari, 18º andar</p>
        </div>
        <div class="column col" style="min-width: 20vw">
          <p style="font-weight: bold; color: #5A645B">Sobre o Inova RS</p>
          <p style="color: #5A645B; font-weight: 400">Localização</p>
          <p style="color: #5A645B; font-weight: 400">Quem somos</p>
          <p style="color: #5A645B; font-weight: 400">Acesso à informação</p>
          <p style="color: #5A645B; font-weight: 400">Proteção de Dados Pessoais</p>
        </div>
        <div class="column col" style="min-width: 20vw">
          <p style="font-weight: bold; color: #5A645B">Nos siga nas redes sociais</p>
          <div class="row">
            <q-icon name="app:WebIcon" size="20px" class="q-mr-xs" color="black"/>
            <a style="color: #5A645B; text-decoration: none; font-weight: 400; font-size: 16px;" href="https://www.inova.rs.gov.br/conheca-inova-rs" target="_blank">Acompanhe nosso site</a>
          </div>
        </div>
        <div class="column col" style="min-width: 20vw">
          <p style="font-weight: bold; color: #5A645B">Conatate Inova</p>
          <div class="row">
            <q-icon name="app:Email" size="20px" class="q-mr-xs" color="black"/>
            <a style="color: #5A645B; text-decoration: none; font-weight: 400; font-size: 16px;" href="https://www.inovars/facebook" target="_blank">agrodosvales@gmail.com</a>
          </div>
        </div >
      </div>
    </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterBar'
})
</script>
