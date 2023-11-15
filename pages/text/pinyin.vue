<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <el-form :model="form" label-position="top">
      <el-form-item label="输入">
        <el-input
          v-model="form.text"
          :rows="3"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="输出的结果信息">
        <el-select v-model="form.pattern">
          <el-option v-for="item in patternOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="音调输出形式">
        <el-radio-group v-model="form.toneType">
          <el-radio label="symbol">
            在拼音字母上
          </el-radio>
          <el-radio label="num">
            在拼音后
          </el-radio>
          <el-radio label="none">
            不加音调
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="匹配库模式">
        <el-radio-group v-model="form.mode">
          <el-radio label="normal">
            常规模式
          </el-radio>
          <el-radio label="surname">
            姓氏模式
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输出">
        <el-input
          v-model="result"
          :rows="3"
          type="textarea"
          :readonly="true"
        />
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import { useToolData } from '@/hooks/tool'

interface BasicOptions {
  type: 'string' | 'array' | 'all';
  toneType?: 'symbol' | 'num' | 'none';
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first' | 'finalHead' | 'finalBody' | 'finalTail';
  multiple?: boolean;
  mode?: 'normal' | 'surname';
  removeNonZh?: boolean;
  nonZh?: 'spaced' | 'consecutive' | 'removed';
  v?: boolean;
}

const { currentTool } = useToolData()

const patternOptions = reactive([
  { value: 'pinyin', label: '拼音全拼' },
  { value: 'initial', label: '声母' },
  { value: 'final', label: '韵母' },
  { value: 'finalHead', label: '韵头（介音）' },
  { value: 'finalBody', label: '韵腹' },
  { value: 'finalTail', label: '韵尾' },
  { value: 'num', label: '音调对应数字' },
  { value: 'first', label: '拼音首字母' }
])
const form = reactive<{
  text: string;
  pattern: BasicOptions['pattern'];
  toneType: BasicOptions['toneType'];
  multiple: boolean;
  mode: BasicOptions['mode'];
}>({
  text: '着急',
  pattern: 'pinyin',
  toneType: 'symbol',
  multiple: false,
  mode: 'normal'
})
const result = ref('')

watch(() => form, handleConvert, {
  deep: true,
  immediate: true
})

function handleConvert () {
  const { text, pattern, toneType, multiple, mode } = form

  const opts = {
    pattern,
    toneType,
    mode,
    multiple: text.length > 1 ? false : multiple
  }

  result.value = pinyin(text, opts)
}
</script>
