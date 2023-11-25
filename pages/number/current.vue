<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

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
