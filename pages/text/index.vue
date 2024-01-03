<template>
  <div class="list main">
    <ToolList :tool="findTool" />
  </div>
</template>

<script lang="ts" setup>
import { ToolCategory } from '@/types/tool'

const route = useRoute()
const toolList = useState('tools', (): ToolCategory => [])
const findTool = computed(() => {
  return toolList.value.find(item => item.path === route.name) || { name: '', description: '' }
})

useSeoMeta({
  title: `${findTool.value.name} - 一个安全免费的工具箱`,
  description: findTool.value.description?.replace('\n', '')
})
</script>
