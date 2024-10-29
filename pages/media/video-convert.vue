<template>
  <ToolLayout>
    <section v-loading="loading" class="section" element-loading-text="加载资源中，文件较大请稍等...">
      <el-row :gutter="10">
        <el-col :md="24" :lg="12" class="video-upload">
          <el-form ref="form" label-width="100px">
            <el-form-item label="源文件">
              <UploadFile accept="video/*" @change-file="onFileChange" />
            </el-form-item>
            <el-form-item label="输出格式">
              <el-select v-model="format" style="width: 300px; margin-right: 16px;">
                <el-option v-for="item in formatOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
              <el-button type="primary" @click="transcode">
                开始转换
              </el-button>
            </el-form-item>
            <el-form-item label="处理进度">
              <el-progress :percentage="progress" style="width: 350px;" />
            </el-form-item>
            <el-form-item label="目标文件">
              <el-button type="primary" :disabled="!outputUrl" @click="handleDownlad">
                下载文件
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="24" :lg="12">
          <video class="video__output" :src="outputUrl" controls />
        </el-col>
      </el-row>
    </section>

    <template #content>
      <p>基于 <a href="https://www.npmjs.com/package/@ffmpeg/ffmpeg" target="_blank" rel="noopener noreferrer">ffmpeg</a> 实现。</p>
      <p>在浏览器中使用<code>WebAssembly</code>技术，ffmpeg.wasm是FFmpeg的纯WebAssembly / JavaScript端口，可以直接在浏览器中进行视频和音频录制、转换和流传输。</p>
      <p>优势：</p>
      <ul>
        <li>安全性：用户的数据仅存在于他们的浏览器中，无需担心任何数据泄漏或网络延迟。</li>
        <li>客户端计算：不是托管服务器端服务器集群， 现在可以将多媒体处理转移到客户端。</li>
        <li>灵活：ffmpeg.wasm 自带单线程和多线程内核，可以使用合适的用例的方法。</li>
      </ul>
      <p>缺点：</p>
      <ul>
        <li>从 CDN 下载 WebAssembly 代码，文件较大需要等待。</li>
        <li>转换效率与客户端性能挂钩，最大只支持4GB的文件。</li>
      </ul>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import { FFmpeg } from '@ffmpeg/ffmpeg'
import type { UploadFile } from 'element-plus'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { ElMessage } from 'element-plus'

import downloadFile from '@/utils/download'

definePageMeta({
  title: '视频转换',
  description: '支持多种视频格式转换',
  updateTime: '2024-10-29'
})

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
const format = ref('mp4')
const formatOptions = reactive([
  { value: 'mp4', label: 'MP4' },
  { value: 'mpeg', label: 'MPEG' },
  { value: 'avi', label: 'AVI', mime: 'x-msvideo' },
  { value: 'mkv', label: 'MKV', mime: 'x-matroska' },
  { value: 'webm', label: 'WEBM', mime: 'webm' },
  { value: 'flv', label: 'FLV', mime: 'x-flv' },
  { value: 'wmv', label: 'WMV', mime: 'x-ms-wmv' },
  { value: 'mov', label: 'MOV', mime: 'quicktime' }
])
const inputFile = reactive({
  url: '',
  extname: ''
})
const outputUrl = ref('')
const loading = ref(false)
const progress = ref(0)

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    inputFile.url = URL.createObjectURL(uploadFile.raw)
    inputFile.extname = uploadFile.raw.name.split('.').pop() || 'mp3'
  }
}

async function transcode () {
  const ffmpeg = new FFmpeg()

  ffmpeg.on('progress', ({ progress: p }) => {
    progress.value = +(p * 100).toFixed(1)
  })

  loading.value = true
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
  })
  loading.value = false

  const input = `input.${inputFile.extname}`
  const output = `output.${format.value}`
  try {
    await ffmpeg.writeFile(input, await fetchFile(inputFile.url))
    await ffmpeg.exec(['-i', input, '-c', 'copy', output])

    const data = await ffmpeg.readFile(output)
    const mime = formatOptions.find(item => item.value === format.value)
    outputUrl.value = URL.createObjectURL(
      new Blob(
        [(data as Uint8Array).buffer],
        { type: `audio/${mime ? (mime.mime || mime.value) : 'mpeg'}` }
      )
    )
  } catch {
    ElMessage.error({
      grouping: true,
      message: '参数出错，转换失败'
    })
  }
}

function handleDownlad () {
  downloadFile([{
    file: outputUrl.value,
    filename: `${outputUrl.value.split('/').pop()}.${format.value}`
  }])
}
</script>

<style lang="scss" scoped>
.video {
  &__output {
    width: 100%;
    height: 400px;
    background-color: var(--el-color-black);
  }
}
</style>
