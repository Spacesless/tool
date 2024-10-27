<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="RC4Drop" />

    <template #content>
      <p>依据 <a href="https://www.npmjs.com/package/crypto-js" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/crypto-js</a> 标准和安全加密算法的 JavaScript 实现</p>
      <p>RC4 是一种广泛使用的流密码。它用于 SSL 和 WEP 等流行协议。</p>
      <p>已发现 keystream 的前几个字节是强非随机的，并且会泄露有关密钥的信息。我们可以通过丢弃密钥流的初始部分来防御这种攻击。这种修改后的算法传统上称为 RC4-drop。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'RC4Drop加密解密',
  description: '改进的RC4算法，它通过在加密过程中丢弃一定数量的密钥流，从而提高了RC4算法的安全性。'
})
</script>
