<template>
  <div class="section">
    <div class="section-header">
      <el-input
        v-model="form.value"
        placeholder="请输入数据"
        @input="handleConvert"
      >
        <template #prepend>
          <el-select v-model="form.unit" class="section-group-select" placeholder="请选择单位" @change="handleConvert">
            <el-option v-for="item in options" :key="item.value" :label="`${item.label}(${item.value})`" :value="item.value" />
          </el-select>
        </template>
      </el-input>
    </div>

    <el-descriptions
      :column="2"
      border
    >
      <el-descriptions-item v-for="item in options" :key="item.value" :label="`${item.label}(${item.value})`">
        {{ form.result[item.value] || '' }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import convert from 'convert-units'
import { ElMessage } from 'element-plus'

const { options, defaultUnit, defaultValue } = defineProps({
  options: {
    type: Array<{ value: string; label: string }>,
    default: () => []
  },
  defaultUnit: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: Number,
    default: 1
  }
})

const form = reactive<{
  value: number;
  unit: string;
  result: Record<string, number>
}>({
  value: defaultValue || 1,
  unit: defaultUnit || options[0].value,
  result: {}
})

onBeforeMount(() => {
  handleConvert()
})

function handleConvert () {
  const { value, unit } = form

  if (isNaN(+value)) {
    return ElMessage.error('请输入数字')
  }

  const convertedValues: Record<string, number> = {} // 用于存储转换后的值

  options.forEach((item) => {
    convertedValues[item.value] = convert(value).from(unit as convert.Unit).to(item.value as convert.Unit)
  })

  form.result = convertedValues
}
</script>

<style lang="scss" scoped>
.section-group-select {
  width: 200px;
}
</style>
