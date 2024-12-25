<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '功率换算',
  description: '支持W、mW、kW、MW、GW功率单位换算'
})

const options = reactive([
  {
    value: 'W',
    label: '瓦特'
  },
  {
    value: 'mW',
    label: '姆瓦特'
  },
  {
    value: 'kW',
    label: '千瓦特'
  },
  {
    value: 'MW',
    label: '兆瓦特'
  },
  {
    value: 'GW',
    label: '千兆瓦'
  }
])
</script>
