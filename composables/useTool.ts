import { ToolItem } from '@/types/tool'

export function useToolData (path?: string) {
  const route = useRoute()
  if (!path) {
    path = route.path
  }

  const allTools = useState('allTools', (): Array<ToolItem> => [])

  const sameTools = reactive([])
  const toolData = computed(() => {
    return allTools.value.find(element => element.path === path) || { id: '', name: '', description: '', path: '' }
  })

  const { name, description } = toolData.value

  useSeoMeta({
    title: name,
    description: description?.replace('\n', '')
  })

  return {
    toolData,
    sameTools
  }
}
