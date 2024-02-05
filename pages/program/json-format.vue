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
const input = ref('')

function handleParse (str: string) {
  let result = {}
  try {
    result = JSON.parse(str)
  } catch {}
  return result
}

function handleMinify () {
  const strToResult = handleParse(input.value)
  return JSON.stringify(strToResult)
}

function handleBeautify () {
  const strToResult = handleParse(input.value)
  return JSON.stringify(strToResult, null, 2)
}
</script>
