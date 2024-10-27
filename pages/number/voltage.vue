<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="V" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '电压换算',
  description: 'V、mV、kV换算'
})

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
