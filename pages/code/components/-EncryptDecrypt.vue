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
      <el-form-item v-if="!['RC4', 'RC4Drop'].includes(props.algorithm)" label="秘钥偏移量">
        <el-input v-model="form.iv" type="password" show-password />
      </el-form-item>
      <el-form-item v-if="props.algorithm === 'RC4Drop'" label="丢弃字数">
        <el-input-number v-model="form.drop" :min="0" :max="99999" />
      </el-form-item>
      <template v-if="!['Rabbit', 'RC4', 'RC4Drop'].includes(props.algorithm)">
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
      </template>
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

const props = withDefaults(
  defineProps<{ algorithm?: string }>(), {
    algorithm: 'AES'
  }
)

const form = reactive({
  method: 'encrypt',
  secret: 'Timeless',
  iv: '6688',
  mode: 'CBC',
  padding: 'Pkcs7',
  content: 'CryptoJS encryption and decryption',
  drop: 0
})
const result = ref('')
const modeOptions = reactive(['CBC', 'CFB', 'CTR', 'OFB', 'ECB'])
const paddingOptions = reactive(['Pkcs7', 'Iso97971', 'AnsiX923', 'Iso10126', 'ZeroPadding', 'NoPadding'])

watch(() => form, handleCipher, {
  deep: true,
  immediate: true
})

function handleCipher () {
  const { method, secret, iv, mode, padding, content, drop } = form

  const secretHex = CryptoJS.enc.Utf8.parse(secret)
  const SECRET_IV = CryptoJS.enc.Utf8.parse(iv)
  const algorithmHandler = getAlgorithmHandler()

  if (method === 'decrypt') {
    // 解密
    const encryptedHexStr = CryptoJS.enc.Hex.parse(content)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypted = algorithmHandler.decrypt(str, secretHex, {
      iv: SECRET_IV,
      mode: getMode(mode),
      padding: getPadding(padding)
    })
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
    result.value = decryptedStr.toString()
  } else {
    // 加密
    const dataHex = CryptoJS.enc.Utf8.parse(content)
    const encrypted = algorithmHandler.encrypt(dataHex, secretHex, {
      iv: SECRET_IV,
      mode: getMode(mode),
      padding: getPadding(padding),
      drop
    })
    result.value = encrypted.ciphertext.toString()
  }
}

function getAlgorithmHandler () {
  let algorithmHandler = CryptoJS.AES
  switch (props.algorithm) {
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

  return algorithmHandler
}

function getMode (mode: string) {
  switch (mode) {
    case 'CFB':
      return CryptoJS.mode.CFB
    case 'CTR':
      return CryptoJS.mode.CTR
    case 'OFB':
      return CryptoJS.mode.OFB
    case 'ECB':
      return CryptoJS.mode.ECB
    default:
      return CryptoJS.mode.CBC
  }
}

function getPadding (padding: string) {
  switch (padding) {
    case 'Iso97971':
      return CryptoJS.pad.Iso97971
    case 'AnsiX923':
      return CryptoJS.pad.AnsiX923
    case 'Iso10126':
      return CryptoJS.pad.Iso10126
    case 'ZeroPadding':
      return CryptoJS.pad.ZeroPadding
    case 'NoPadding':
      return CryptoJS.pad.NoPadding
    default:
      return CryptoJS.pad.Pkcs7
  }
}
</script>
