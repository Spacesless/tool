<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <UploadFile />
      </div>
      <el-table
        :data="data"
      >
        <el-table-column
          prop="prop"
          label="label"
          width="width"
        >
          <el-image
            :src="url"
          />
        </el-table-column>
        <el-table-column
          prop="prop"
          label="label"
          width="width"
        />
        <el-table-column
          prop="prop"
          label="label"
          width="width"
        >
          <el-image
            :src="url"
          />
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      />
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
// npm install --save jimp
import Jimp from 'jimp'

const data = reactive([])
const url = ref('')

function resizeImage (imageUrl: string, options: { weight: number; height: number }) {
  return new Promise((resolve, reject) => {
    Jimp.read(imageUrl)
      .then(async (image) => {
        // Do stuff with the image.
        const { width, height } = options
        image.cover(width, height)
        const dataUrl = await image.getBase64Async('image/png')

        resolve(dataUrl)
      })
      .catch((err) => {
        // Handle an exception.
        reject(new Error(err))
      })
  })
}
</script>
