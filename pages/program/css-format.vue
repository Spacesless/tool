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
// npm i -D js-beautify clean-css
import CleanCSS from 'clean-css'
import beautify from 'js-beautify'

const input = ref()

function handleMinify () {
  const options = { /* options */ }
  const output = new CleanCSS(options).minify(input.value)
  return output.styles
}

function handleBeautify () {
  return beautify(input.value, {})
}
</script>
