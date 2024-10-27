<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '视在功率换算',
  description: 'VA、mVA、kVA、MVA、GVA换算',
  same: ['number-power', 'number-current', 'number-voltage', 'number-energy']
})

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
