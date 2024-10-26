<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form">
        <el-form-item label="选择图片">
          <UploadFile list-type="picture-card" :multiple="true" @change-file="onFileChange" />
        </el-form-item>
        <el-form-item label="图标尺寸">
          <el-checkbox-group v-model="form.size">
            <el-checkbox label="16">
              16x16
            </el-checkbox>
            <el-checkbox label="32">
              32x32
            </el-checkbox>
            <el-checkbox label="64">
              64x64
            </el-checkbox>
            <el-checkbox label="128">
              128x128
            </el-checkbox>
            <el-checkbox label="256">
              256x256
            </el-checkbox>
            <el-checkbox label="512">
              512x512
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="图标形状">
          <el-radio-group v-model="form.shape">
            <el-radio-button label="square">
              正方形
            </el-radio-button>
            <el-radio-button label="circle">
              圆形
            </el-radio-button>
            <el-radio-button label="fillet">
              圆角矩形
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="fileList.length === 0 || form.size.length === 0" @click="handleConvert">
            转换为ICO
          </el-button>
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import type { UploadFiles } from 'element-plus'
import downloadFile from '@/utils/download'

definePageMeta({
  title: 'Favicon生成',
  description: '图片转换成ico文件，生成网站favicon.ico'
})

interface Options {
  source: string;
  size: number;
  shape: string;
  bleed?: boolean;
}

const form = reactive({
  size: ['32'],
  shape: 'square'
})
const fileList = ref<UploadFiles>([])

const onFileChange = ({ uploadFiles }: { uploadFiles: UploadFiles }) => {
  fileList.value = uploadFiles
}

async function handleConvert () {
  const { size, shape } = form
  const IcoInstance = new IcoConverter()

  const downloadList = []
  for (const file of fileList.value) {
    if (file.url) {
      for (const s of size) {
        const result = await IcoInstance.convert({
          source: file.url,
          size: +s,
          shape
        })
        downloadList.push({
          filename: `${file.name}-${s}.ico`,
          file: result
        })
      }
    }
  }

  downloadFile(downloadList)
}

class IcoConverter {
  convert (t: Options) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const n = await this.loadImage(t.source)
      const i = await this.createPngBuffer(n, t.size, t.shape, t.bleed)

      resolve(i)
    })
  }

  convertImageURL (t: any): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (typeof t === 'string') {
        const r = await fetch(t, {
          method: 'get'
        })
        const n = await r.blob()
        resolve(URL.createObjectURL(n))
      } else {
        t instanceof File
          ? resolve(URL.createObjectURL(t))
          : reject(new Error('Unrecognized opt.source'))
      }
    })
  }

  loadImage (t: any): Promise<HTMLImageElement> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const n = await this.convertImageURL(t)
      const i = document.createElement('img')
      i.src = n
      i.onload = function () {
        resolve(i)
      }
    })
  }

  createPngBuffer (t: HTMLImageElement, e = 16, r = 'square', n = !0): Promise<Blob> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const s = this.createCanvas(e)
      this.drawImage(s, t, r, n)
      const o = await this.getPngBlob(s)
      resolve(o)
    })
  }

  createCanvas (t: number): HTMLCanvasElement {
    const r = document.createElement('canvas')
    r.width = t
    r.height = t
    return r
  }

  drawImage (t: HTMLCanvasElement, e: HTMLImageElement, r: string, n = !0) {
    const i = t.getContext('2d')
    if (!i) { return }
    i.clearRect(0, 0, t.width, t.height)
    let a = 0
    let s = 0
    let o = 0
    let f = 0
    if (
      (e.naturalWidth < e.naturalHeight
        ? ((a = t.width),
          (s = (a / e.naturalWidth) * e.naturalHeight),
          (f = -(s - a) / 2))
        : ((s = t.height),
          (a = (s / e.naturalHeight) * e.naturalWidth),
          (o = -(a - s) / 2)),
      r === 'square' && i.drawImage(e, o, f, a, s),
      r === 'circle')
    ) {
      const r = {
        x: t.width / 2,
        y: t.width / 2,
        r: t.width / 2
      }
      i.save()
      i.beginPath()
      i.arc(r.x, r.y, r.r, 0, 2 * Math.PI, !1)
      i.clip()
      i.drawImage(e, o, f, a, s)
      i.restore()
    }
    if (r === 'fillet') {
      let r = 0
      let h = 0
      if (n && t.width > 16) {
        const e = 10 / 256
        r = Math.ceil(e * t.width)
        h = Math.ceil(e * t.width)
      }
      const l = t.width - 2 * r
      const u = t.height - 2 * h
      const c = Math.floor(l / 8)
      i.beginPath()
      i.moveTo(r + c, h)
      i.arcTo(r + l, h, r + l, h + u, c)
      i.arcTo(r + l, h + u, r, h + u, c)
      i.arcTo(r, h + u, r, h, c)
      i.arcTo(r, h, r + l, h, c)
      i.closePath()
      i.clip()
      i.drawImage(e, o, f, a, s)
    }
    return i
  }

  getPngBlob (t: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      t.toBlob((t) => {
        t ? resolve(t) : reject(new Error('blob is null'))
      })
    })
  }
}
</script>
