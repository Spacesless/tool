<template>
  <section class="md5 section">
    <el-form :model="form" label-width="80px">
      <el-form-item label="哈希算法">
        <el-radio-group v-model="form.algorithm">
          <el-radio :label="1">
            SHA-1
          </el-radio>
          <el-radio :label="256">
            SHA-256
          </el-radio>
          <el-radio :label="512">
            SHA-512
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输出格式">
        <el-radio-group v-model="form.textCase">
          <el-radio label="lower">
            小写
          </el-radio>
          <el-radio label="upper">
            大写
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输入内容">
        <el-input
          v-model="form.content"
          :rows="6"
          type="textarea"
          @keyup.enter="handleHash"
        />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleHash">
          处理
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
import sha1 from 'crypto-js/sha1'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'

const form = reactive({
  algorithm: 256,
  textCase: 'lower',
  content: ''
})
const result = ref('')

const handleHash = () => {
  const { algorithm, textCase, content } = form

  let hash = ''
  switch (algorithm) {
    case 1:
      hash = sha1(content).toString()
      break
    case 256:
      hash = sha256(content).toString()
      break
    case 512:
      hash = sha512(content).toString()
      break
  }

  if (textCase === 'upper') {
    hash = hash.toUpperCase()
  }

  result.value = hash
}
</script>
