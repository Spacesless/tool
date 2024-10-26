<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="RC4" />
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'RC4加密解密',
  description: '使用RC4算法来加密输入的文本，并提供一些选项来定制加密过程。'
})
</script>
