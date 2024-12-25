<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '配速换算',
  description: 's/m、min/km、s/ft、min/mi换算'
})

const options = reactive([
  {
    value: 's/m',
    label: '米/秒'
  },
  {
    value: 'min/km',
    label: '千米/分钟'
  },
  {
    value: 's/ft',
    label: '英尺/秒'
  },
  {
    value: 'min/mi',
    label: '英里/分钟'
  }
])
</script>
