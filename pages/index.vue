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

    <ToolList v-for="item in toolRef" :key="item.path" :tool="item" />
  </div>
</template>

<script lang="ts" setup>
import ToolList from '@/components/tool/ToolList.vue'

import tools from '@/router'

const toolRef = ref(tools)
</script>
