<template>
  <el-upload
    class="upload-demo"
    drag
    action=""
    :auto-upload="false"
    multiple
    @on-change="onFileChange"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'

interface Props {
  accept: string
  multiple: boolean
}

withDefaults(defineProps<Props>(), {
  accept: '',
  multiple: false
})

onMounted(() => {
  document.addEventListener('paste', pasteHandler)
})
onUnmounted(() => {
  document.removeEventListener('paste', pasteHandler)
})
const pasteHandler = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items || []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.kind === 'file') {
      const file = item.getAsFile()
      console.log('粘贴的文件:', file)
    }
  }
}

const onFileChange = () => {}
</script>
