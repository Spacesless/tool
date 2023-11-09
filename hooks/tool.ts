import { ToolItem } from '@/types/tool'

export function useToolData (path: string) {
  const toolPath = path.split('/').pop()
  const allTools = useState('allTools', (): Array<ToolItem> => [])

  const currentTool = ref<ToolItem>({
    name: ''
  })
  const sameTools = reactive([])

  currentTool.value = allTools.value.find(element => element.path === toolPath)

  return {
    currentTool,
    sameTools
  }
}
