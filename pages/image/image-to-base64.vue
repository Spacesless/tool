<template>
  <ToolLayout>
    <el-row :gutter="16">
      <el-col :md="12">
        <UploadFile @on-change="onFileChange" />
      </el-col>
      <el-col :md="12">
        <el-input v-model="output" />
      </el-col>
    </el-row>
  </ToolLayout>
</template>

<script setup lang="ts">
// npm i image-to-base64 @types/image-to-base64 -D
import imageToBase64 from 'image-to-base64'

const output = ref('')

const onFileChange = () => {
  const fileUrl = ''
  imageToBase64(fileUrl)
}
</script>
