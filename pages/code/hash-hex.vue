<template>
  <section class="section">
    <h1>{{ currentTool.name }}</h1>
    <p>{{ currentTool.description }}</p>
  </section>

  <section class="md5 section">
    <el-form :model="form" label-width="80px">
      <el-form-item label="输入内容">
        <el-input
          v-model="form.content"
          :rows="6"
          type="textarea"
          @keyup.enter="handleHash"
        />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleHash">
          处理
        </el-button>
      </el-form-item>
    </el-form>

    <el-descriptions
      :column="1"
      size="large"
      border
    >
      <el-descriptions-item label="32位小写">
        {{ result.hash }}
      </el-descriptions-item>
      <el-descriptions-item label="32位大写">
        {{ result.hashUpperCase }}
      </el-descriptions-item>
      <el-descriptions-item label="16位小写">
        {{ result.cutHash }}
      </el-descriptions-item>
      <el-descriptions-item label="16位大写">
        {{ result.cutHashPpperCase }}
      </el-descriptions-item>
    </el-descriptions>
  </section>
</template>

<script lang="ts" setup>
import MD5 from 'crypto-js/md5'

import { useToolData } from '@/hooks/tool'

const route = useRoute()
const { currentTool } = useToolData(route.path)

const form = reactive({
  content: ''
})
const hash = ref('d41d8cd98f00b204e9800998ecf8427e')

const result = computed(() => {
  const cutHash = hash.value.substring(8, 24) || ''
  return {
    hash: hash.value || '',
    hashUpperCase: hash.value.toUpperCase() || '',
    cutHash,
    cutHashPpperCase: cutHash.toUpperCase()
  }
})

const handleHash = () => {
  const { content } = form

  hash.value = MD5(content).toString()
}
</script>
