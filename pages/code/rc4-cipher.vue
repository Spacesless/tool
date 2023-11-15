<template>
  <ToolBanner :current-tool="currentTool" />

  <EncryptDecrypt algorithm="RC4" />
</template>

<script lang="ts" setup>
import EncryptDecrypt from '@/components/tool/EncryptDecrypt.vue'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()
</script>
