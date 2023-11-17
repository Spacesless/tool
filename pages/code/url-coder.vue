<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <el-form :model="form" label-position="top">
      <el-form-item label="输入">
        <el-input
          v-model="form.content"
          :rows="6"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="处理算法">
        <el-radio-group v-model="form.algorithm">
          <el-radio-button v-for="item in algorithmOptions" :key="item" :label="item">
            {{ item }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理方式">
        <el-radio-group v-model="form.method">
          <el-radio label="encode">
            编码
          </el-radio>
          <el-radio label="decode">
            解码
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输出">
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

const { currentTool } = useToolData()

const algorithmOptions = reactive([
  'URI', 'URIComponent'
])
const form = reactive({
  method: 'encode',
  algorithm: 'URI',
  content: ''
})
const result = ref('')

watch(() => form, handleEncode, {
  deep: true,
  immediate: true
})

function handleEncode () {
  const { algorithm, method, content } = form
  const isEncode = method === 'encode'
  const isURI = algorithm === 'URI'

  if (isEncode) {
    // 编码
    result.value = isURI ? encodeURI(content) : encodeURIComponent(content)
  } else {
    // 解码
    result.value = isURI ? decodeURI(content) : decodeURIComponent(content)
  }
}
</script>
