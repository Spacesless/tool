<template>
  <section class="md5 section">
    <el-tabs v-model="algorithm" type="border-card">
      <el-tab-pane v-for="item in algorithmOptions" :key="item" :label="item" />
    </el-tabs>
    <el-form :model="form" label-width="80px">
      <el-form-item label="处理方式">
        <el-radio-group v-model="form.method">
          <el-radio label="encrypt">
            编码
          </el-radio>
          <el-radio label="decrypt">
            解码
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输入内容">
        <el-input
          v-model="form.content"
          :rows="6"
          type="textarea"
          @keyup.enter="handleCipher"
        />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleCipher">
          {{ form.method === 'encrypt' ? '编码' : '解码' }}
        </el-button>
      </el-form-item>
      <el-form-item label="输入内容">
        <el-input
          v-model="result"
          :rows="6"
          type="textarea"
          :readonly="true"
        />
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import CryptoJS from 'crypto-js'

const algorithm = ref('Base64')
const algorithmOptions = reactive([
  'Base64', 'Utf8', 'Utf16', 'Utf16LE', 'URL'
])
const form = reactive({
  method: 'encrypt',
  content: ''
})
const result = ref('')

const handleCipher = () => {
  const { method, content } = form

  let algorithmHandler = CryptoJS.enc.Base64
  switch (algorithm.value) {
    case 'Utf8':
      algorithmHandler = CryptoJS.enc.Utf8
      break
    case 'Utf16':
      algorithmHandler = CryptoJS.enc.Utf16
      break
    case 'Utf16LE':
      algorithmHandler = CryptoJS.enc.Utf16LE
      break
  }

  if (method === 'decrypt') {
    // 解码
    const words = algorithmHandler.parse(content)
    result.value = CryptoJS.enc.Utf8.stringify(words)
  } else {
    // 编码
    const words = CryptoJS.enc.Utf8.parse(content)
    result.value = algorithmHandler.stringify(words)
  }
}
</script>
