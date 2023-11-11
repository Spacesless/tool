<template>
  <div id="editor" />
</template>

<script setup lang="ts">
import { basicSetup, EditorView } from 'codemirror'

let editorInstance
onMounted(() => {
  editorInstance = new EditorView({
    doc: "console.log('hello')\n",
    extensions: [basicSetup],
    parent: document.getElementById('app')
  })
})
</script>
