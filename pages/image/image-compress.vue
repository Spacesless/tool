<template>
  <ToolLayout>
    <section class="section compress">
      <el-form class="compress-config" :model="configs" label-width="68px">
        <el-form-item prop="strict">
          <template #label>
            <el-tooltip effect="dark" content="当压缩图像的大小大于原始图像的大小时，是否输出原始图像而不是压缩图像" placement="bottom">
              严格模式
            </el-tooltip>
          </template>
          <el-radio-group v-model="configs.strict">
            <el-radio-button :label="true">
              开启
            </el-radio-button>
            <el-radio-button :label="false">
              关闭
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="checkOrientation">
          <template #label>
            <el-tooltip effect="dark" content="是否读取图像的 Exif 方向值（仅限 JPEG 图像），然后使用该值自动旋转或翻转图像" placement="bottom">
              检查方向
            </el-tooltip>
          </template>
          <el-radio-group v-model="configs.checkOrientation">
            <el-radio-button :label="true">
              开启
            </el-radio-button>
            <el-radio-button :label="false">
              关闭
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保留Exif" prop="retainExif">
          <el-radio-group v-model="configs.retainExif">
            <el-radio-button :label="true">
              开启
            </el-radio-button>
            <el-radio-button :label="false">
              关闭
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最大宽度" prop="maxWidth">
          <el-input-number v-model="configs.maxWidth" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="最大高度" prop="maxHeight">
          <el-input-number v-model="configs.maxHeight" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="最小宽度" prop="minWidth">
          <el-input-number v-model="configs.minWidth" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="最小高度" prop="minHeight">
          <el-input-number v-model="configs.minHeight" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="宽度" prop="width">
          <el-input-number v-model="configs.width" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-input-number v-model="configs.height" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="裁剪图像" prop="resize">
          <el-radio-group v-model="configs.resize">
            <el-radio-button label="none">
              无
            </el-radio-button>
            <el-radio-button label="contain">
              包含
            </el-radio-button>
            <el-radio-button label="cover">
              填充
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转换类型" prop="convertTypes">
          <el-select v-model="configs.mimeType">
            <el-option
              v-for="item in convertTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="quality">
          <template #label>
            <el-tooltip effect="dark" content="输出图像的质量，适用于jpeg/webp" placement="bottom">
              质量
            </el-tooltip>
          </template>
          <el-input-number v-model="configs.quality" :min="0" :max="1" :step="0.1" />
        </el-form-item>
        <el-form-item prop="convertSize">
          <template #label>
            <el-tooltip effect="dark" content="输出图像文件大小超过此值（单位MB）将转换为 JPEG" placement="bottom">
              转换大小
            </el-tooltip>
          </template>
          <el-input-number v-model="configs.convertSize" :min="0" :step="1" />
        </el-form-item>
      </el-form>

      <div class="compress-list">
        <el-space class="section-header" :size="16">
          <UploadFile accept="image/*" :multiple="true" @change-file="onFileChange" />
          <el-button type="primary" :loading="allLoading" :disabled="data.length === 0" @click="handleDeal">
            处理全部
          </el-button>
          <el-button type="success" :disabled="fileListCount === 0" @click="handleDownload">
            下载全部
          </el-button>
          <el-button type="danger" @click="handleClear">
            清空
          </el-button>
        </el-space>

        <el-table :data="data" border height="624px">
          <el-table-column prop="source" label="原始图片">
            <template #default="scope">
              <el-image
                :src="scope.row.source"
                class="compress-list__thumb"
                fit="contain"
                :preview-src-list="[scope.row.source]"
                :preview-teleported="true"
                @load="onSourceLoad($event, scope.$index)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="sourceSize" label="原始大小">
            <template #default="scope">
              <p>分辨率：{{ scope.row.sourceWidth }}</p>
              <p>文件大小：{{ getSize(scope.row.sourceSize) }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="sourceType" label="原始类型" width="100" />
          <el-table-column prop="output" label="输出图片">
            <template #default="scope">
              <el-image
                :src="scope.row.output"
                class="compress-list__thumb"
                fit="contain"
                :infinite="false"
                :preview-src-list="[scope.row.source, scope.row.output]"
                :preview-teleported="true"
                :initial-index="1"
                @load="onSourceLoad($event, scope.$index, 'output')"
              >
                <template #error>
                  <div />
                </template>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="outputSize" label="输出大小">
            <template #default="scope, { change, value, percent } = getChange(scope.row.sourceSize, scope.row.outputSize)">
              <template v-if="scope.row.outputSize">
                <p>分辨率：{{ scope.row.outputWidth }}</p>
                <p>文件大小：{{ getSize(scope.row.outputSize) }}</p>
                <p v-if="value" :class="{'compress-list__size': true, 'compress-list__size--add': change > 0}">
                  变化：{{ change > 0 ? '+' : '-' }}{{ value }}（{{ percent }}）
                </p>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="outputType" label="输出类型" width="100" />
          <el-table-column label="操作" width="90px" align="center">
            <template #default="scope">
              <el-space wrap direction="vertical">
                <el-button type="primary" :loading="scope.row.loading" size="small" @click="handleDealSingle(scope.$index)">
                  处理
                </el-button>
                <el-button type="success" :disabled="!scope.row.output" size="small" @click="handleDownloadSingle(scope.row)">
                  下载
                </el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.$index)">
                  删除
                </el-button>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <template #content>
      <p>基于<a href="https://www.npmjs.com/package/compressorjs" target="_blank" rel="noopener noreferrer">Compressor.js</a>实现。使用浏览器的 canvas.toBlob API 进行压缩工作，这意味着它是有损压缩的，并且在不同的浏览器中具有不同的压缩效果。</p>
      <p>
        需要无损压缩可以考虑：
      </p>
      <ul>
        <li><a href="https://zh.recompressor.com/" target="_blank" rel="noopener noreferrer">Recompressor</a></li>
        <li><a href="https://tinify.cn/" target="_blank" rel="noopener noreferrer">TinyPNG</a></li>
      </ul>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import type { UploadFiles } from 'element-plus'
import Compressor from 'compressorjs'
import convert from 'convert-units'
import downloadFile from '@/utils/download'

interface FileItem {
  name: string;
  file: File;
  source: string;
  sourceSize: number;
  sourceWidth?: string;
  sourceType: string;
  outputRaw?: File | Blob;
  output?: string;
  outputSize?: number;
  outputType?: string;
  outputWidth?: string;
  loading?: boolean
}

const data = reactive<FileItem[]>([])
const configs = reactive<{
  strict: boolean;
  checkOrientation: boolean;
  retainExif: boolean;
  mimeType: string;
  resize: 'none' | 'contain' | 'cover' | undefined;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  width?: number;
  height?: number;
  quality: number;
  convertSize?: number;
}>({
  strict: true,
  checkOrientation: true,
  retainExif: false,
  mimeType: 'auto',
  resize: 'none',
  quality: 0.8,
  convertSize: 5000000
})
const convertTypes = reactive([
  { value: 'auto', label: '跟随原图' },
  { value: 'image/png', label: 'png' },
  { value: 'image/jpeg', label: 'jpeg' },
  { value: 'image/webp', label: 'webp' },
  { value: 'image/avif', label: 'avif' },
  { value: 'image/apng', label: 'apng' }
])

const allLoading = ref(false)
const handleDeal = async function () {
  allLoading.value = true
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    data[i].loading = true
    const output = await compressorImage(item.file).finally(() => {
      data[i].loading = false
    })
    data[i] = {
      ...item,
      outputRaw: output,
      output: URL.createObjectURL(output),
      outputSize: output.size,
      outputType: output.type.replace(/image\//, '')
    }
  }
  allLoading.value = false
}

function compressorImage (file: File): Promise<File | Blob> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      ...configs,
      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success (result) {
        resolve(result)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

const onFileChange = ({ uploadFiles }: { uploadFiles: UploadFiles }) => {
  uploadFiles.forEach((file) => {
    if (file.raw) {
      const fileItem = file.raw
      const fileUrl = URL.createObjectURL(fileItem)

      if (!data.some(item => item.name === fileItem.name)) {
        data.push({
          name: fileItem.name,
          file: fileItem,
          source: fileUrl,
          sourceSize: fileItem.size,
          sourceType: fileItem.type.replace(/image\//, '')
        })
      }
    }
  })
}

const fileListCount = computed(() => {
  return data.filter(item => item.output).length
})

const handleDownload = () => {
  const fileList = data.filter(item => item.output)
    .map(item => ({
      file: item.outputRaw,
      filename: (item.outputRaw as File)?.name || item.name
    }))
  downloadFile(fileList)
}

const handleClear = () => {
  data.splice(0)
}

const getSize = (size: number, focus = true) => {
  if (!size && focus) {
    return ''
  }
  const { val, unit } = convert(size).from('b').toBest()
  return `${+val.toFixed(3)} ${unit}`
}

const handleDelete = (index: number) => {
  data.splice(index, 1)
}

const handleDealSingle = async (index: number) => {
  const item = data[index]
  data[index].loading = true
  const output = await compressorImage(item.file).finally(() => {
    data[index].loading = false
  })
  data[index] = {
    ...item,
    outputRaw: output,
    output: URL.createObjectURL(output),
    outputSize: output.size,
    outputType: output.type.replace(/image\//, '')
  }
}

const handleDownloadSingle = (item: FileItem) => {
  downloadFile([{
    file: item.outputRaw,
    filename: (item.outputRaw as File)?.name || item.name
  }])
}

const onSourceLoad = (e: Event, index: number, type?: string) => {
  const naturalWidth = (e.target as HTMLImageElement)?.naturalWidth
  const naturalHeight = (e.target as HTMLImageElement)?.naturalHeight
  if (type === 'output') {
    data[index].outputWidth = naturalWidth ? `${naturalWidth} x ${naturalHeight}` : ''
  } else {
    data[index].sourceWidth = naturalWidth ? `${naturalWidth} x ${naturalHeight}` : ''
  }
}

const getChange = (sourceSize: number, outputSize: number) => {
  if (!sourceSize || !outputSize) {
    return {
      change: 0,
      value: '',
      percent: ''
    }
  }
  const change = Math.abs(outputSize - sourceSize)
  return {
    change: outputSize - sourceSize,
    value: getSize(change, false),
    percent: +(change / sourceSize * 100).toFixed(2) + '%'
  }
}
</script>

<style lang="scss" scoped>
.compress {
  display: flex;
  gap: 16px;

  &-config {
    width: 232px;
  }

  &-list {
    flex: 1;
    overflow: hidden;

    &__thumb {
      display: block;
      width: 100%;
      height: 100px;
    }

    &__size {
      color: var(--el-color-success);

      &--add {
        color: var(--el-color-error);
      }
    }
  }
}
</style>
