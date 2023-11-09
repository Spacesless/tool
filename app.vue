<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ToolItem } from '@/types/tool'

import tools from '@/router'

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
