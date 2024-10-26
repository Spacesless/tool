<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>
<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '压力换算',
  description: '支持Pa、kPa、MPa等压力单位换算'
})

const options = reactive([
  {
    value: 'Pa',
    label: '帕'
  },
  {
    value: 'hPa',
    label: '百帕'
  },
  {
    value: 'kPa',
    label: '千帕'
  },
  {
    value: 'MPa',
    label: '兆帕'
  },
  {
    value: 'bar',
    label: '巴'
  },
  {
    value: 'torr',
    label: '托'
  },
  {
    value: 'psi',
    label: '平方英寸/磅数'
  },
  {
    value: 'ksi',
    label: '平方英寸/千磅'
  }
])
</script>
