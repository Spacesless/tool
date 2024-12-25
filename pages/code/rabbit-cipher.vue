<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="Rabbit" />

    <template #content>
      <p>依据 <a href="https://www.npmjs.com/package/crypto-js" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/crypto-js</a> 标准和安全加密算法的 JavaScript 实现</p>
      <p>Rabbit 是一种高性能流密码，入围 eSTREAM 产品组合。</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from './components/-EncryptDecrypt.vue'

definePageMeta({
  title: 'Rabbit加密解密',
  description: '对称加密工具，使用Rabbit流密码算法加密数据。'
})
</script>
