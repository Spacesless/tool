<template>
  <ToolLayout>
    <el-form :model="form" label-position="top">
      <el-form-item label="label">
        <el-input-number v-model="form.input" @change="handleFormat" />
      </el-form-item>
      <el-form-item label="label">
        <el-input v-model="form.output" />
      </el-form-item>
    </el-form>
  </ToolLayout>
</template>

<script setup lang="ts">
import { formatNumber } from 'xijs'

const form = reactive({
  input: 123456,
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input } = form
  form.output = formatNumber(input)
}
</script>
