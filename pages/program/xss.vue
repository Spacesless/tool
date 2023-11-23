<template>
  <ToolLayout>
    <el-form :model="form" label-position="top">
      <el-row>
        <el-col :sm="24" :md="12">
          <el-form-item label="输入">
            <el-input v-model="form.input" type="textarea" :row="10" @change="handleFormat" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="输出">
            <el-input v-model="form.output" type="textarea" :row="10" readonly />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ToolLayout>
</template>

<script setup lang="ts">
import { xss } from 'xijs'

const form = reactive({
  input: '<a href="#">Me & you</a>',
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input } = form
  form.output = xss(input)
}
</script>
