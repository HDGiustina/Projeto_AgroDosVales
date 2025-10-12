<template>
  <div ref="autocomplete" @keydown.enter.prevent="showOptions = false" @keydown.esc.prevent="showOptions = false">
    <q-input
      v-model="inputValue"
      outlined
      dense
      :loading="loadingFields"
      :disable="disabledFields"
      rounded
      style="width: 70vw"
      class="inputCard q-my-xs"
      :label="label ? label : 'Indicação'"
      @focusin="showOptions = true"
      @update:model-value="updateValue"
    />
    <q-list class="autocomplete" v-if="showOptions && !loading">
      <q-item
        v-for="(option, index) in filteredOptions"
        :key="index"
        clickable
        v-close-popup
        @click="selectOption(option)"
      >
        <q-item-section>{{ option.descricao }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    loadingFields: {
      type: Boolean,
      default: false
    },
    disabledFields: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      inputValue: this.modelValue,
      showOptions: false
    }
  },
  computed: {
    filteredOptions () {
      return this.options.filter(option =>
        option.descricao.toLowerCase().includes(this.inputValue.toLowerCase())
      )
    }
  },
  watch: {
    modelValue (newVal) {
      if (newVal === '') {
        this.inputValue = newVal
      }
    },
    inputValue (newVal) {
      this.updateOptionsVisibility(newVal)
    }
  },
  methods: {
    updateValue () {
      this.$emit('update:modelValue', this.inputValue)
    },
    updateOptionsVisibility (value) {
      this.showOptions = value.length > 0 && this.filteredOptions.length > 0
    },
    selectOption (option) {
      this.inputValue = option.descricao
      this.showOptions = false
      this.$emit('update:modelValue', this.inputValue)
    },
    handleClickOutside (event) {
      const { target } = event
      const { autocomplete } = this.$refs
      if (autocomplete && !autocomplete.contains(target)) {
        this.showOptions = false
      }
    }
  },
  mounted () {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
}
</script>

<style scoped>
.autocomplete {
  background-color: white;
  max-height: 40vh;
  overflow-y: auto;
  z-index: 99;
  border: 2px solid #ECECEC;
  border-radius: 10px;
  position: absolute;
  width: 70vw;
}
</style>
