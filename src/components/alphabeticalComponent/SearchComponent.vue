<template>
  <section class="searchComponente">
    <main class="main_search">
      <div>
        <q-input
          outlined
          flat
          color="grey-5"
          v-model="text"
          class="search_input"
          bg-color="white"
          placeholder="Pesquisar plantas, produtores ou indústrias..."
        >
          <template v-slot:prepend>
            <q-icon class="q-mr-xs" size="md" name="search" style="font-size: 18px;"/>
          </template>
        </q-input>
      </div>
      <div class="flex flex-center q-my-lg">
        <q-tabs
          v-model="tab"
          indicator-color="transparent"
          class="search_tabs"
        >
          <q-tab class="search_tabs_item" name='plantas' label="Plantas"/>
          <q-tab class="search_tabs_item" name='produtores' label="Produtores"/>
          <q-tab class="search_tabs_item" name='industrias' label="Indústrias"/>
        </q-tabs>
      </div>
      <alphabet-component @letter-selected="onLetterSelected"/>
      <search-table-component :letter="letter" :param="text" :tab="tab"/>
    </main>
  </section>
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
<style>
.search_tabs .q-tabs__content {
  display: flex;
  gap: 1rem;
}
.search_tabs_item.q-tab--active {
  background-color: var(--color-primary) !important;
  color: white;
}
</style>

<style scoped>
.searchComponente {
  background-color: var(--color-primary-light);
  display: flex;
}

.main_search {
  max-width: var(--limit-page-width);
  margin: 0 auto;
  padding: 8rem 2rem;
}

.search_input {
  font-size: 24;
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.search_input :nth-child(n):is(div){
  height: 40px;
}

.search_tabs_item {
  background-color: white;
  border: 1px solid var(--color-gray-op);
  border-radius: 24px;
  min-height: auto;
  padding: 0.3rem 1rem;
}

@media screen and (max-width: 1024px) {
  .main_search {
    padding: 4rem 2rem;
  }
}
</style>
