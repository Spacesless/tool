<template>
  <ToolLayout>
    <el-row :gutter="16">
      <el-col :md="12">
        <FileUpload @on-change="onFileChange"></FileUpload>
      </el-col>
      <el-col :md="12">
        <el-input v-model="output"></el-input>
      </el-col>
    </el-row>
  </ToolLayout>
</template>

<script setup lang="ts">
// npm i image-to-base64 @types/image-to-base64 -D
import imageToBase64 from 'image-to-base64'
import { ElNotification } from 'element-plus'
import copy from 'copy-to-clipboard'

const output = ref('')

const onFileChange = () => {
  const fileUrl = ''
  imageToBase64(fileUrl)
}

const handleCopy = () => {
  copy(`${location.href}
${document.title}`, {
    message: '请按#{key}复制'
  })
  ElNotification({
    title: '复制成功',
    message: '快拿这个工具去祸祸别人吧',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>

</style>