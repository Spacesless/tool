<template>
  <ToolLayout>
    <el-row tag="section" class="section qrcode" :gutter="16">
      <el-col :sm="24" :md="12">
        <UploadFile class="qrcode-upload" :drag="true" @change-file="onFileChange" />
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="section-header">
          输出：
        </div>
        <el-input v-model="output" type="textarea" :rows="12" />
      </el-col>
    </el-row>
  </ToolLayout>
</template>

<script setup lang="ts">
import jsQR from 'jsqr'
import type { UploadFile } from 'element-plus'

definePageMeta({
  title: '二维码识别',
  description: '上传扫描二维码图片，识别二维码中相关的信息或内容。'
})

const output = ref('')

const onFileChange = async ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const imageUrl = URL.createObjectURL(uploadFile.raw)

    output.value = await loadImage(imageUrl)
  }
}

function loadImage (url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      // 将图片渲染到画布上
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return reject(new Error('无法解码二维码'))
      }
      ctx.drawImage(img, 0, 0, img.width, img.height)

      // 获取画布中的像素数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // 使用jsQR库解码二维码
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        // 如果解码成功，显示二维码内容
        resolve(code.data)
      } else {
        // 如果解码失败，显示错误消息
        reject(new Error('无法解码二维码'))
      }
    }
    img.src = url
  })
}
</script>

<style lang="scss" scoped>
.qrcode {
  &-upload {
    height: 300px;
  }
}
</style>
