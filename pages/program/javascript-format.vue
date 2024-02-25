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
import { minify } from 'terser'
import beautify from 'js-beautify'
import { obfuscate } from 'javascript-obfuscator'

const input = ref('')
const output = ref('')

async function handleMinify () {
  const result = await minify(input.value)
  output.value = result.code || ''
}

function handleBeautify () {
  output.value = beautify(input.value, {})
}

function handleObfuscator () {
  const obfuscationResult = obfuscate(input.value,
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

  output.value = obfuscationResult.getObfuscatedCode()
}
</script>
