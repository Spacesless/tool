<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-row :gutter="16">
          <el-col :sm="24" :md="12">
            <el-form-item label="源进制">
              <el-select v-model="form.sourceBase" filterable>
                <template v-for="item in 36">
                  <el-option v-if="item > 1" :key="item" :value="item">
                    {{ item }}
                  </el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="输入">
              <el-input-number v-model="form.input" style="width: 90%;" controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="目标进制">
              <el-select v-model="form.targetBase" filterable>
                <template v-for="item in 36">
                  <el-option v-if="item > 1" :key="item" :value="item">
                    {{ item }}
                  </el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="输出">
              <el-input v-model="ouput" style="width: 90%;" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import BigNumbers from 'bignumber.js'

const form = reactive({
  input: 256,
  sourceBase: 10,
  targetBase: 2
})
const ouput = ref('')

watch(() => form, () => {
  handleConvert()
}, {
  immediate: true,
  deep: true
})

// 将一个数从源进制转换为目标进制
function handleConvert () {
  const { input, sourceBase, targetBase } = form
  const source = new BigNumbers(input, sourceBase)
  ouput.value = source.toString(targetBase)
}
</script>
