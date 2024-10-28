<template>
  <ToolLayout>
    <section class="section ocr">
      <el-row :gutter="16">
        <el-col :md="24" :lg="12">
          <div class="section-header ocr-input">
            <ClientOnly>
              <el-select v-model="language" filterable placeholder="请选择语言" @change="onLanguageChange">
                <el-option v-for="item in languageOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </ClientOnly>
            <UploadFile accept="image/*" @change-file="onFileChange" />
          </div>
          <div class="ocr-io">
            <canvas ref="canvasRef" class="ocr-io__canvas" />
            <img ref="imageRef" class="ocr-io__image" :src="result.imageUrl" alt="" @load="onImageLoad">
          </div>
        </el-col>
        <el-col :md="24" :lg="12">
          <div class="section-header ocr-ouput">
            <span>进度</span>
            <el-progress :percentage="result.progress" />
            <CopyButton :text="result.text" />
          </div>
          <el-input v-model="result.text" readonly :rows="20" type="textarea" />
        </el-col>
      </el-row>
    </section>

    <template #content>
      <p>基于 <a href="https://www.npmjs.com/package/tesseract.js" target="_blank" rel="noopener noreferrer">Tesseract.js</a> ，一个流行的 Tesseract OCR 引擎实现。</p>
      <p>该库支持 100 多种语言、自动文本方向和脚本检测、用于读取段落、单词和字符边界框的简单界面。</p>
      <p>由于本地安装，语言词典文件不全，所以只开放常用的语言识别。</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import { createWorker } from 'tesseract.js'
import type { LoggerMessage, RecognizeResult } from 'tesseract.js'
import { ElMessage } from 'element-plus'

definePageMeta({
  title: '图片文字提取',
  description: 'OCR，从图像中获取文字；\n暂时只开放中文、英文、俄语等常用语言。',
  updateTime: '2024-10-28'
})

const result = reactive({
  imageUrl: '/images/chi_sim.png',
  text: '',
  progress: 0
})
const language = ref('chi_sim')
const languageOptions = reactive([
  { value: 'ara', label: '阿拉伯语' },
  { value: 'bod', label: '藏语' },
  { value: 'chi_sim', label: '中文 - 简体中文' },
  { value: 'chi_tra', label: '中文 - 繁体中文' },
  { value: 'eng', label: '英语' },
  { value: 'fra', label: '法语' },
  { value: 'frk', label: '德语' },
  { value: 'hin', label: '印地语' },
  { value: 'por', label: '葡萄牙语' },
  { value: 'spa', label: '西班牙语' },
  { value: 'rus', label: '俄语' },
  { value: 'ben', label: '孟加拉语' },
  { value: 'ind', label: '印度尼西亚语' },
  { value: 'jpn', label: '日语' },
  { value: 'tur', label: '土耳其语' },
  { value: 'kor', label: '朝鲜语' },
  { value: 'vie', label: '越南语' },
  { value: 'ita', label: '意大利语' }
])
const canvasRef = ref()
const imageRef = ref()

const BASE_PATH = 'https://cos.timelessq.com/static/tesseract'
const workerPromise = createWorker('chi_sim', 1, {
  workerPath: `${BASE_PATH}/worker.min.js`,
  langPath: `${BASE_PATH}/lang`,
  corePath: `${BASE_PATH}/core`,
  logger: progressUpdate
})

/**
 * 处理进度
 * @param packet
 */
function progressUpdate (packet: LoggerMessage) {
  if (!(packet.status.includes('loading') || packet.status.includes('initializing'))) {
    result.progress = +(packet.progress * 100).toFixed(1)
  }
}

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const fileUrl = URL.createObjectURL(uploadFile.raw)
    result.imageUrl = fileUrl

    handleOcr(fileUrl)
  }
}

function onLanguageChange () {
  if (result.imageUrl) {
    handleOcr(result.imageUrl)
  }
}

const handleOcr = async (imageUrl: string) => {
  clearOutput()

  try {
    const worker = await workerPromise
    // 切换语言
    await worker.reinitialize(language.value)

    const { data } = await worker.recognize(imageUrl)
    result.text = data.text

    drawCanvas(data)
  } catch {
    ElMessage.error({
      grouping: true,
      message: '资源加载失败，请稍后刷新重试'
    })
  }
}

function onImageLoad () {
  canvasRef.value.width = imageRef.value.naturalWidth
  canvasRef.value.height = imageRef.value.naturalHeight
}

/**
 * 绘制识别框
 * @param res
 */
function drawCanvas (res: RecognizeResult['data']) {
  const ioctx = canvasRef.value.getContext('2d')

  res.words.forEach(function (w) {
    const b = w.bbox

    ioctx.strokeWidth = 2

    ioctx.strokeStyle = 'red'
    ioctx.strokeRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0)
    ioctx.beginPath()
    ioctx.moveTo(w.baseline.x0, w.baseline.y0)
    ioctx.lineTo(w.baseline.x1, w.baseline.y1)
    ioctx.strokeStyle = 'green'
    ioctx.stroke()
  })
}

function clearOutput () {
  result.text = ''
  result.progress = 0

  const ioctx = canvasRef.value.getContext('2d')
  ioctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

onMounted(() => {
  handleOcr(result.imageUrl)
})
</script>

<style lang="scss" scoped>
.ocr {
  &-io {
    position: relative;
    width: 100%;
    min-height: 428px;
    border: 1px solid var(--el-border-color-light);
    border-radius: var(--el-border-radius-base);

    &__image{
      display: block;
      width: 100%;
    }

    &__canvas{
      position: absolute;
      max-width: 100%;
    }
  }

  &-input {
    display: flex;
    gap: 16px;
  }

  &-ouput {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    line-height: 32px;
  }

  :deep(.el-progress) {
    flex: 1;
  }
}
</style>
