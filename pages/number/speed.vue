<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="km/h" :default-value="666" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from '@/components/tool/ConvertContent.vue'

definePageMeta({
  title: '速度换算',
  description: 'm/s、km/h、m/h、knot、ft/s换算'
})

const options = reactive([
  {
    value: 'm/s',
    label: '米/秒'
  },
  {
    value: 'km/h',
    label: '千米/秒'
  },
  {
    value: 'm/h',
    label: '米/每小时'
  },
  {
    value: 'knot',
    label: '节'
  },
  {
    value: 'ft/s',
    label: '英尺/秒'
  }
])
</script>
