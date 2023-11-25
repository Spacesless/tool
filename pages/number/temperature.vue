<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const options = reactive([
  {
    value: 'C',
    label: '摄氏度'
  },
  {
    value: 'F',
    label: '华氏度'
  },
  {
    value: 'K',
    label: '开尔文'
  },
  {
    value: 'R',
    label: '兰氏度'
  }
])
</script>
