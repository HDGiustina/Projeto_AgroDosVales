<template>
  <div class="column fullscreen bg-blue text-white flex flex-center">
    <p class="q-pb-xl" style="font-size: 30vh"> 404</p>
    <p class="q-pt-xl text-h2" style="opacity:.4">
      Oops. Nothing here...
    </p>

    <q-btn
      class="q-mt-xl"
      color="white"
      text-color="blue"
      unelevated
      to="/home"
      label="Go Home"
      no-caps
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
