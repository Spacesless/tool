<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

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
