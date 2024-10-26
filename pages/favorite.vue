<template>
  <div class="favorite">
    <ToolList :tool="toolData" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '我的收藏',
  icon: 'clarity:favorite-line',
  order: 1
})

useSeoMeta({
  title: '我的收藏',
  description: '一个安全免费无需登录的在线工具箱，数据全部在客户端处理。'
})

const router = useRouter()
const routes = router.getRoutes()
const favoriteTools = useState('favoriteTools', (): string[] => [])

const toolData = computed(() => {
  return {
    meta: {
      title: '我的收藏'
    },
    children: routes.filter(item => favoriteTools.value.includes(item.name as string))
  }
})
</script>
