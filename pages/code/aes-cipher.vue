<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="AES" />

    <template #content>
      <p>依据 <a href="https://www.npmjs.com/package/crypto-js" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/crypto-js</a> 标准和安全加密算法的 JavaScript 实现</p>
      <p>高级加密标准 （AES） 是美国联邦信息处理标准 （FIPS）。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'AES加密解密',
  description: '使用AES算法来加密和解密文本，并支持多种加密模式和填充方法。'
})
</script>
