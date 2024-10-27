<template>
  <section v-if="isIframe" class="container">
    <slot />
  </section>

  <template v-else>
    <ToolBanner />

    <slot />

    <section class="section content">
      <h2 class="section__title">
        工具简介
      </h2>

      <slot name="content">
        <p>很抱歉，你要找的简介内容不见了，因为站长太懒，懒得写了~</p>
      </slot>

      <div class="content-footer">
        <p>版本：{{ route.meta?.version || 'v1.0.0' }}</p>
        <p>更新时间：{{ route.meta?.updateTime || '2023-11-19' }}</p>
      </div>
    </section>

    <section v-if="sameList.children.length" class="section">
      <h2 class="section__title">
        相关工具
      </h2>

      <ToolList :tool="sameList" :is-same-list="true" />
    </section>

    <ClientOnly>
      <WalineComment />
    </ClientOnly>
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routes = router.getRoutes()
const colorMode = useColorMode()

useSeoMeta({
  title: route.meta.title || '',
  description: route.meta.description?.replace('\n', '')
})

const isIframe = ref(false)

const sameList = computed(() => {
  return {
    children: routes.filter(item => route.meta.same?.includes(item.name as string))
  }
})

onMounted(() => {
  const { iframe, theme } = route.query || {}

  if (iframe) {
    setPageLayout(false)
    isIframe.value = true
  } else {
    setPageLayout('default')
  }

  colorMode.preference = theme === 'dark' ? 'dark' : 'light'
})
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}

:deep(.card-item) {
  margin-top: 12px;
  margin-bottom: 0;
  background-color: var(--el-color-primary-light-9);
}

:deep(.card-header) {
  padding-top: 0;
}

:deep(.card-header__count) {
  top: -16px;
}
</style>
