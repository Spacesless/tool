<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" default-unit="km/h" :default-value="666" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'm/s',
    label: '米/秒'
  },
  {
    value: 'km/h',
    label: '千米/秒'
  },
  {
    value: 'm/h',
    label: '米/每小时'
  },
  {
    value: 'knot',
    label: '节'
  },
  {
    value: 'ft/s',
    label: '英尺/秒'
  }
])
</script>
