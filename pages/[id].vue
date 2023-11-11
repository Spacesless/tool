<template>
  <div class="list main">
    <ToolList :tool="findTool" />
  </div>
</template>

<script lang="ts" setup>
import ToolList from '@/components/tool/ToolList.vue'
import { ToolCategory } from '@/types/tool'

const route = useRoute()
const toolList = useState('tools', (): ToolCategory => [])
const findTool = computed(() => {
  return toolList.value.find(item => item.path === route.params.id) || { name: '', path: '', children: [] }
})
</script>
