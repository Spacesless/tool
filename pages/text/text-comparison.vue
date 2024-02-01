<template>
  <ToolLayout>
    <section class="section">
      <div id="codemirror" class="codemirror" />
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { MergeView } from '@codemirror/merge'
import { basicSetup } from 'codemirror'

onMounted(() => {
  // eslint-disable-next-line no-new
  new MergeView({
    a: {
      doc: '',
      extensions: basicSetup
    },
    b: {
      doc: '',
      extensions: basicSetup
    },
    parent: document.getElementById('codemirror')
  })
})
</script>

<style lang="scss" scoped>
.codemirror {
  height: 600px;
}
</style>
