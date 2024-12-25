<template>
  <ToolLayout>
    <ConvertContent :options="options" default-unit="kg" />
  </ToolLayout>
</template>

<script setup lang="ts">
import ConvertContent from './components/-ConvertContent.vue'

definePageMeta({
  title: '质量换算',
  description: 'mcg、mg、g、kg、lb、oz、mt、t换算'
})

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
