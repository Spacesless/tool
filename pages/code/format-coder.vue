<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="输入">
          <el-input
            v-model="form.content"
            :rows="6"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="处理算法">
          <el-radio-group v-model="form.algorithm">
            <el-radio-button v-for="item in algorithmOptions" :key="item" :label="item">
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理方式">
          <el-radio-group v-model="form.method">
            <el-radio label="encode">
              编码
            </el-radio>
            <el-radio label="decode">
              解码
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输出">
          <el-input
            v-model="result"
            :rows="6"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script lang="ts" setup>
import CryptoJS from 'crypto-js'

const algorithmOptions = reactive([
  'Base64', 'Latin1', 'Utf8', 'Utf16', 'Utf16LE'
])
const form = reactive({
  method: 'encode',
  algorithm: 'Base64',
  content: ''
})
const result = ref('')

watch(() => form, handleEncode, {
  deep: true,
  immediate: true
})

function handleEncode () {
  const { algorithm, method, content } = form

  let algorithmHandler = CryptoJS.enc.Base64
  switch (algorithm) {
    case 'Utf8':
      algorithmHandler = CryptoJS.enc.Utf8
      break
    case 'Latin1':
      algorithmHandler = CryptoJS.enc.Latin1
      break
    case 'Utf16':
      algorithmHandler = CryptoJS.enc.Utf16
      break
    case 'Utf16LE':
      algorithmHandler = CryptoJS.enc.Utf16LE
      break
  }

  if (method === 'encode') {
    // 编码
    const words = CryptoJS.enc.Utf8.parse(content)
    result.value = algorithmHandler.stringify(words)
  } else {
    // 解码
    const words = algorithmHandler.parse(content)
    result.value = CryptoJS.enc.Utf8.stringify(words)
  }
}
</script>
