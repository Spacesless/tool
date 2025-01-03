<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-row :gutter="16">
          <el-col :sm="24" :md="12">
            <el-form-item label="输入">
              <el-input v-model="form.input" type="textarea" placeholder="" :rows="8" @input="handleFormat" />
            </el-form-item>
            <el-form-item label="格式">
              <el-select v-model="form.textCase" @change="handleFormat">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item>
              <template #label>
                <div class="flex">
                  <span>输出</span>
                  <CopyButton :text="form.output" />
                </div>
              </template>
              <el-input v-model="form.output" class="textarea" type="textarea" readonly :rows="12" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>

    <template #content>
      <p>
        横线与驼峰互转依赖
        <a target="_blank" href="https://www.npmjs.com/package/xijs">https://www.npmjs.com/package/xijs</a>
        工具库的camelize、hyphenate函数进行大小写转换。
      </p>
      <p>大小写互转，使用<code>Javascript</code>的<code>toLocaleUpperCase</code>、<code>toLocaleLowerCase</code>方法就能实现了。</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import camelize from 'xijs/src/camelize'
import hyphenate from 'xijs/src/hyphenate'

definePageMeta({
  title: '大小写转换',
  description: '支持下划线、驼峰、大小写转换',
  updateTime: '2023-12-03'
})

const options = reactive([
  { value: 'camelize', label: '中划线转驼峰' },
  { value: 'hyphenate', label: '驼峰转中划线' },
  { value: 'underlineCamelize', label: '下划线转驼峰' },
  { value: 'underlineHyphenate', label: '驼峰转下划线' },
  { value: 'uppercase', label: '大写' },
  { value: 'lowercase', label: '小写' }
])
const form = reactive({
  input: 'free-toolbox\na-free-tool',
  textCase: 'camelize',
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input, textCase } = form
  let output = ''
  switch (textCase) {
    case 'camelize':
    case 'hyphenate': {
      const inputArr = input.split('\n')
      const outputArr = inputArr.map((item) => {
        return textCase === 'camelize' ? camelize(item) : hyphenate(item)
      })
      output = outputArr.join('\n')
      break
    }
    case 'underlineCamelize':
    case 'underlineHyphenate': {
      const inputArr = input.split('\n')
      const outputArr = inputArr.map((item) => {
        return textCase === 'underlineCamelize' ? camelize(item.replaceAll('_', '-')) : hyphenate(item).replaceAll('-', '_')
      })
      output = outputArr.join('\n')
      break
    }
    case 'uppercase': {
      output = input.toLocaleUpperCase()
      break
    }
    default:
      output = input.toLocaleLowerCase()
  }
  form.output = output
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  width: 100%;
  height: 32px;
  padding: 0;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.textarea :deep(.el-textarea__inner){
  height: 268px;
}
</style>
