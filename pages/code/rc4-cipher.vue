<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="RC4" />

    <template #content>
      <p>依据 <a href="https://www.npmjs.com/package/crypto-js" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/crypto-js</a> 标准和安全加密算法的 JavaScript 实现</p>
      <p>RC4 是一种广泛使用的流密码。它用于 SSL 和 WEP 等流行协议。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'RC4加密解密',
  description: '使用RC4算法来加密输入的文本，并提供一些选项来定制加密过程。'
})
</script>
