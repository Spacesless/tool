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
    value: 'ppm',
    label: '百万分之一'
  },
  {
    value: 'ppb',
    label: '十亿分之一'
  },
  {
    value: 'ppt',
    label: '万亿分之一'
  },
  {
    value: 'ppq',
    label: '百万亿分之一'
  }
])
</script>
