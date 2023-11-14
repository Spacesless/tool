<template>
  <div class="home">
    <div class="banner">
      <h1 class="banner__title">
        一个安全免费的工具箱
      </h1>
      <p class="banner__description">
        所有数据处理都在客户端完成，不上传服务端；
      </p>
      <p class="banner__description">
        所有工具免费使用且无需登录。
      </p>
    </div>

    <ToolList v-for="item in toolList" :key="item.path" :tool="item" />
  </div>
</template>

<script lang="ts" setup>
import tools from '@/router'
import { ToolCategory } from '@/types/tool'

const toolList = computed((): ToolCategory => {
  return tools.map(item => ({
    ...item,
    children: item.children.slice(0, 12)
  }))
})
</script>
