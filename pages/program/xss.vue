<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-row :gutter="16">
          <el-col :sm="24" :md="12">
            <el-form-item label="输入">
              <el-input v-model="form.input" type="textarea" :rows="10" @change="handleFormat" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="输出">
              <el-input v-model="form.output" type="textarea" :rows="10" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import xss from 'xijs/src/xss'

definePageMeta({
  title: 'XSS',
  description: '对 html 标签进行转义解决 xss 注入'
})

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
