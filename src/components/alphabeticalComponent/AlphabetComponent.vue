<template>
  <div class="row flex flex-center">
    <div v-for="(letter, index) in alphabet" :key="index">
      <q-btn
        :class="letter === letterActive ? 'alpha_btn' : ''"
        round
        flat
        :label="letter"
        @click="emitLetterActive(letter)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AlphabetComponent',
  setup (_, { emit }) {
    const letterActive = ref('')
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    const emitLetterActive = (letter: string) => {
      letterActive.value = letter === letterActive.value ? '' : letter
      emit('letter-selected', letterActive.value)
    }

    return {
      letterActive,
      alphabet,
      emitLetterActive
    }
  }
})
</script>

<style>
.alpha_btn {
  background-color: var(--color-primary);
  color: white;
}
</style>
