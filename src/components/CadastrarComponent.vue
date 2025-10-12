<template>
  <div style="background-color: rgba(123, 181, 66, 0.1); height:220px " class="flex flex-center column">
    <p class="q-mb-none" style="color: #5A645B">Quer fazer parte da comunidade?</p>
    <h6 style="font-size: 25px; color: #5A645B" class="q-my-none text-bold">Inscreva-se agora mesmo</h6>
    <buttonComponent
      label="Quero me inscrever"
      class="q-mt-md text-weight-bold"
      size="18px"
      :outline="false"
      @click="router.push({name: 'cadastro'})"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import buttonComponent from 'src/components/Button.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'CadastrarComponent',
  components: {
    buttonComponent
  },
  setup () {
    const router = useRouter()
    const openDialogLogin = () => {
      window.alert('esse é o pop de login')
    }
    return {
      router,
      openDialogLogin
    }
  }
})
</script>
