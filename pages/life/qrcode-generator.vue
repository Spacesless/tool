<template>
  <el-row class="section">
    <el-col :sm="24" :md="12">
      <el-form :model="form" label-width="80px">
        <el-form-item label="输入内容">
          <el-input
            v-model="form.content"
            :rows="6"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="宽度">
          <el-input-number v-model="form.width" :min="10" :max="4096" />
        </el-form-item>
        <el-form-item label="外部间距">
          <el-input-number v-model="form.margin" :min="0" :max="form.width" />
        </el-form-item>
        <el-form-item label="纠错级别">
          <el-radio-group v-model="form.errorCorrectionLevel">
            <el-radio label="L">
              低
            </el-radio>
            <el-radio label="M">
              中
            </el-radio>
            <el-radio label="Q">
              四分位数
            </el-radio>
            <el-radio label="H">
              高
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="前景色">
          <el-color-picker v-model="form.fgColor" />
        </el-form-item>
        <el-form-item label="背景色">
          <el-color-picker v-model="form.bgColor" />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :sm="24" :md="12">
      <canvas id="qrcode" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { toCanvas, QRCodeRenderersOptions } from 'qrcode'

const form = reactive({
  content: '',
  width: 256,
  margin: 10,
  errorCorrectionLevel: 'M',
  fgColor: '#000000',
  bgColor: '#ffffff'
})
const url = ref('')

watch(form, () => generateQR)

const generateQR = () => {
  try {
    const { content, width, margin, errorCorrectionLevel, fgColor, bgColor } = form
    const decodeText = decodeURIComponent(content)

    const opts = {
      type: 'image/png',
      errorCorrectionLevel: errorCorrectionLevel || 'M',
      margin: margin || 1,
      width: width || 256,
      color: {
        dark: fgColor,
        light: bgColor
      }
    }

    const canvasElement = document.getElementById('qrcode') as HTMLCanvasElement
    if (canvasElement) {
      toCanvas(canvasElement, decodeText, opts as QRCodeRenderersOptions).then((res: any) => {
        url.value = res || ''
      })
    }
  } catch (err) {
    url.value = ''
  }
}
</script>
