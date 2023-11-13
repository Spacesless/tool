<template>
  <div class="section">
    <canvas id="cropper" />
  </div>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'

onMounted(() => {
  const image = document.getElementById('app') as HTMLImageElement
  const cropper = new Cropper(image, {

  })

  // eslint-disable-next-line no-console
  console.log(cropper)
})
</script>
