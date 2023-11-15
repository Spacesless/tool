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
    value: 'VAR',
    label: '伏安无功'
  },
  {
    value: 'mVAR',
    label: '毫伏安无功'
  },
  {
    value: 'kVAR',
    label: '千伏安无功'
  },
  {
    value: 'MVAR',
    label: '兆伏安无功'
  },
  {
    value: 'GVAR',
    label: '吉伏安无功'
  }
])
</script>
