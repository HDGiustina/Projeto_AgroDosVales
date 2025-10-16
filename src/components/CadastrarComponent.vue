<template>
  <div class="flex flex-center column cadastrar_banner">
    <h1 class="q-mb-none">Quer fazer parte da comunidade?</h1>
    <p class="q-my-none">Conecte-se com produtores, pesquisadores e indústrias do setor.</p>
    <buttonComponent
      label="Quero me inscrever"
      class=" text-black q-mt-sm"
      :outline="false"
      color="white"
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
    return {
      router
    }
  }
})
</script>

<style scoped>
.cadastrar_banner {
  background-color: var(--color-primary);
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.cadastrar_banner h1 {
  font-size: 28px;
  color: var(--color-white);
  line-height: 1.2;
  text-align: center;
}

.cadastrar_banner p {
  font-size: 16px;
  color: var(--color-white);
  text-align: center;
}

@media screen and (max-width: 880px) {
  .cadastrar_banner {
    padding: 6rem 3rem;
  }
}

@media screen and (max-width: 480px) {
  .cadastrar_banner {
    padding: 5rem 2rem;
  }
  .cadastrar_banner h1 {
    font-size: 22px;
  }

  .cadastrar_banner p {
    font-size: 12px;
  }
}
</style>
