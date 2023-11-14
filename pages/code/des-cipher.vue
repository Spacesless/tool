<template>
  <section class="md5 section">
    <el-form :model="form" label-width="100px">
      <el-form-item label="输入">
        <el-input
          v-model="form.content"
          :rows="6"
          type="textarea"
        />
      </el-form-item>
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
      <el-form-item label="秘钥">
        <el-input v-model="form.secret" type="password" show-password />
      </el-form-item>
      <el-form-item label="秘钥偏移量">
        <el-input v-model="form.iv" type="password" show-password />
      </el-form-item>
      <el-form-item label="模式">
        <el-select v-model="form.mode">
          <el-option v-for="item in modeOptions" :key="item" :value="item">
            {{ item }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填充">
        <el-select v-model="form.padding">
          <el-option v-for="item in paddingOptions" :key="item" :value="item">
            {{ item }}
          </el-option>
        </el-select>
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
</template>

<script lang="ts" setup>
import CryptoJS from 'crypto-js'

const form = reactive({
  method: 'encrypt',
  secret: 'Timeless',
  iv: '6688',
  mode: 'CBC',
  padding: 'Pkcs7',
  content: 'DES encryption'
})
const result = ref('')
const modeOptions = reactive(['CBC', 'CFB', 'CTR', 'OFB', 'ECB'])
const paddingOptions = reactive(['Pkcs7', 'Iso97971', 'AnsiX923', 'Iso10126', 'ZeroPadding', 'NoPadding'])

watch(() => form, handleCipher, {
  deep: true,
  immediate: true
})

function handleCipher () {
  const { method, secret, iv, content } = form

  const secretHex = CryptoJS.enc.Utf8.parse(secret)
  const SECRET_IV = CryptoJS.enc.Utf8.parse(iv)

  if (method === 'decrypt') {
    // 解密
    const encryptedHexStr = CryptoJS.enc.Hex.parse(content)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypted = CryptoJS.DES.decrypt(str, secretHex, {
      iv: SECRET_IV
    })
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
    result.value = decryptedStr.toString()
  } else {
    // 加密
    const dataHex = CryptoJS.enc.Utf8.parse(content)
    const encrypted = CryptoJS.DES.encrypt(dataHex, secretHex, {
      iv: SECRET_IV
    })
    result.value = encrypted.ciphertext.toString()
  }
}
</script>
