<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="输入">
          <el-input-number v-model="form.input" class="input-number" controls-position="right" @change="handleFormat" />
        </el-form-item>
        <el-form-item label="输出">
          <el-input v-model="form.output" />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import formatNumber from 'xijs/src/formatNumber'

definePageMeta({
  title: '千分位格式',
  description: '数值千分位格式化，支持小数点。',
  updateTime: '2023-11-26'
})

const form = reactive({
  input: 1234567,
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input } = form
  form.output = formatNumber(input) as string
}
</script>

<style lang="scss" scoped>
.input-number {
  width: 350px;
}
</style>
