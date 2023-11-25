<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="d" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

const options = reactive([
  {
    value: 'V',
    label: '伏特'
  },
  {
    value: 'mV',
    label: '毫伏特'
  },
  {
    value: 'kV',
    label: '千伏特'
  }
])
</script>
