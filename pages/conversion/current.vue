<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'A',
    label: '安培'
  },
  {
    value: 'mA',
    label: '毫安培'
  },
  {
    value: 'kA',
    label: '千安培'
  }
])
</script>
