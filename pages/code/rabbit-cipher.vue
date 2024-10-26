<template>
  <ToolLayout>
    <EncryptDecrypt algorithm="Rabbit" />
  </ToolLayout>
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

definePageMeta({
  title: 'Rabbit加密解密',
  description: '对称加密工具，使用Rabbit流密码算法加密数据。'
})
</script>
