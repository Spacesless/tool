<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

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
