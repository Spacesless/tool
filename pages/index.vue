<template>
  <div class="main">
    <ToolList v-for="item in toolRef" :key="item.path" :category-name="item.name" />
  </div>
</template>

<script lang="ts" setup>
import ToolList from '@/components/Card/ToolList.vue'

import tools from '@/assets/json/tools.json'

const toolRef = ref(tools)
</script>
