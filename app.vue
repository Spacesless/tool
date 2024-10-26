<template>
  <el-config-provider :locale="zhCn">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

useHead({
  titleTemplate: title => `${title} - 一个安全免费的工具箱`,
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const favoriteTools = useState('favoriteTools', (): string[] => [])

onBeforeMount(() => {
  const storeTools = localStorage.getItem('favoriteTools')

  favoriteTools.value = storeTools?.split(',') || []
})
</script>

<style lang="scss">
@import url('@/assets/style/index.scss');
</style>
