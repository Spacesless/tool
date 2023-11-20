<template>
  <ToolLayout>
    <section class="section">
      <div>
        <canvas id="cropper" />
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

onMounted(() => {
  const image = document.getElementById('cropper') as HTMLImageElement
  const cropper = new Cropper(image, {

  })

  // eslint-disable-next-line no-console
  console.log(cropper)
})
</script>

<style lang="scss" scoped>
#cropper {
  width: 100%;
  height: 600px;
}
</style>
