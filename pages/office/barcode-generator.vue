<template>
  <ToolLayout>
    <section class="section">
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
                <el-option v-for="item in formatOptions" :key="item.value" :value="item.value" :label="item.label" />
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
                  <el-option v-for="item in fontOptions" :key="item.value" :value="item.value" :label="item.label" />
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
    </section>

    <template #content>
      <p>基于<a href="https://www.npmjs.com/package/jsbarcode" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/jsbarcode</a>实现</p>
      <p>条形码(barcode)是将宽度不等的多个黑条和空白，按照一定的编码规则排列，用以表达一组信息的图形标识符。</p>
      <p>常见的条形码是由反射率相差很大的黑条（简称条）和白条（简称空）排成的平行线图案。</p>
      <p>条形码可以标出物品的生产国、制造厂家、商品名称、生产日期、图书分类号、邮件起止地点、类别、日期等许多信息。</p>
      <p>因而在商品流通、图书管理、邮政管理、银行系统等许多领域都得到广泛的应用。</p>
      <p>此条形码生成器支持CODE128、EAN、CODE39等类型条形码生成：</p>
      <ul>
        <li>CODE128 是用途更广的条形码之一。它支持所有 128 个 ASCII 字符，但也可以有效地对数字进行编码，它有三种模式 （A/B/C）。</li>
        <li>EAN 有多种形式，支持 EAN-13、EAN-8 和 UPC 格式以及条形码插件 EAN-5 和 EAN-2。最常用的是 EAN-13 （GTIN-13），它在全球范围内用于标记产品的身份。</li>
        <li>CODE39 是一种旧的条形码类型，可以编码数字、大写字母和许多特殊字符（<code>.</code><code>$</code><code>/</code><code>+</code><code>%</code><code>space</code>）。它过去一直是一种常见的条形码类型，但如果不是出于遗留原因，建议使用 CODE128。</li>
        <li>ITF-14 （Interleaved Two of Five） 是 Interleaved 2 of 5 条形码的 GS1 实施，用于对全球贸易项目编号进行编码。ITF-14 符号通常用于商品的包装层，例如一箱 24 罐汤。ITF-14 将始终编码 14 位数字。</li>
        <li>MSI 或 Modified Plessey 是由 MSI Data Corporation 开发的条形码，主要用于库存控制、标记仓库环境中的存储容器和货架。它支持数字 0-9。</li>
        <li>Pharmacode 是制药行业中使用的条形码。它可以对数字 3 到 131070 进行编码。</li>
        <li>Codabar 是一种旧的条形码类型，可以编码数字和许多特殊字符</li>
      </ul>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode'
import { ElMessage } from 'element-plus'

import downloadFile from '@/utils/download'

definePageMeta({
  title: '条形码生成',
  description: '条形码是表达信息的图形标识符；\n支持多种条形码格式如CODE128、EAN、CODE39、ITF、MSI等。',
  updateTime: '2024-10-28'
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

watch(() => form, generateBarcode, {
  deep: true
})

onMounted(() => generateBarcode())

function generateBarcode () {
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
