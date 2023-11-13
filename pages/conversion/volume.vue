<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" default-unit="l" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

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
