import { ToolItem } from '@/types/tool'

export function useToolData (path?: string) {
  const route = useRoute()
  if (!path) {
    path = route.path
  }

  const allTools = useState('allTools', (): Array<ToolItem> => [])

  const toolData = ref<ToolItem>({
    id: '',
    name: '',
    description: '',
    path: ''
  })
  const sameTools = reactive([])
  toolData.value = allTools.value.find(element => element.path === path) || { id: '', name: '', description: '', path: '' }

  const { name, description } = toolData.value

  useSeoMeta({
    title: `${name} - 一个安全免费的工具箱`,
    description: description?.replace('\n', '')
  })

  return {
    toolData,
    sameTools
  }
}
