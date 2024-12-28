<template>
  <el-button type="primary" :icon="icon" @click="handleCopy">
    复制
  </el-button>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { CopyDocument, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'default'
  }
})

const icon = shallowRef(CopyDocument)
let timer: any = null

const { copied, copy } = useClipboard({ legacy: true })
const handleCopy = async () => {
  await copy(props.text)

  icon.value = copied ? Check : Close

  if (copied) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      icon.value = CopyDocument
    }, 3000)
    ElNotification({
      title: '复制成功',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '复制失败',
      message: '请手动复制吧',
      type: 'error'
    })
  }
}
</script>
