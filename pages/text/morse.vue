<template>
  <ToolLayout>
    <section class="section morse">
      <el-input v-model="input" placeholder="" :rows="8" type="textarea" clearable />
      <el-divider direction="horizontal" content-position="center">
        to
      </el-divider>
      <el-input v-model="output" placeholder="" :rows="8" type="textarea" clearable />
      <div class="morse-button">
        <el-button type="primary" round @click="textToMorse">
          文本转摩尔斯电码
        </el-button>
        <el-button type="primary" round @click="morseToText">
          摩尔斯电码转文本
        </el-button>
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { decode, encode } from 'xmorse'

definePageMeta({
  title: '摩尔斯电码',
  description: '摩尔斯电码和文本互转工具，支持中文。',
  updateTime: '2024-05-18'
})

const input = ref('SOS')
const output = ref('.../---/...')

/**
 * 文本转摩尔斯电码
 */
const textToMorse = () => {
  output.value = encode(input.value)
}

/**
 * 摩尔斯电码转文本
 */
const morseToText = () => {
  output.value = decode(input.value)
}
</script>

<style lang="scss" scoped>
.morse {
  &-button {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
