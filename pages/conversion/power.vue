<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'W',
    label: '瓦特'
  },
  {
    value: 'mW',
    label: '姆瓦特'
  },
  {
    value: 'kW',
    label: '千瓦特'
  },
  {
    value: 'MW',
    label: '兆瓦特'
  },
  {
    value: 'GW',
    label: '千兆瓦'
  }
])
</script>
