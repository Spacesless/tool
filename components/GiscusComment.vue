<template>
  <section class="section">
    <Giscus
      id="comments"
      repo="Spacesless/tool-comment"
      repo-id="R_kgDOKszJ0Q"
      category="General"
      category-id="DIC_kwDOKszJ0c4CbYcb"
      mapping="pathname"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'noborder_dark' : 'noborder_light'"
      lang="zh-CN"
      loading="lazy"
    />
  </section>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
</script>
