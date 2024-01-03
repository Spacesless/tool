<template>
  <div class="favorite">
    <ToolList :tool="toolData" />
  </div>
</template>

<script setup lang="ts">
import { ToolItem } from '@/types/tool'

useSeoMeta({
  title: '我的收藏 - 一个安全免费的工具箱',
  description: '一个安全免费无需登录的在线工具箱，数据全部在客户端处理。'
})

const allTools = useState('allTools', (): Array<ToolItem> => [])
const favoriteTools = useState('favoriteTools', (): string[] => [])

const toolData = computed(() => {
  return {
    name: '我的收藏',
    description: '',
    children: allTools.value.filter(item => favoriteTools.value.includes(item.id))
  }
})
</script>
