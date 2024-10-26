<template>
  <section v-if="isIframe" class="container">
    <slot />
  </section>

  <template v-else>
    <ToolBanner />
    <slot />

    <section class="section content">
      <slot name="content" />

      <div class="content-footer">
        <p>版本：{{ route.meta?.version || 'v1.0.0' }}</p>
        <p>发布时间：{{ route.meta?.updateTime || '2023-11-19' }}</p>
      </div>
    </section>

    <ClientOnly>
      <WalineComment />
    </ClientOnly>
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

useSeoMeta({
  title: route.meta.title || '',
  description: route.meta.description?.replace('\n', '')
})

const isIframe = ref(false)

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
</style>
