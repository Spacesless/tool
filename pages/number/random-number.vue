<template>
  <ToolLayout>
    <el-form :model="form" label-position="top">
      <el-form-item label="范围">
        <el-space>
          <el-input-number v-model="form.start" />
          <span>~</span>
          <el-input-number v-model="form.end" />
        </el-space>
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
import { random } from 'xijs'

const form = reactive({
  start: 0,
  end: 100,
  result: 0
})

onBeforeMount(() => {
  handleGenerator()
})

function handleGenerator () {
  const { start, end } = form
  form.result = random(start, end)
}
</script>
