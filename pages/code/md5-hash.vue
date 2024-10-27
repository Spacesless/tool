<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="请在这里输入内容：">
          <el-input
            v-model="form.content"
            :rows="6"
            type="textarea"
            @input="handleHash"
          />
        </el-form-item>
      </el-form>

      <el-descriptions
        :column="1"
        size="large"
        border
      >
        <el-descriptions-item label="32位小写" min-width="200">
          {{ result.hash }}
        </el-descriptions-item>
        <el-descriptions-item label="32位大写" min-width="200">
          {{ result.hashUpperCase }}
        </el-descriptions-item>
        <el-descriptions-item label="16位小写" min-width="200">
          {{ result.cutHash }}
        </el-descriptions-item>
        <el-descriptions-item label="16位大写" min-width="200">
          {{ result.cutHashPpperCase }}
        </el-descriptions-item>
      </el-descriptions>
    </section>

    <template #content>
      <p>基于crypto-js/md5模块实现</p>
      <p>32 位 MD5，就是 32 个十六进制数，即 16 个字节。</p>
      <p>16 位 MD5 的运算过程和 32 位 MD5 的运算过程一样，只是 16 位 MD5 最后取运算结果的中间 8 个字节。</p>
      <p>MD5 是一种广泛使用的哈希函数。它已用于各种安全应用程序，也常用于检查文件的完整性。但是，MD5 不具有抗冲突性，并且它不适用于依赖此属性的 SSL 证书或数字签名等应用程序。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import MD5 from 'crypto-js/md5'

definePageMeta({
  title: 'MD5哈希',
  description: 'MD5哈希工具是一种加密算法，可为任何给定的输入数据生成唯一的哈希值。'
})

const form = reactive({
  content: ''
})
const hash = ref('')

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
