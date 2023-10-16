<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ToolItem } from '@/interfaces/tool'

import tools from '@/assets/json/tools.json'

useState('tools', () => tools)
useState('allTools', () => {
  const result: Array<ToolItem> = []
  tools.forEach((item) => {
    result.push(...item.children)
  })
  return result
})
</script>

<style lang="scss">
@import url('@/assets/style/index.scss');
</style>
