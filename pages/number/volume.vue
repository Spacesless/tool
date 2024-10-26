<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="l" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '体积换算',
  description: '立方毫米、立方厘米、毫升、升、千升、立方米、立方千米、茶匙、立方英寸、液量盎司、杯子、品脱、夸特、加仑、立方码、立方英尺换算'
})

const options = reactive([
  {
    value: 'mm3',
    label: '立方毫米'
  },
  {
    value: 'cm3',
    label: '立方厘米'
  },
  {
    value: 'ml',
    label: '毫升'
  },
  {
    value: 'l',
    label: '升'
  },
  {
    value: 'kl',
    label: '千升'
  },
  {
    value: 'm3',
    label: '立方米'
  },
  {
    value: 'km3',
    label: '立方千米'
  },
  {
    value: 'tsp',
    label: '茶匙'
  },
  {
    value: 'in3',
    label: '立方英寸'
  },
  {
    value: 'fl-oz',
    label: '液量盎司'
  },
  {
    value: 'cup',
    label: '杯子'
  },
  {
    value: 'pnt',
    label: '品脱'
  },
  {
    value: 'qt',
    label: '夸特'
  },
  {
    value: 'gal',
    label: '加仑'
  },
  {
    value: 'yd3',
    label: '立方码'
  },
  {
    value: 'ft3',
    label: '立方英尺'
  }
])
</script>
