<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="DES" />

    <template #content>
      <p>依据 <a href="https://www.npmjs.com/package/crypto-js" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/crypto-js</a> 标准和安全加密算法的 JavaScript 实现</p>
      <p>DES 是以前占主导地位的加密算法，并作为官方联邦信息处理标准 （FIPS） 发布。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'DES加密解密',
  description: '使用DES算法来加密和解密文本，并支持多种加密模式和填充方法。'
})
</script>
