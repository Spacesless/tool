<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="km2" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '面积换算',
  description: 'mm2、cm2、m2、ha、km2、in2、ft2、ac、mi2换算'
})

const options = reactive([
  {
    value: 'mm2',
    label: '平方毫米'
  },
  {
    value: 'cm2',
    label: '平方厘米'
  },
  {
    value: 'm2',
    label: '平方米'
  },
  {
    value: 'ha',
    label: '公顷'
  },
  {
    value: 'km2',
    label: '平方千米'
  },
  {
    value: 'in2',
    label: '平方英寸'
  },
  {
    value: 'ft2',
    label: '平方英尺'
  },
  {
    value: 'ac',
    label: '英亩'
  },
  {
    value: 'mi2',
    label: '平方英里'
  }
])
</script>
