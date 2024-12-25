<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="TripleDES" />
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from './components/-EncryptDecrypt.vue'

definePageMeta({
  title: 'TripleDES加密解密',
  description: '使用TripleDES算法来加密和解密数据。'
})
</script>
