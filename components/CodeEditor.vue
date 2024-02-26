<template>
  <codemirror
    v-model="input"
    :style="{
      height: props.height + 'px',
      lineBreak: 'auto',
    }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { html } from '@codemirror/lang-html'
import { xml } from '@codemirror/lang-xml'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 500
  }
})
const emit = defineEmits(['update:code'])

const colorMode = useColorMode()
const dark = computed(() => (colorMode.value === 'dark'))
const input = ref()

watch(() => props.code, (val) => {
  input.value = val
})
watch(() => input.value, (val) => {
  emit('update:code', val)
})

const extensions = computed((): any => {
  const result = [basicSetup, EditorView.lineWrapping]
  if (dark.value) {
    result.push(oneDark)
  }
  if (props.lang === 'html') {
    result.push(html())
  }
  if (props.lang === 'xml') {
    result.push(xml())
  }
  if (props.lang === 'css') {
    result.push(css())
  }
  if (props.lang === 'javascript') {
    result.push(javascript())
  }
  return result
})
</script>
