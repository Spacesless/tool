<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        输入：
      </div>
      <el-input v-model="input" type="textarea" placeholder="" :rows="20" />
      <div class="result">
        <p>字符：{{ result.chars }}</p>
        <p>行数：{{ result.chars ? result.lines : 0 }}</p>
        <p>单词：{{ result.words }}</p>
        <p>数字：{{ result.numbers }}</p>
        <p>字母：{{ result.letters }}</p>
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { count } from 'letter-count'

definePageMeta({
  title: '字数统计',
  description: '行数、字符、单词、数字、字母的数量统计',
  updateTime: '2023-12-27'
})

const input = ref('')

const result = computed(() => {
  return count(input.value)
})
</script>

<style lang="scss" scoped>
.result {
  margin-top: 16px;
  color: var(--el-text-color-primary);
  line-height: 1.7;
}
</style>
