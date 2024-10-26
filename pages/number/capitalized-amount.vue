<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="输入">
          <el-input-number v-model="form.input" :max="100000000000" controls-position="right" @change="handleFormat" />
        </el-form-item>
        <el-form-item label="结果">
          <el-input v-model="form.output" type="textarea" readonly :rows="3" />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import capitalizedAmount from 'xijs/src/capitalizedAmount'

definePageMeta({
  title: '大写数字',
  description: '数字金额转为大写，最大只支持到千亿。',
  updateTime: '2023-11-26'
})

const form = reactive({
  input: 666.66,
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input } = form
  form.output = capitalizedAmount(input)
}
</script>
