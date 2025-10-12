<template>
  <q-page padding>
    <q-btn flat round size="md" icon="mdi-arrow-left" @click="router.push({name: 'bioativas'})"></q-btn>
    <div style="padding-left: 5%; padding-right: 5%; padding-bottom: 5%">
      <div class="flex flex-center text-white text-bold text-h6" style="background-color: #006334; height: 40px; border-radius: 10px">{{ titulo }}</div>
      <q-pdfviewer v-model="show" type="html5" :src="pdfUrl" style="height: 80vh" content-style="container"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'ReadPdfPage',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const titulo = ref<string>('')
    const pdfUrl = ref<string>('')
    const show = ref<boolean>(true)

    onMounted(() => {
      if (route.query.descricao && route.query.arquivo) {
        titulo.value = route.query.descricao.toString()
        pdfUrl.value = route.query.arquivo.toString()
      }
    })

    return {
      router,
      titulo,
      pdfUrl,
      show
    }
  }
})
</script>

<style>
.container {
}
</style>
