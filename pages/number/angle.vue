<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '角度换算 ',
  description: 'deg、rad、grad、arcmin、arcsec换算',
  updateTime: '2023-11-26'
})

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
