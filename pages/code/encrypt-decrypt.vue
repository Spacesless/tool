<template>
  <section class="md5 section">
    <el-tabs v-model="algorithm" type="border-card">
      <el-tab-pane v-for="item in algorithmOptions" :key="item" :label="item">
        {{ item }}
      </el-tab-pane>
    </el-tabs>
    <el-form :model="form" label-width="80px">
      <el-form-item label="处理方式">
        <el-radio-group v-model="form.method">
          <el-radio label="encrypt">
            加密
          </el-radio>
          <el-radio label="decrypt">
            解密
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输入秘钥">
        <el-input v-model="form.secret" />
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
          {{ form.method === 'encrypt' ? '加密' : '解密' }}
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

const algorithm = ref('AES')
const algorithmOptions = reactive([
  'AES', 'DES', 'TripleDES', 'Rabbit', 'RC4', 'RC4Drop'
])
const form = reactive({
  method: 'encrypt',
  secret: '',
  content: ''
})
const result = ref('')

// 8位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('66886688')
const handleCipher = () => {
  const { method, secret, content } = form

  let algorithmHandler = CryptoJS.AES
  switch (algorithm.value) {
    case 'DES':
      algorithmHandler = CryptoJS.DES
      break
    case 'TripleDES':
      algorithmHandler = CryptoJS.TripleDES
      break
    case 'Rabbit':
      algorithmHandler = CryptoJS.Rabbit
      break
    case 'RC4':
      algorithmHandler = CryptoJS.RC4
      break
    case 'RC4Drop':
      algorithmHandler = CryptoJS.RC4Drop
      break
  }

  const secretHex = CryptoJS.enc.Utf8.parse(secret)

  if (method === 'decrypt') {
    // 解密
    const encryptedHexStr = CryptoJS.enc.Hex.parse(content)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypted = algorithmHandler.decrypt(str, secretHex, {
      iv: SECRET_IV
    })
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
    result.value = decryptedStr.toString()
  } else {
    // 加密
    const dataHex = CryptoJS.enc.Utf8.parse(content)
    const encrypted = algorithmHandler.encrypt(dataHex, secretHex, {
      iv: SECRET_IV
    })
    result.value = encrypted.ciphertext.toString()
  }
}
</script>
