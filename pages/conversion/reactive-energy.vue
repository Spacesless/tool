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
