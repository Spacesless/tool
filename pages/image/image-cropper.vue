<template>
  <div class="section">
    <canvas id="cropper" />
  </div>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'

onMounted(() => {
  const image = document.getElementById('app')
  const cropper = new Cropper(image, {

  })

  console.log(cropper)
})
</script>
