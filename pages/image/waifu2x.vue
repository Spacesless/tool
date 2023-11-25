<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <UploadFile @change-file="onFileChange" />
        <el-button @click="handleAmplify">
          放大
        </el-button>
      </div>

      <canvas id="hidden-canvas" />
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus'

const state = reactive({
  imageData: new ImageData(0, 0)
})

onMounted(() => {
  setupWaifu2x()
})

let worker: Worker
const setupWaifu2x = () => {
  worker = new Worker('/assets/js/waifu2x/worker.js')

  const calculatedCanvasNode = document.getElementById('calculatedCanvasNode') as HTMLCanvasElement
  worker.onmessage = (e) => {
    // result
    if (e.data.command !== 'progress' && calculatedCanvasNode) {
      const image2x = e.data.image2x
      const width = e.data.width
      const height = e.data.height

      const calculatedContext = calculatedCanvasNode.getContext('2d') as CanvasRenderingContext2D
      const imageData2x = calculatedContext.createImageData(width, height)
      imageData2x.data.set(image2x)
      calculatedContext.putImageData(imageData2x, 0, 0)
      return
    }

    // progress
    if (e.data.phase === 'scale' || e.data.phase === 'denoise') {
      // console.log(e.data)
      return
    }
    if (e.data.phase === 'decompose') {
      // console.log('Decomposing image')
      return
    }
    if (e.data.phase === 'recompose') {
      // console.log('Recomposing image')

    }
    // console.log('Received an unknown message from worker')
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
  const fetchScaleModel = fetch('/assets/json/waifu2x/models/photo/scale2.0x_model.json').then(response => response.json())
  const fetchNoiseModel = fetch('/assets/json/waifu2x/models/photo/noise3_model.json').then(response => response.json())

  const [scaleModel, noiseModel] = await Promise.all([fetchScaleModel, fetchNoiseModel])

  worker.postMessage({
    scale2xModel: scaleModel,
    noiseModel,
    scale: 2,
    imageData: []
  })
}

const onFileChange = async ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const imageUrl = URL.createObjectURL(uploadFile.raw)

    state.imageData = await getImageData(imageUrl)
  }
}
</script>

<style lang="scss" scoped>
#hidden-canvas {
  display: none;
}
</style>
