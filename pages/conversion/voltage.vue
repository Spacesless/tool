<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'V',
    label: '伏特'
  },
  {
    value: 'mV',
    label: '毫伏特'
  },
  {
    value: 'kV',
    label: '千伏特'
  }
])
</script>
