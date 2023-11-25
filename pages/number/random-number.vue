<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="范围">
          <el-space>
            <el-input-number v-model="form.start" controls-position="right" />
            <span>~</span>
            <el-input-number v-model="form.end" controls-position="right" />
          </el-space>
        </el-form-item>
        <el-form-item label="取整">
          <el-switch v-model="form.round" />
        </el-form-item>
        <el-form-item label="结果">
          {{ form.result }}
        </el-form-item>
        <el-button type="primary" @click="handleGenerator">
          生成
        </el-button>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import random from 'xijs/src/random'

const form = reactive({
  start: 0,
  end: 100,
  round: true,
  result: 0
})

onBeforeMount(() => {
  handleGenerator()
})

function handleGenerator () {
  const { start, end, round } = form
  const randomNumber = random(start, end)
  form.result = round ? Math.round(randomNumber) : randomNumber
}
</script>
