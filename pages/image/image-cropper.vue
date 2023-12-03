<template>
  <ToolLayout>
    <section class="section cropper">
      <div class="cropper-left">
        <div class="cropper-control">
          <UploadFile @change-file="onFileChange" />
        </div>
        <el-form label-width="auto">
          <el-form-item label="宽">
            <el-input-number v-model="detail.width" :precision="3" controls-position="right" @change="setWidth" />
          </el-form-item>
          <el-form-item label="高">
            <el-input-number v-model="detail.height" :precision="3" controls-position="right" @change="setHeight" />
          </el-form-item>
          <el-form-item label="X">
            <el-input-number v-model="detail.x" :precision="3" controls-position="right" @change="onOffsetXChnage" />
          </el-form-item>
          <el-form-item label="Y">
            <el-input-number v-model="detail.y" :precision="3" controls-position="right" @change="onOffsetYChnage" />
          </el-form-item>
          <el-form-item label="图片放大">
            <el-input-number v-model="scale" :step="0.1" controls-position="right" @change="zoomTo" />
          </el-form-item>
          <el-form-item>
            <div class="cropper-control">
              <el-button :icon="RefreshLeft" @click="handleRotate(-90)" />
              <el-button :icon="RefreshRight" @click="handleRotate(90)" />
              <el-button :icon="Refresh" @click="handleReset" />
            </div>
            <div class="cropper-control mb0">
              <el-button :icon="Switch" @click="handleScale('x')" />
              <el-button :icon="Sort" @click="handleScale('y')" />
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-radio-group v-model="aspectRatio" @change="onAspectRatioChange">
              <el-radio-button :label="0">
                16:9
              </el-radio-button>
              <el-radio-button :label="1">
                4:3
              </el-radio-button>
              <el-radio-button :label="2">
                1:1
              </el-radio-button>
              <el-radio-button :label="3">
                Auto
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="cropper-control">
          <el-button type="primary" :icon="Crop" @click="handleSave">
            保存图片
          </el-button>
        </div>
      </div>

      <div class="cropper-wrapper">
        <canvas id="cropper" />
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { RefreshLeft, RefreshRight, Refresh, Switch, Sort, Crop } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

import downloadFile from '@/utils/download'

const scale = ref(1)
const aspectRatio = ref(0)
const detail = ref({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  rotate: 0
})

let cropper: Cropper
onMounted(() => {
  const image = document.getElementById('cropper') as HTMLImageElement
  cropper = new Cropper(image, {
    crop (event) {
      detail.value = event.detail
    }
  })
})

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const fileUrl = URL.createObjectURL(uploadFile.raw)

    cropper.replace(fileUrl)
  }
}

function setWidth (cur: number | undefined = 0) {
  cropper?.setData({
    width: cur
  })
}

function setHeight (cur: number | undefined = 0) {
  cropper?.setData({
    height: cur
  })
}

function onOffsetXChnage (cur: number | undefined = 0) {
  cropper?.moveTo(cur, 0)
}

function onOffsetYChnage (cur: number | undefined = 0) {
  cropper?.moveTo(0, cur)
}

function zoomTo (cur: number | undefined) {
  cropper?.zoomTo(cur || 1) // 放大缩小
}

function handleRotate (degree: number) {
  cropper?.rotate(degree) // 旋转
}

function handleScale (type: string) {
  const data = cropper?.getData() || {}
  if (type === 'x') {
    cropper?.scaleX(0 - data.scaleX) // 翻转
  } else {
    cropper?.scaleY(0 - data.scaleY) // 翻转
  }
}

function handleReset () {
  cropper?.reset() // 重置
}

function onAspectRatioChange (value: string | number | boolean) {
  const aspectRatio = [16 / 9, 4 / 3, 1, NaN][value as number]
  cropper.setAspectRatio(aspectRatio)
}

const handleSave = () => {
  const croppedCanvas = cropper.getCroppedCanvas()
  const imageData = croppedCanvas.toDataURL('image/png')

  downloadFile([{ file: imageData }], 'cropper.png')
}
</script>

<style lang="scss" scoped>
.cropper {
  display: flex;
  gap: 16px;
  align-items: center;

  &-left {
    width: 250px;
  }

  &-control {
    width: 100%;
    margin-bottom: 18px;
    text-align: center;
  }

  .mb0 {
    margin-bottom: 0;
  }

  &-wrapper {
    flex: 1;
  }
}

#cropper {
  width: 100%;
  height: 600px;
}
</style>
