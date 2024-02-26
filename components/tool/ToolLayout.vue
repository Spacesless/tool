<template>
  <section v-if="isIframe" class="container">
    <slot />
  </section>

  <template v-else>
    <ToolBanner :tool-data="toolData" />
    <slot />

    <section class="section content">
      <slot name="content" />

      <div class="content-footer">
        <p>版本：{{ toolData.version || 'v1.0.0' }}</p>
        <p>发布时间：{{ toolData.updateTime || '2023-11-19' }}</p>
      </div>
    </section>

    <ClientOnly>
      <WalineComment />
    </ClientOnly>
  </template>
</template>

<script setup lang="ts">
const { toolData } = useToolData()

const route = useRoute()
const colorMode = useColorMode()

const isIframe = ref(false)

onBeforeMount(() => {
  const { iframe, theme } = route.query || {}

  if (iframe) {
    setPageLayout(false)
    isIframe.value = true
  } else {
    setPageLayout('default')
  }

  if (theme === 'dark') {
    colorMode.value = 'dark'
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
