<template>
  <el-config-provider :locale="zhCn">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ToolItem } from '@/types/tool'
import tools from '@/router'

useHead({
  titleTemplate: title => `${title} - 一个安全免费的工具箱`,
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useState('tools', () => tools)
useState('allTools', () => {
  const result: Array<ToolItem> = []
  tools.forEach((item) => {
    const children = item.children.map(child => ({
      ...child,
      path: `/${item.path}/${child.path}`
    }))
    result.push(...children)
  })
  return result
})
const favoriteTools = useState('favoriteTools', (): string[] => [])

onBeforeMount(() => {
  const storeTools = localStorage.getItem('favoriteTools')

  favoriteTools.value = storeTools?.split(',') || []
})
</script>

<style lang="scss">
@import url('@/assets/style/index.scss');
</style>
