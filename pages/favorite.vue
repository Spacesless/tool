<template>
  <div class="favorite">
    <ToolList :tool="toolData" />
  </div>
</template>

<script setup lang="ts">
import { ToolItem } from '@/types/tool'

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
