<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '温度换算',
  description: '摄氏度、华氏度、开尔文、兰氏度换算'
})

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
