<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'deg',
    label: '度'
  },
  {
    value: 'rad',
    label: '弧度'
  },
  {
    value: 'grad',
    label: '梯度'
  },
  {
    value: 'arcmin',
    label: '角分'
  },
  {
    value: 'arcsec',
    label: '角秒'
  }
])
</script>
