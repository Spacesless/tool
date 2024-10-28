<template>
  <el-button type="primary" :icon="icon" @click="handleCopy">
    复制
  </el-button>
</template>

<script setup lang="ts">
import copy from 'copy-to-clipboard'
import { CopyDocument, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const icon = shallowRef(CopyDocument)
let timer: any = null

const handleCopy = () => {
  const isSuccess = copy(props.text, {
    message: '请按#{key}复制'
  })
  icon.value = isSuccess ? Check : Close

  clearTimeout(timer)
  timer = setTimeout(() => {
    icon.value = CopyDocument
  }, 3000)
}
</script>
