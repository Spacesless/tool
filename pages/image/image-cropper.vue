<template>
  <ToolLayout>
    <section class="section">
      <el-space class="section-header" :size="16">
        <UploadFile @change-file="onFileChange" />
        <el-button @click="handleSave">
          保存
        </el-button>
      </el-space>

      <div class="cropper-wrapper">
        <canvas id="cropper" />
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import type { UploadFile } from 'element-plus'

import downloadFile from '@/utils/download'

let cropper: Cropper
onMounted(() => {
  const image = document.getElementById('cropper') as HTMLImageElement
  cropper = new Cropper(image, {

  })
})

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const fileUrl = URL.createObjectURL(uploadFile.raw)

    cropper.replace(fileUrl)
  }
}

const handleSave = () => {
  const croppedCanvas = cropper.getCroppedCanvas()
  const imageData = croppedCanvas.toDataURL('image/png')

  downloadFile([{ file: imageData }], 'cropper.png')
}
</script>

<style lang="scss" scoped>
#cropper {
  width: 100%;
  height: 600px;
}
</style>
