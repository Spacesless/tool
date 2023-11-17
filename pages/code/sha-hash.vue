<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <el-form :model="form" label-width="80px">
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

  <section class="section content">
    <p>版本：</p>
    <p>发布时间：</p>
    <h2>工具简介</h2>
    <p>Secure Hash Algorithm，安全哈希算法</p>
    <p>SHA1 生成的结果为：160 bit，20 byte</p>
    <p>SHA256 生成的结果为：256 bit，32 byte</p>
    <p>SHA384 生成的结果为：384 bit，48 byte</p>
    <p>SHA512 生成的结果为：512 bit，64 byte</p>
  </section>
</template>

<script lang="ts" setup>
import SHA1 from 'crypto-js/sha1'
import SHA3 from 'crypto-js/sha3'

const { currentTool } = useToolData()

const form = reactive({
  algorithm: 1,
  textCase: 'lower',
  content: ''
})
const result = ref('')

const handleHash = () => {
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
