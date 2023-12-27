<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        输入：
      </div>
      <el-input v-model="input" type="textarea" placeholder="" :rows="20" />
      <div class="result">
        <p>字符：{{ result.chars }}</p>
        <p>行数：{{ result.lines }}</p>
        <p>单词：{{ result.words }}</p>
        <p>数字：{{ result.numbers }}</p>
        <p>字母：{{ result.letters }}</p>
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { count } from 'letter-count'

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
