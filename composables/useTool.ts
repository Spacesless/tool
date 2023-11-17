import { ToolItem } from '@/types/tool'

export function useToolData (path?: string) {
  const route = useRoute()
  if (!path) {
    path = route.path
  }

  const allTools = useState('allTools', (): Array<ToolItem> => [])

  const currentTool = ref<ToolItem | { name: '', description: '' }>({
    name: '',
    description: '',
    path: ''
  })
  const sameTools = reactive([])
  currentTool.value = allTools.value.find(element => element.path === path) || { name: '', description: '' }

  const { name, description } = currentTool.value

  useSeoMeta({
    title: `${name} - 一个安全免费的工具箱`,
    description: description?.replace('\n', '')
  })

  return {
    currentTool,
    sameTools
  }
}
