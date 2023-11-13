<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" default-unit="MB" />
</template>

<script setup lang="ts">
import ConvertContent from './components/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'b',
    label: '比特'
  },
  {
    value: 'Kb',
    label: '千比特'
  },
  {
    value: 'Mb',
    label: '兆比特'
  },
  {
    value: 'Gb',
    label: '千兆比特'
  },
  {
    value: 'Tb',
    label: '太比特'
  },
  {
    value: 'B',
    label: '字节'
  },
  {
    value: 'KB',
    label: '千字节'
  },
  {
    value: 'MB',
    label: '兆字节'
  },
  {
    value: 'GB',
    label: '千兆字节'
  },
  {
    value: 'TB',
    label: '太字节'
  }
])
</script>
