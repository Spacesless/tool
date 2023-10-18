<template>
  <div class="home">
    <ToolList v-for="item in toolRef" :key="item.path" :tool="item" />
  </div>
</template>

<script lang="ts" setup>
import ToolList from '@/components/common/ToolList.vue'

import tools from '@/assets/json/tools.json'

const toolRef = ref(tools)
</script>
