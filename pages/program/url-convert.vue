<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-row :gutter="16">
          <el-col :sm="24" :md="12">
            <el-form-item label="转换类型">
              <el-radio-group v-model="form.type" @change="handleConvert">
                <el-radio label="url2obj">
                  URL转成对象
                </el-radio>
                <el-radio label="obj2url">
                  对象转成URL
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="输入">
              <el-input v-model="form.input" type="textarea" :rows="6" @change="handleConvert" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="输出">
              <el-input v-model="form.output" type="textarea" :rows="10" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-named-as-default
import obj2url from 'xijs/src/obj2url'
import url2obj from 'xijs/src/url2obj'

definePageMeta({
  title: '解析URL字符串',
  description: '将 url 字符串转换为对象或对象转换成编码后的 url 字符串',
  updateTime: '2023-12-02'
})

const form = reactive({
  input: '?a=1&b=2&c=test',
  type: 'url2obj',
  output: ''
})

onBeforeMount(() => {
  handleConvert()
})

function handleConvert () {
  const { input, type } = form

  if (type === 'url2obj') {
    try {
      form.output = JSON.stringify(url2obj(input), null, 2)
    } catch {
      form.output = '{}'
    }
  } else {
    try {
      form.output = obj2url(JSON.parse(input))
    } catch {
      form.output = ''
    }
  }
}
</script>
