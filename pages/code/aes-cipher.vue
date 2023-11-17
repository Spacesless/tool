<template>
  <ToolBanner :current-tool="currentTool" />

  <EncryptDecrypt algorithm="AES" />
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

const { currentTool } = useToolData()
</script>
