<template>
  <q-btn
    :label="label"
    :color="color"
    :size="size"
    :icon="iconProp"
    :icon-right="iconRight"
    :outline="outline"
    :round="round"
    :rounded="rounded"
    :dense="dense"
    :flat="flat"
    :disable="disabled"
    :loading="loading"
    :no-caps="nocaps"
    :type="type"
    :form="form"
    @click="$emit('click')"
    class="btn-default"
  >
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'

export default defineComponent({
  name: 'MyButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: undefined
    },
    iconRight: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    type: {
      type: String,
      default: ''
    },
    form: {
      type: String,
      default: ''
    },
    nocaps: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const iconProp = toRef(props, 'icon')

    const hasIcon = computed(() => !!iconProp.value)

    return {
      iconProp,
      hasIcon
    }
  }
})
</script>

<style scoped>
.btn-default {
  border-radius: 8px;
  padding: 10px 20px;
}
</style>
