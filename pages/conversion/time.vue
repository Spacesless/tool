<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" default-unit="d" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'ns',
    label: '纳秒'
  },
  {
    value: 'mu',
    label: '微秒'
  },
  {
    value: 'ms',
    label: '毫秒'
  },
  {
    value: 's',
    label: '秒'
  },
  {
    value: 'min',
    label: '分钟'
  },
  {
    value: 'h',
    label: '小时'
  },
  {
    value: 'd',
    label: '天'
  },
  {
    value: 'week',
    label: '周'
  },
  {
    value: 'month',
    label: '月'
  },
  {
    value: 'year',
    label: '年'
  }
])
</script>
