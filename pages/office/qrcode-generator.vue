<template>
  <ToolLayout>
    <div class="section">
      <el-row :gutter="16">
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
              <el-input-number v-model="form.width" :min="10" :max="4096" controls-position="right" />
            </el-form-item>
            <el-form-item label="外部间距">
              <el-input-number v-model="form.margin" :min="0" :max="form.width" controls-position="right" />
            </el-form-item>
            <el-form-item label="纠错级别">
              <el-radio-group v-model="form.errorCorrectionLevel">
                <el-radio label="L">
                  低 ~7%
                </el-radio>
                <el-radio label="M">
                  中 ~15%
                </el-radio>
                <el-radio label="Q">
                  四分之一 ~25%
                </el-radio>
                <el-radio label="H">
                  高 ~30%
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
          <el-button type="primary" :disabled="!hasCode" @click="handleExport">
            导出
          </el-button>
          <div class="qrcode">
            <canvas id="qrcode" />
          </div>
        </el-col>
      </el-row>
    </div>

    <template #content>
      <p>QR码生成器是一种用于生成文本QR码的工具。用户可以输入或粘贴文本到工具中，工具会自动生成相应的QR码并在界面上显示出来。</p>
      <p>特点：</p>
      <ul>
        <li>1. 用户可以输入或粘贴文本到工具中。</li>
        <li>2. 工具会自动生成相应的QR码并在界面上显示出来。</li>
        <li> 3. 用户可以将生成的QR码保存到本地设备或与他人分享。</li>
      </ul>
      <p>用途：</p>
      <ul>
        <li> 1. QR码生成：用户可以使用QR码文本生成器生成包含文本信息的QR码，方便在移动设备上扫描和识别。</li>
        <li> 2. 信息分享：用户可以将生成的QR码与他人分享，快速获取文本信息。</li>
        <li> 3. 个人备忘录：用户可以使用QR码文本生成器为个人备忘录中的文本信息生成QR码，方便在移动设备上查看和管理。</li>
      </ul>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { toCanvas } from 'qrcode'
import type { QRCodeRenderersOptions } from 'qrcode'

import downloadFile from '@/utils/download'

definePageMeta({
  title: '二维码生成',
  description: 'QRcode生成器是一种用于生成文本二维码的工具。\n用户可以输入或粘贴文本到工具中，工具会自动生成相应的QR码并在界面上显示出来。'
})

const form = reactive({
  content: 'https://app.timelessq.com',
  width: 256,
  margin: 2,
  errorCorrectionLevel: 'M',
  fgColor: '#000000',
  bgColor: '#ffffff'
})
const hasCode = ref(false)

watch(() => form, generateQR, {
  deep: true,
  immediate: true
})

function generateQR () {
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
      toCanvas(canvasElement, decodeText, opts as QRCodeRenderersOptions)
      hasCode.value = true
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

function handleExport () {
  const canvasElement = document.getElementById('qrcode') as HTMLCanvasElement
  if (canvasElement) {
    const imageURL = canvasElement.toDataURL('image/png')

    downloadFile([{
      file: imageURL
    }], 'qrcode.png')
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-color-picker__trigger) {
  width: 180px;
}

.qrcode {
  max-height: 512px;
  margin-top: 16px;
  overflow: auto;
}
</style>
