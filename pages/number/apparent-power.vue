<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const options = reactive([
  {
    value: 'VA',
    label: '伏安'
  },
  {
    value: 'mVA',
    label: '毫伏安'
  },
  {
    value: 'kVA',
    label: '千伏安'
  },
  {
    value: 'MVA',
    label: '兆伏安'
  },
  {
    value: 'GVA',
    label: '千兆伏安'
  }
])
</script>
