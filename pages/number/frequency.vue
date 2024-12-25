<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '频率换算',
  description: 'Hz、mHz、kHz、MHz、GHz、THz、rpm、deg/s、rad/s换算'
})

const options = reactive([
  {
    value: 'Hz',
    label: '赫兹'
  },
  {
    value: 'mHz',
    label: '毫赫兹'
  },
  {
    value: 'kHz',
    label: '千赫兹'
  },
  {
    value: 'MHz',
    label: '百万赫兹'
  },
  {
    value: 'GHz',
    label: '千兆赫兹'
  },
  {
    value: 'THz',
    label: '太赫兹'
  },
  {
    value: 'rpm',
    label: '转/分钟'
  },
  {
    value: 'deg/s',
    label: '度/秒'
  },
  {
    value: 'rad/s',
    label: '弧度/秒'
  }
])
</script>
