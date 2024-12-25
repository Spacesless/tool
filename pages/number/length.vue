<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="m" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '长度换算',
  description: 'mm、cm、m、in、ft-us、ft、mi换算'
})

const options = reactive([
  {
    value: 'mm',
    label: '毫米'
  },
  {
    value: 'cm',
    label: '厘米'
  },
  {
    value: 'm',
    label: '米'
  },
  {
    value: 'in',
    label: '英寸'
  },
  {
    value: 'ft-us',
    label: '美国测量英尺'
  },
  {
    value: 'ft',
    label: '英尺'
  },
  {
    value: 'mi',
    label: '英里'
  }
])
</script>
