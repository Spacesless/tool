<template>
  <ToolBanner :tool-data="toolData" />
  <slot />

  <section class="section content">
    <slot name="content" />

    <div class="content-footer">
      <p>版本：{{ toolData.version || 'v1.0.0' }}</p>
      <p>发布时间：{{ toolData.updateTime || '2023-11-19' }}</p>
    </div>
  </section>

  <WalineComment />
</template>

<script setup lang="ts">
const { toolData } = useToolData()
</script>
