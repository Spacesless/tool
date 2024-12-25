<template>
  <section class="section">
    <div class="section-header">
      <el-button type="primary" :disabled="loading" @click="handleTest">
        示例图片
      </el-button>
      <el-button type="primary" :disabled="loading || !imageUrl" @click="handleDownload">
        下载图片
      </el-button>
    </div>
    <div v-loading="loading" class="rmbg" :element-loading-text="loadingText">
      <div v-show="!imageUrl" class="rmbg-wrapper">
        <UploadFile :drag="true" @change-file="onFileChange" />
      </div>
      <div v-show="imageUrl" class="rmbg-wrapper">
        <el-image class="rmbg-wrapper" :src="imageUrl" :preview-src-list="[imageUrl]" fit="contain" />
        <el-button class="rmbg-wrapper-close" :icon="Close" circle @click="handleClear" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AutoModel, AutoProcessor, env, RawImage } from '@xenova/transformers'
import type { UploadFile } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import downloadFile from '@/utils/download'

// Constants
const EXAMPLE_URL = '/images/79600c1573ff116d.jpg'

let model: any
let processor: any
const loading = ref(true)
const loadingText = ref('加载模型中')
const imageUrl = ref('')

onMounted(() => {
  // Since we will download the model from the Hugging Face Hub, we can skip the local model check
  env.allowLocalModels = true
  const wasmPath = 'https://cos.timelessq.com/static/models/ort-wasm-simd.wasm'
  const absoluteWasmPath = new URL(wasmPath, location.origin).href
  env.backends.onnx.wasm.wasmPaths = {
    'ort-wasm-simd.wasm': absoluteWasmPath
  }
  // Proxy the WASM backend to prevent the UI from freezing
  env.backends.onnx.wasm.proxy = true

  loadModel()
})

async function loadModel () {
  loading.value = true
  model = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
    // Do not require config.json to be present in the repository
    config: { model_type: 'custom' }
  })

  processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
    // Do not require config.json to be present in the repository
    config: {
      do_normalize: true,
      do_pad: false,
      do_rescale: true,
      do_resize: true,
      image_mean: [0.5, 0.5, 0.5],
      feature_extractor_type: 'ImageFeatureExtractor',
      image_std: [1, 1, 1],
      resample: 2,
      rescale_factor: 0.00392156862745098,
      size: { width: 1024, height: 1024 }
    }
  })
  loading.value = false
}

async function predict (url: string) {
  loading.value = true
  loadingText.value = '处理图像中，请耐心等待哦'
  // Read image
  const image = await RawImage.fromURL(url)

  // Preprocess image
  const { pixel_values: pixelValues } = await processor(image)

  // Predict alpha matte
  const { output } = await model({ input: pixelValues })

  // Resize mask back to original size
  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height)
  loading.value = false

  // Create new canvas
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  // Draw original image output to canvas
  ctx.drawImage(image.toCanvas(), 0, 0)

  // Update alpha channel
  const pixelData = ctx.getImageData(0, 0, image.width, image.height)
  for (let i = 0; i < mask.data.length; ++i) {
    pixelData.data[4 * i + 3] = mask.data[i]
  }
  ctx.putImageData(pixelData, 0, 0)
  canvas.toBlob((blob) => {
    if (blob) {
      imageUrl.value = URL.createObjectURL(blob)
    }
  })
}

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const fileUrl = URL.createObjectURL(uploadFile.raw)

    setTimeout(() => {
      predict(fileUrl)
    }, 0)
  }
}

const handleTest = () => {
  imageUrl.value = EXAMPLE_URL
  predict(EXAMPLE_URL)
}

const handleDownload = () => {
  downloadFile([{ file: imageUrl.value }])
}

const handleClear = () => {
  imageUrl.value = ''
}
</script>

<style lang="scss" scoped>
.rmbg {
  height: 500px;

  &-wrapper{
    position: relative;
    width: 100%;
    height: 100%;

    &-close {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
