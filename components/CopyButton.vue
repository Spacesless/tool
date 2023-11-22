<template>
  <el-button type="primary" :icon="CopyDocument" @click="handleCopy">
    复制
  </el-button>
</template>

<script setup lang="ts">
import copy from 'copy-to-clipboard'
import { CopyDocument } from '@element-plus/icons-vue'

const { text } = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const handleCopy = () => {
  copy(text, {
    message: '请按#{key}复制'
  })
}
</script>
