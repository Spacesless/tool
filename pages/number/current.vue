<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '电流换算',
  description: 'A、mA、kA换算'
})

const options = reactive([
  {
    value: 'A',
    label: '安培'
  },
  {
    value: 'mA',
    label: '毫安培'
  },
  {
    value: 'kA',
    label: '千安培'
  }
])
</script>
