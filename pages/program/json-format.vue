<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :md="12">
          <div class="section-header">
            输入
          </div>
          <CodeEditor v-model:code="input" class="code-editor" lang="json" />
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
          <CodeEditor v-model:code="output" class="code-editor" lang="json" />
          <CopyButton :text="output" />
        </el-col>
      </el-row>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'JSON格式化',
  description: '支持JSON代码压缩、美化'
})

const input = ref('')
const output = ref('')

function handleParse (str: string) {
  let result = {}
  try {
    result = JSON.parse(str)
  } catch {}
  return result
}

function handleMinify () {
  const strToResult = handleParse(input.value)
  output.value = JSON.stringify(strToResult)
}

function handleBeautify () {
  const strToResult = handleParse(input.value)
  output.value = JSON.stringify(strToResult, null, 2)
}
</script>

<style lang="scss" scoped>
.code-editor :deep(.cm-editor) {
  margin-bottom: 16px;
}
</style>
