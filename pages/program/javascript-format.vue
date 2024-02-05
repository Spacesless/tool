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
        <el-button type="primary" @click="handleObfuscator">
          混淆
        </el-button>
      </el-space>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
// npm i -D js-beautify terser javascript-obfuscator
import { minify } from 'html-minifier'
import beautify from 'js-beautify'
import { obfuscate } from 'javascript-obfuscator'

const input = ref('')

function handleMinify () {
  return minify(input.value, {
    minifyCSS: true, // 压缩css
    minifyJS: true, // 压缩js
    collapseWhitespace: true, // 删除html里的空格 达到html的压缩
    removeAttributeQuotes: true, // 尽可能删除html标签里的双引号 达到html的压缩
    removeComments: true, // 删除html中的注释
    removeCommentsFromCDATA: true // 从脚本和样式删除的注释
  })
}

function handleBeautify () {
  return beautify(input.value, {})
}

function handleObfuscator () {
  return obfuscate(input.value,
    {
      compact: false,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      shuffleStringArray: true,
      splitStrings: true,
      stringArrayThreshold: 1
    }
  )
}
</script>
