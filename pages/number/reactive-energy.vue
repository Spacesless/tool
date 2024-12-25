<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '无功能量换算',
  description: 'VARh、mVARh、kVARh、MVARh、GVARh换算'
})

const options = reactive([
  {
    value: 'VARh',
    label: '伏安无功小时'
  },
  {
    value: 'mVARh',
    label: '毫伏安无功小时'
  },
  {
    value: 'kVARh',
    label: '千伏安无功小时'
  },
  {
    value: 'MVARh',
    label: '兆伏安无功小时'
  },
  {
    value: 'GVARh',
    label: '千兆伏安无功小时'
  }
])
</script>
