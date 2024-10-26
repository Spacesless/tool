<template>
  <ToolLayout>
    <section class="section">
      <el-row v-loading="analyzing" :gutter="16">
        <el-col :md="12">
          <div class="analyze-upload">
            <UploadFile :drag="true" @change-file="onFileChange" />
          </div>
        </el-col>
        <el-col :md="12">
          <el-scrollbar class="analyze-list" tag="ul">
            <li v-for="item in result" :key="item.color" class="analyze-list__item" :style="{background: item.color}">
              <span>{{ item.color }}</span>
              <span>数量：{{ item.count }}</span>
            </li>
          </el-scrollbar>
        </el-col>
      </el-row>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import analyze from 'rgbaster'
import type { UploadFile } from 'element-plus'
import { sleep } from '@/utils'

definePageMeta({
  title: '分析图片颜色',
  description: '支持上传图片，获取图片的主要颜色'
})

const result = ref<{ color: string; count: number }[]>([])

const analyzing = ref(false)
async function handleAnalyze (fileUrl: string) {
  analyzing.value = true
  await sleep(300)
  const analyzeList = await analyze(fileUrl).catch(() => {})
  analyzing.value = false
  result.value = analyzeList?.slice(0, 32) || []
}

const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    const fileUrl = URL.createObjectURL(uploadFile.raw)

    handleAnalyze(fileUrl)
  }
}
</script>

<style lang="scss" scoped>
.analyze {
  &-upload,
  &-list {
    height: 350px;
  }

  &-list {
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      margin-bottom: 6px;
      padding: 0 16px;
      color: #ffffff;
      text-shadow: 0 0 4px #000000;
      border-radius: 6px;
    }
  }
}
</style>
