<template>
  <ToolLayout>
    <section class="section">
      <CodeEditor lang="json" />
      <el-space :size="16">
        <el-button type="primary" @click="handleBeautify">
          美化
        </el-button>
        <el-button type="primary" @click="handleMinify">
          压缩
        </el-button>
      </el-space>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { minify } from 'csso'
import beautify from 'js-beautify'

const input = ref('')
const output = ref('')

function handleMinify () {
  const options = { /* options */ }
  const result = minify(input.value, options)
  output.value = result.css
}

function handleBeautify () {
  output.value = beautify.css(input.value, {})
}
</script>
