<template>
  <ToolLayout>
    <el-form :model="form" label-position="top">
      <el-form-item label="数量">
        <el-input-number v-model="form.count" :min="1" :max="1024" />
      </el-form-item>
      <el-form-item label="字典">
        <el-input v-model="form.dictionary" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item label="结果">
        {{ form.result }}
      </el-form-item>
      <el-button type="primary" @click="handleGenerator">
        生成
      </el-button>
    </el-form>
  </ToolLayout>
</template>

<script setup lang="ts">
import { randomStr } from 'xijs'

const form = reactive({
  count: 0,
  dictionary: null,
  result: ''
})

onBeforeMount(() => {
  handleGenerator()
})

function handleGenerator () {
  const { count, dictionary } = form
  form.result = randomStr(count, dictionary)
}
</script>
