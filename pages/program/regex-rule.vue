<template>
  <ToolLayout>
    <section class="section">
      <p class="section-header">
        适用于 web
      </p>
      <el-form :model="formData">
        <el-form-item>
          <el-input
            :model-value="regexp"
            placeholder="正则表达式"
            class="input-with-select"
            readonly
            size="large"
          >
            <template #prepend>
              <el-select
                v-model="formData.rule"
                size="large"
                filterable
                placeholder="请选择"
                style="width: 160px"
                @change="onRegexpChange"
              >
                <el-option v-for="(rule, index) in ruleOptions" :key="rule.title" :label="rule.title" :value="index" />
              </el-select>
            </template>

            <template #append>
              <CopyButton :text="regexp" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="keyword" :rules="formRule">
          <el-input
            v-model="formData.keyword"
            size="large"
            clearable
            :placeholder="placeholder"
          />
        </el-form-item>
      </el-form>
    </section>

    <template #content>
      <p>80+常用正则表达式</p>
      <p>基于<a href="https://github.com/any86/any-rule" target="_blank" rel="noopener noreferrer">https://github.com/any86/any-rule</a>实现</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import ruleOptions from './components/-rules'

definePageMeta({
  title: '正则大全',
  description: '常用正则表达式大全',
  updateTime: '2024-12-28'
})

const formData = reactive({
  rule: 0,
  keyword: ''
})

const findRule = computed(() => {
  return ruleOptions[formData.rule]
})
const placeholder = computed(() => {
  return findRule.value ? `例如：${findRule.value.examples.join('、')}` : '请输入关键词'
})
const regexp = computed(() => {
  return findRule.value ? findRule.value.rule.toString() : ''
})
const formRule = computed(() => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validator: (rule: any, value: any, callback: any) => {
      if (value && findRule.value?.rule && !findRule.value?.rule.test(value)) {
        callback(new Error('请输入正确的数据'))
      }
      callback()
    },
    trigger: ['blur', 'change']
  }
})

function onRegexpChange () {
  formData.keyword = ''
}
</script>
