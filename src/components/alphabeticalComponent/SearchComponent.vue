<template>
  <div class="flex flex-center q-my-lg">
    <q-input
      rounded
      flat
      color="grey-9"
      v-model="text"
      style="font-size: 30px; width: 87vw"
      standout="bg-green-3"
      clearable
    >
      <template v-slot:append>
        <q-icon class="q-mr-md" size="md" name="search"/>
      </template>
    </q-input>
  </div>
  <div class="flex flex-center q-my-lg">
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      content-class="rounded-tabs"
    >
      <q-tab name='plantas' label="Plantas"/>
      <q-tab name='produtores' label="Produtores"/>
      <q-tab name='industrias' label="Indústrias"/>
    </q-tabs>
  </div>
  <alphabet-component @letter-selected="onLetterSelected"/>
  <search-table-component :letter="letter" :param="text" :tab="tab"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AlphabetComponent from 'components/alphabeticalComponent/AlphabetComponent.vue'
import SearchTableComponent from 'components/alphabeticalComponent/SearchTableComponent.vue'

export default defineComponent({
  name: 'SearchComponent',
  components: { SearchTableComponent, AlphabetComponent },
  setup () {
    const text = ref('')
    const tab = ref('plantas')
    const letter = ref('')
    const onLetterSelected = (letterSelected: string) => {
      letter.value = letterSelected
    }
    return {
      text,
      tab,
      letter,
      onLetterSelected
    }
  }
})
</script>
<style scoped>
.rounded-tabs .q-tab {
  background-color: rgba(245, 245, 245, 1);
  color: rgba(0, 99, 52, 1);
  border-radius: 25px;
  margin: 0 10px;
  width: 150px;
  height: 5vh;
  min-height: 5vh;
  padding: 0;
}

.rounded-tabs .q-tab--active {
  background-color: rgba(123, 181, 66, 1);
  color: white;
  margin: 0 10px;
  width: 150px;
  height: 5vh;
  min-height: 5vh;
  padding: 0;
}
</style>
