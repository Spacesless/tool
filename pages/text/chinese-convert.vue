<template>
  <el-row class="section">
    <el-form :model="form" label-width="80px">
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.content"
            :rows="3"
            type="textarea"
            @change="handleConvert"
          />
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="form.type">
            <el-radio label="cn">
              简体
            </el-radio>
            <el-radio label="hk">
              繁体
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.result"
            :rows="5"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
import * as OpenCC from 'opencc-js'

const form = reactive({
  content: '',
  type: 'cn',
  result: ''
})

function handleConvert () {
  const { content, type, result } = from

  const converter = OpenCC.Converter({ from: type, to: type === 'cn' ? 'hk' : 'cn' })

  form.result = converter(content)
}
</script>
