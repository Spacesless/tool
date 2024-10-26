<template>
  <div v-if="isShowList" class="list main">
    <ToolList :tool="findTool" />
  </div>

  <NuxtPage />
</template>

<script lang="ts" setup>
const route = useRoute()

const findTool = computed(() => {
  return route.matched[0]
})

const isShowList = computed(() => {
  return route.path.split('/').length === 2
})

useSeoMeta({
  title: findTool.value.meta.title || '',
  description: findTool.value.meta.description?.replace('\n', '')
})
</script>
