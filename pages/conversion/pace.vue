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
    value: 's/m',
    label: '米/秒'
  },
  {
    value: 'min/km',
    label: '千米/分钟'
  },
  {
    value: 's/ft',
    label: '英尺/秒'
  },
  {
    value: 'min/mi',
    label: '英里/分钟'
  }
])
</script>
