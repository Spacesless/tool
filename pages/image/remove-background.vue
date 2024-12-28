<template>
  <ToolLayout>
    <ClientOnly fallback-tag="span" fallback="Loading component...">
      <Rmbg />
    </ClientOnly>

    <template #content>
      <p>
        基于
        <a href="https://www.npmjs.com/package/@xenova/transformers" target="_blank" rel="noopener noreferrer">Transformers.js</a>
        进行Web机器学习，直接浏览器中运行ONNX模型
      </p>
      <p>使用briaai/RMBG-1.4模型即时AI后台清除-快速、高效</p>
      <p>参考实现：<a href="https://background-erase.xyz/" target="_blank" rel="noopener noreferrer">https://background-erase.xyz/</a></p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import Rmbg from './components/-Rmbg.vue'

definePageMeta({
  title: '去除图片背景',
  description: '依据RMBG-1.4 AI大模型去除图片背景',
  updateTime: '2024-05-18'
})
</script>
