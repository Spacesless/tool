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
            <el-form-item label="格式">
              <el-select v-model="form.format">
                <el-option v-for="item in formatOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽度">
              <el-input-number v-model="form.width" :min="1" :max="16" controls-position="right" />
            </el-form-item>
            <el-form-item label="高度">
              <el-input-number v-model="form.height" :min="10" :max="512" controls-position="right" />
            </el-form-item>
            <el-form-item label="间距">
              <el-input-number v-model="form.margin" :min="0" :max="64" controls-position="right" />
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker v-model="form.lineColor" />
            </el-form-item>
            <el-form-item label="背景色">
              <el-color-picker v-model="form.background" />
            </el-form-item>
            <el-form-item label="文字展示">
              <el-switch v-model="form.displayValue" />
            </el-form-item>
            <template v-if="form.displayValue">
              <el-form-item label="字体对齐">
                <el-radio-group v-model="form.textAlign">
                  <el-radio label="left">
                    左
                  </el-radio>
                  <el-radio label="center">
                    中
                  </el-radio>
                  <el-radio label="right">
                    右
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="字体位置">
                <el-radio-group v-model="form.textPosition">
                  <el-radio label="top">
                    顶部
                  </el-radio>
                  <el-radio label="bottom">
                    底部
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="字体">
                <el-select v-model="form.font">
                  <el-option v-for="item in fontOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="字体样式">
                <el-checkbox-group v-model="form.fontStyle">
                  <el-checkbox label="bold">
                    加粗
                  </el-checkbox>
                  <el-checkbox label="italic">
                    斜体
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-input-number v-model="form.fontSize" :min="6" :max="64" controls-position="right" />
              </el-form-item>
              <el-form-item label="字体间距">
                <el-input-number v-model="form.textMargin" :min="-64" :max="64" controls-position="right" />
              </el-form-item>
            </template>
          </el-form>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-button type="primary" :disabled="!hasCode" @click="handleExport">
            导出
          </el-button>
          <div class="barcode">
            <canvas id="barcode" />
          </div>
        </el-col>
      </el-row>
    </div>
  </ToolLayout>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode'
import { ElMessage } from 'element-plus'

import downloadFile from '@/utils/download'

definePageMeta({
  title: '条形码生成',
  description: '条形码是表达信息的图形标识符；\n支持多种条形码格式如CODE128、EAN、CODE39、ITF、MSI等。'
})

const formatOptions = reactive([
  {
    value: 'CODE128',
    label: 'CODE128 auto'
  },
  {
    value: 'CODE128A',
    label: 'CODE128 A'
  },
  {
    value: 'CODE128B',
    label: 'CODE128 B'
  },
  {
    value: 'CODE128C',
    label: 'CODE128 C'
  },
  {
    value: 'EAN13',
    label: 'EAN13'
  },
  {
    value: 'EAN8',
    label: 'EAN8'
  },
  {
    value: 'UPC',
    label: 'UPC'
  },
  {
    value: 'CODE39',
    label: 'CODE39'
  },
  {
    value: 'ITF14',
    label: 'ITF14'
  },
  {
    value: 'ITF',
    label: 'ITF'
  },
  {
    value: 'MSI',
    label: 'MSI'
  },
  {
    value: 'MSI10',
    label: 'MSI10'
  },
  {
    value: 'MSI11',
    label: 'MSI11'
  },
  {
    value: 'MSI1010',
    label: 'MSI1010'
  },
  {
    value: 'MSI1110',
    label: 'MSI1110'
  },
  {
    value: 'pharmacode',
    label: 'Pharmacode'
  }
])
const fontOptions = reactive([
  {
    value: 'monospace',
    label: 'Monospace'
  },
  {
    value: 'sans-serif',
    label: 'Sans-serif'
  },
  {
    value: 'serif',
    label: 'Serif'
  },
  {
    value: 'fantasy',
    label: 'Fantasy'
  },
  {
    value: 'cursive',
    label: 'Cursive'
  }
])
const form = reactive({
  format: 'CODE128',
  content: '1234567890',
  width: 2,
  height: 100,
  margin: 2,
  lineColor: '#000000',
  background: '#ffffff',
  displayValue: true,
  font: 'monospace',
  fontSize: 16,
  fontStyle: [],
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 0
})
const hasCode = ref(false)
let message: any

watch(() => form, generateQR, {
  deep: true
})

onMounted(() => generateQR())

function generateQR () {
  try {
    const { content, format, width, height, margin, lineColor, background, displayValue, textAlign, textPosition, font, fontSize, fontStyle, textMargin } = form

    JsBarcode('#barcode', content, {
      format,
      margin,
      lineColor,
      background,
      width,
      height,
      displayValue,
      font,
      fontSize,
      textAlign,
      textPosition,
      textMargin,
      fontOptions: fontStyle.join(' ')

    })
    hasCode.value = true
    message?.close()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    message = ElMessage.error({
      grouping: true,
      message: '输入的内容不支持该条形码格式'
    })
  }
}

function handleExport () {
  const canvasElement = document.getElementById('barcode') as HTMLCanvasElement
  if (canvasElement) {
    const imageURL = canvasElement.toDataURL('image/png')

    downloadFile([{
      file: imageURL
    }], 'barcode.png')
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-color-picker__trigger) {
  width: 180px;
}

.barcode {
  max-height: 512px;
  margin-top: 16px;
  overflow: auto;
}
</style>
