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
      doc: `1
2
3
4
5
6`,
      extensions: basicSetup
    },
    b: {
      doc: `1
3
3
4
5
6`,
      extensions: basicSetup
    },
    parent: document.getElementById('codemirror') || undefined
  })
})
</script>

<style lang="scss" scoped>
.codemirror {
  height: 600px;
  overflow-y: auto;
}
</style>
