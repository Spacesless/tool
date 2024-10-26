<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="RC4Drop" />
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'RC4Drop加密解密',
  description: '改进的RC4算法，它通过在加密过程中丢弃一定数量的密钥流，从而提高了RC4算法的安全性。'
})
</script>
