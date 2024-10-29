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
        <el-form-item label="数量">
          <el-input-number v-model="form.count" :min="1" :max="maxCount" controls-position="right" />
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

definePageMeta({
  title: '随机数字',
  description: '返回指定范围的随机数。',
  updateTime: '2024-10-29',
  version: '1.0.1'
})

const form = reactive({
  start: 0,
  end: 100,
  count: 1,
  round: true,
  result: ''
})

const maxCount = computed(() => {
  const { start, end, round } = form
  return round ? Math.abs(start - end) : 1000
})

onBeforeMount(() => {
  handleGenerator()
})

function handleGenerator () {
  const { start, end, round, count } = form
  const result: number[] = []

  while (result.length < count) {
    const randomNumber = random(start, end)
    const fixedNumber = round ? Math.round(randomNumber) : randomNumber

    if (!result.includes(fixedNumber)) {
      result.push(fixedNumber)
    }
  }

  form.result = result.join('、')
}
</script>
