<template>
  <div class="comment">
    <Waline
      :server-u-r-l="serverURL"
      :path="path"
      lang="zh-CN"
      :dark="dark"
      login="disable"
      :image-uploader="false"
      :word-limit="256"
      :required-meta="requiredMeta"
      :copyright="false"
    />
  </div>
</template>

<script setup lang="ts">
import '@waline/client/dist/waline.css'
import { Waline } from '@waline/client/component'

const colorMode = useColorMode()

const serverURL = ''
const path = ''
const requiredMeta = ['nick', 'mail']

const dark = computed(() => colorMode.preference === 'dark')
</script>

<style scoped>
.comment :deep(.wl-panel) {
  margin: 0;
}
</style>
