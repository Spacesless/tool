<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="DES" />
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'DES加密解密',
  description: '使用DES算法来加密和解密文本，并支持多种加密模式和填充方法。'
})
</script>
