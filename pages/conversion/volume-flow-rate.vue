<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'mm3/s',
    label: '立方毫米/秒'
  },
  {
    value: 'cm3/s',
    label: '立方厘米/秒'
  },
  {
    value: 'ml/s',
    label: '毫升/秒'
  },
  {
    value: 'cl/s',
    label: '厘升/秒'
  },
  {
    value: 'dl/s',
    label: '分升/秒'
  },
  {
    value: 'l/s',
    label: '升/秒'
  },
  {
    value: 'l/min',
    label: '升/分钟'
  },
  {
    value: 'l/h',
    label: '升/小时'
  },
  {
    value: 'kl/s',
    label: '千升/秒'
  },
  {
    value: 'kl/min',
    label: '千升/分钟'
  },
  {
    value: 'kl/h',
    label: '千升/小时'
  },
  {
    value: 'm3/s',
    label: '立方米/秒'
  },
  {
    value: 'm3/min',
    label: '立方米/分钟'
  },
  {
    value: 'm3/h',
    label: '立方米/小时'
  },
  {
    value: 'km3/s',
    label: '立方千米/秒'
  },
  {
    value: 'tsp/s',
    label: '一茶匙/秒'
  },
  {
    value: 'Tbs/s',
    label: '一汤匙/秒'
  },
  {
    value: 'in3/s',
    label: '立方英寸/秒'
  },
  {
    value: 'in3/min',
    label: '立方英寸/分钟'
  },
  {
    value: 'in3/h',
    label: '立方英寸/小时'
  },
  {
    value: 'fl-oz/s',
    label: '液量盎司/秒'
  },
  {
    value: 'fl-oz/min',
    label: '液量盎司/分钟'
  },
  {
    value: 'fl-oz/h',
    label: '液量盎司/小时'
  },
  {
    value: 'cup/s',
    label: '量杯/秒'
  },
  {
    value: 'pnt/s',
    label: '品脱/秒'
  },
  {
    value: 'pnt/min',
    label: '品脱/分钟'
  },
  {
    value: 'pnt/h',
    label: '品脱/小时'
  },
  {
    value: 'qt/s',
    label: '夸脱/秒'
  },
  {
    value: 'gal/s',
    label: '加仑/秒'
  },
  {
    value: 'gal/min',
    label: '加仑/分钟'
  },
  {
    value: 'gal/h',
    label: '加仑/小时'
  },
  {
    value: 'ft3/s',
    label: '立方英尺/秒'
  },
  {
    value: 'ft3/min',
    label: '立方英尺/分钟'
  },
  {
    value: 'ft3/h',
    label: '立方英尺/小时'
  },
  {
    value: 'yd3/s',
    label: '立方码/秒'
  },
  {
    value: 'yd3/min',
    label: '立方码/分钟'
  },
  {
    value: 'yd3/h',
    label: '立方码/小时'
  }
])
</script>
