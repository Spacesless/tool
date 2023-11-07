<template>
  <el-row class="section">
    <el-form :model="form" label-width="80px">
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.text"
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
            v-model="result"
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
import { pinyin } from 'pinyin-pro'

const form = reactive({
  text: '',
  style: 0,
  mode: '',
  heteronym: true,
  group: true,
  compact: true
})
const result = ref('')

function handleConvert () {
  const { text, style, mode, heteronym, group, compact } = form

  const opts = {
    style: style || 0, // 拼音输出形式
    mode: mode ? 'SURNAME' : 'NORMAL', // 拼音模式
    heteronym: !!heteronym, // 是否启用多音字模式
    group: !!group, // 按词组分组拼音
    compact: !!compact // 是否返回紧凑模式
  }

  return pinyin(text, opts)
}
</script>
