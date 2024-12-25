<template>
  <ToolLayout>
    <ConvertContent :options="options" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '无功功率换算',
  description: 'VAR、mVAR、kVAR、MVAR、GVAR换算'
})

const options = reactive([
  {
    value: 'VAR',
    label: '伏安无功'
  },
  {
    value: 'mVAR',
    label: '毫伏安无功'
  },
  {
    value: 'kVAR',
    label: '千伏安无功'
  },
  {
    value: 'MVAR',
    label: '兆伏安无功'
  },
  {
    value: 'GVAR',
    label: '吉伏安无功'
  }
])
</script>
