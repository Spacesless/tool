<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-width="80px">
        <el-form-item label="输入内容">
          <el-input
            v-model="form.content"
            :rows="6"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="哈希算法">
          <el-radio-group v-model="form.algorithm">
            <el-radio-button :label="1">
              SHA-1
            </el-radio-button>
            <el-radio-button :label="256">
              SHA-256
            </el-radio-button>
            <el-radio-button :label="384">
              SHA-384
            </el-radio-button>
            <el-radio-button :label="512">
              SHA-512
            </el-radio-button>
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
            v-model="result"
            :rows="6"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-form>
    </section>

    <template #content>
      <p>Secure Hash Algorithm，安全哈希算法，</p>
      <p>SHA 哈希函数由美国国家安全局 （NSA） 设计。SHA-1 是现有 SHA 哈希函数中最成熟的，它用于各种安全应用程序和协议。不过，随着新攻击的发现或改进，SHA-1 的抗碰撞性一直在减弱。SHA1 生成的结果为：160 bit，20 byte</p>
      <p>SHA-256 是 SHA-2 集中的四个变体之一。它不像 SHA-1 那样被广泛使用，尽管它似乎提供了更好的安全性。SHA256 生成的结果为：256 bit，32 byte</p>
      <p>SHA384 生成的结果为：384 bit，48 byte</p>
      <p>SHA-512 与 SHA-256 基本相同，但使用 64 位字而不是 32 位字。SHA512 生成的结果为：512 bit，64 byte</p>
    </template>
  </ToolLayout>
</template>

<script lang="ts" setup>
import SHA1 from 'crypto-js/sha1'
import SHA3 from 'crypto-js/sha3'

definePageMeta({
  title: 'SHA哈希',
  description: 'SHA安全哈希算法主要适用于数字签名标准里面定义的数字签名。'
})

const form = reactive({
  algorithm: 1,
  textCase: 'lower',
  content: '666'
})
const result = ref('')

watch(() => form, handleHash, {
  deep: true,
  immediate: true
})

function handleHash () {
  const { algorithm, textCase, content } = form

  let hash = ''
  switch (algorithm) {
    case 1:
      hash = SHA1(content).toString()
      break
    case 256:
      hash = SHA3(content, { outputLength: 256 }).toString()
      break
    case 384:
      hash = SHA3(content, { outputLength: 384 }).toString()
      break
    case 512:
      hash = SHA3(content).toString()
      break
  }

  if (textCase === 'upper') {
    hash = hash.toUpperCase()
  }

  result.value = hash
}
</script>
