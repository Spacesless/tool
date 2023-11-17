<template>
  <ToolBanner :current-tool="currentTool" />

  <EncryptDecrypt algorithm="RC4Drop" />
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'

const { currentTool } = useToolData()
</script>
