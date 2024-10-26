<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="数量">
          <el-input-number v-model="form.count" :min="1" :max="1024" controls-position="right" />
        </el-form-item>
        <el-form-item label="字典">
          <el-input v-model="form.dictionary" type="textarea" :rows="3" />
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
import randomStr from 'xijs/src/randomStr'

definePageMeta({
  title: '随机字符串',
  description: '生成随机字符串，支持设置数量和字典。',
  updateTime: '2023-11-26'
})

const form = reactive({
  count: 10,
  dictionary: undefined,
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
