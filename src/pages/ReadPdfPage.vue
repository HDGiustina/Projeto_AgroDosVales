<template>
  <q-page padding>
    <buttonComponent
      class="pdf_btn"
      label="Voltar para a Home"
      :flat="true"
      :no-caps="true"
      icon="arrow_back"
      @click="router.push({name: 'bioativas'})"
    />
    <div class="q-pa-lg main_pdf">
      <h1 class="flex flex-center text-primary text-bold text-h5 q-mb-xl q-mt-lg q-mx-auto title_pdf" style="max-width: 700px; text-align: center;">{{ titulo }}</h1>
      <q-pdfviewer v-model="show" type="html5" :src="pdfUrl" style="height: 80vh" content-style="container"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import buttonComponent from 'src/components/Button.vue'

export default defineComponent({
  name: 'ReadPdfPage',
  components: {
    buttonComponent
  },
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
.pdf_btn :nth-child(n):is(i) {
  font-size: 1rem;
}
@media screen and (max-width: 824px) {
  .title_pdf{
    font-size: 18px !important;
  }

  .main_pdf {
    padding: 16px !important;
  }
  .pdf_btn {
    font-size: 12px !important;
  }
}

@media screen and (max-width: 460px) {
  .title_pdf{
    font-size: 16px !important;
    line-height: normal;
    margin: 24px auto;
  }
}
</style>
