<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form">
        <el-row :gutter="16" align="middle">
          <el-col :md="24" :lg="10">
            <el-form-item>
              <UploadFile @change-file="onFileChange" />
            </el-form-item>
            <el-form-item label="图片类型">
              <el-radio-group v-model="form.type">
                <el-radio label="art">
                  卡通 / 插画
                </el-radio>
                <el-radio label="photo">
                  照片
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="放大倍数">
              <el-radio-group v-model="form.scale">
                <el-radio :label="1">
                  1x
                </el-radio>
                <el-radio :label="2">
                  2x
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="降噪程度">
              <el-radio-group v-model="form.noise">
                <el-radio :label="0">
                  无
                </el-radio>
                <el-radio :label="1">
                  低
                </el-radio>
                <el-radio :label="2">
                  中
                </el-radio>
                <el-radio :label="3">
                  高
                </el-radio>
                <el-radio :label="4">
                  最高
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.noise !== 0" label="降噪进度">
              <el-progress :percentage="form.denoiseRatio" />
            </el-form-item>
            <el-form-item v-if="form.scale !== 0" label="放大进度">
              <el-progress :percentage="form.scaleRatio" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="!state.imageData" :loading="state.doing" @click="handleAmplify">
                放大图片
              </el-button>
            </el-form-item>
          </el-col>

          <el-col :md="24" :lg="14">
            <el-form-item>
              <el-space :size="16">
                <el-radio-group v-model="form.viewType">
                  <el-radio-button label="source">
                    原始图片
                  </el-radio-button>
                  <el-radio-button label="target">
                    处理结果
                  </el-radio-button>
                </el-radio-group>

                <el-button type="primary" :disabled="!state.done" @click="handleSave">
                  保存图片
                </el-button>
              </el-space>
            </el-form-item>

            <canvas v-show="form.viewType === 'source'" id="hidden-canvas" class="preview" />
            <canvas v-show="form.viewType === 'target'" id="calculated-canvas" class="preview" />
          </el-col>
        </el-row>
      </el-form>
    </section>

    <template #content>
      <p>参考 <a href="https://github.com/takuyaa/waifu2x-js" target="__blank">https://github.com/takuyaa/waifu2x-js</a> 实现。</p>
      <p>还有点问题：png图片处理完背景变黑色了</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'

import downloadFile from '@/utils/download'

const state = reactive<{
  imageData?: ImageData;
  filename: string;
  extname: string;
  doing: boolean;
  done: boolean;
}>({
  imageData: undefined,
  filename: '',
  extname: '',
  doing: false,
  done: false
})
const form = reactive({
  type: 'art',
  scale: 2,
  noise: 1,
  viewType: 'source',
  denoiseRatio: 0,
  scaleRatio: 0
})

onMounted(() => {
  setupWaifu2x()
})

let worker: Worker
const setupWaifu2x = () => {
  worker = new Worker('/assets/js/waifu2x/worker.js')

  const calculatedCanvasNode = document.getElementById('calculated-canvas') as HTMLCanvasElement
  worker.onmessage = (e) => {
    // result
    if (e.data.command !== 'progress' && calculatedCanvasNode) {
      state.doing = false
      state.done = true
      const image2x = e.data.image2x
      const width = e.data.width
      const height = e.data.height
      calculatedCanvasNode.width = width
      calculatedCanvasNode.height = height

      const calculatedContext = calculatedCanvasNode.getContext('2d') as CanvasRenderingContext2D
      const imageData2x = calculatedContext.createImageData(width, height)
      imageData2x.data.set(image2x)
      calculatedContext.putImageData(imageData2x, 0, 0)

      form.viewType = 'target'
      return
    }

    // progress
    if (e.data.phase === 'denoise') {
      form.denoiseRatio = e.data.doneRatio
      return
    }
    if (e.data.phase === 'scale') {
      form.scaleRatio = e.data.doneRatio
    }
  }
}

const getImageData = (imageUrl: string): Promise<ImageData> => {
  const hiddenCanvas = document.getElementById('hidden-canvas') as HTMLCanvasElement
  if (!hiddenCanvas) {
    return Promise.reject(new Error('no canvas'))
  }
  const context = hiddenCanvas.getContext('2d') as CanvasRenderingContext2D

  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      const imageWidth = image.naturalWidth
      const imageHeight = image.naturalHeight
      hiddenCanvas.width = imageWidth
      hiddenCanvas.height = imageHeight

      context.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height)
      context.drawImage(image, 0, 0, hiddenCanvas.width, hiddenCanvas.height)

      const imageData = context.getImageData(0, 0, imageWidth, imageHeight)

      resolve(imageData)
    }
    image.src = imageUrl
  })
}

async function handleAmplify () {
  state.doing = true
  state.done = false
  form.denoiseRatio = 0
  form.scaleRatio = 0
  const { type, scale, noise } = form

  const fetchScaleModel = fetch(`/assets/json/models/${type}/scale2.0x_model.json`).then(response => response.json())
  const fetchNoiseModel = fetch(`/assets/json/models/${type}/noise${noise}_model.json`).then(response => response.json())

  const promiseList = []
  if (scale === 2) {
    promiseList.push(fetchScaleModel)
  }
  if (noise !== 0) {
    promiseList.push(fetchNoiseModel)
  }

  const [scaleModel, noiseModel] = await Promise.all(promiseList)

  worker.postMessage({
    noiseModel,
    scale2xModel: scaleModel,
    scale: form.scale,
    imageData: state.imageData
  })
}

const onFileChange = async ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const filename = uploadFile.name.split('.')
    state.extname = filename.pop() || 'png'
    state.filename = filename.join('.')
    const imageUrl = URL.createObjectURL(uploadFile.raw)

    state.imageData = await getImageData(imageUrl)

    form.viewType = 'source'
  }
}

function handleSave () {
  const calculatedCanvasNode = document.getElementById('calculated-canvas') as HTMLCanvasElement

  calculatedCanvasNode.toBlob(function (blob) {
    downloadFile([{
      file: blob
    }], `${state.filename}-${form.scale}x.${state.extname}`)
  }, 'image/' + state.extname)
}
</script>

<style lang="scss" scoped>
.preview {
  max-width: 100%;
  background-color: var(--el-fill-color-light);
}

:deep(.el-progress) {
  width: 350px;
}
</style>
