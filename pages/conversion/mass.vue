<template>
  <ToolBanner :current-tool="currentTool" />

  <ConvertContent :options="options" default-unit="kg" />
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const options = reactive([
  {
    value: 'mcg',
    label: '微克'
  },
  {
    value: 'mg',
    label: '毫克'
  },
  {
    value: 'g',
    label: '克'
  },
  {
    value: 'kg',
    label: '千克'
  },
  {
    value: 'lb',
    label: '磅'
  },
  {
    value: 'oz',
    label: '盎司'
  },
  {
    value: 'mt',
    label: '公吨'
  },
  {
    value: 't',
    label: '吨'
  }
])
</script>
