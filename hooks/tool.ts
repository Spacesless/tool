import { ToolItem } from '@/types/tool'

export function useToolData (path?: string) {
  const route = useRoute()
  if (!path) {
    path = route.path
  }

  const allTools = useState('allTools', (): Array<ToolItem> => [])

  const currentTool = ref<ToolItem | {}>({
    name: '',
    path: ''
  })
  const sameTools = reactive([])
  currentTool.value = allTools.value.find(element => element.path === path) || {}

  return {
    currentTool,
    sameTools
  }
}
