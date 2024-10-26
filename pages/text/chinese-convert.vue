<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="输入">
          <el-input
            v-model="form.content"
            :rows="3"
            type="textarea"
            @input="handleConvert"
          />
        </el-form-item>
        <el-form-item label="目标">
          <el-radio-group v-model="form.type" @change="handleConvert">
            <el-radio label="cn">
              简体
            </el-radio>
            <el-radio label="hk">
              繁体
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输出">
          <el-input
            v-model="form.result"
            :rows="5"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import * as OpenCC from 'opencc-js'

definePageMeta({
  title: '简繁转换',
  description: '用于将汉字从简体转换为繁体或从繁体转换为简体的工具。'
})

const form = reactive({
  content: '',
  type: 'hk',
  result: ''
})

function handleConvert () {
  const { content, type } = form

  const converter = OpenCC.Converter({ from: type === 'hk' ? 'cn' : 'hk', to: type === 'cn' ? 'cn' : 'hk' })

  form.result = converter(content)
}
</script>
