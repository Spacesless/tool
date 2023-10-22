<template>
  <div class="section">
    <div id="tui-image-editor" />
  </div>
</template>

<script setup lang="ts">
import ImageEditor from 'tui-image-editor'

const instance = new ImageEditor('#tui-image-editor', {
  cssMaxWidth: 700,
  cssMaxHeight: 500,
  selectionStyle: {
    cornerSize: 20,
    rotatingPointOffset: 70
  }
})
</script>
