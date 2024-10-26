<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :md="12">
          <div class="section-header">
            输入
          </div>
          <CodeEditor v-model:code="input" class="code-editor" lang="javascript" />
          <el-space :size="16">
            <el-button type="primary" @click="handleBeautify">
              美化
            </el-button>
            <el-button type="primary" @click="handleMinify">
              压缩
            </el-button>
          </el-space>
        </el-col>
        <el-col :md="12">
          <div class="section-header">
            输出
          </div>
          <CodeEditor v-model:code="output" class="code-editor" lang="javascript" />
          <CopyButton :text="output" />
        </el-col>
      </el-row>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { minify } from 'terser'
import beautify from 'js-beautify'

definePageMeta({
  title: 'Javascript格式化',
  description: '支持Javascript代码压缩、美化'
})

const input = ref('')
const output = ref('')

async function handleMinify () {
  const result = await minify(input.value)
  output.value = result.code || ''
}

function handleBeautify () {
  output.value = beautify(input.value, {})
}
</script>

<style lang="scss" scoped>
.code-editor :deep(.cm-editor) {
  margin-bottom: 16px;
}
</style>
