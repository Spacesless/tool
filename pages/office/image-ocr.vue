<template>
  <el-row class="section">
    <el-form :model="form" label-width="80px">
      <el-col :sm="24" :md="12" @change="handleConvert" />
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.result"
            :rows="6"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
import { createWorker } from 'tesseract.js'

const form = reactive({
  content: '',
  type: 'cn',
  result: ''
})

async function handleConvert () {
  const worker = await createWorker('eng')
  const ret = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png')
  form.result = ret.data.text
  await worker.terminate()
}
</script>
