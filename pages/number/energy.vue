<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '能量换算',
  description: 'Wh、mWh、kWh、MWh、GWh、J、kJ换算'
})

const options = reactive([
  {
    value: 'Wh',
    label: '瓦时'
  },
  {
    value: 'mWh',
    label: '毫瓦时'
  },
  {
    value: 'kWh',
    label: '千瓦时'
  },
  {
    value: 'MWh',
    label: '兆瓦时'
  },
  {
    value: 'GWh',
    label: '千兆瓦时'
  },
  {
    value: 'J',
    label: '焦耳'
  },
  {
    value: 'kJ',
    label: '千焦耳'
  }
])
</script>
