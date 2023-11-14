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
