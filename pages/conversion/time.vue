<template>
  <el-row class="section">
    <el-form :model="form">
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input-number
            v-model="form.content"
            @change="handleConvert"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="form.sourceType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="`${item.label}（${item.value}）`"
              :value="item.value"
              @change="handleConvert"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.result"
            :readonly="true"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="form.targetType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="`${item.label}（${item.value}）`"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
const form = reactive({
  content: 1,
  sourceType: 'KB',
  result: '',
  targetType: 'MB'
})

const options = reactive([
  {
    value: 'ns',
    label: '纳秒'
  },
  {
    value: 'mu',
    label: '微秒'
  },
  {
    value: 'ms',
    label: '微秒'
  },
  {
    value: 's',
    label: '秒'
  },
  {
    value: 'min',
    label: '分钟'
  },
  {
    value: 'h',
    label: '小时'
  },
  {
    value: 'd',
    label: '天'
  },
  {
    value: 'week',
    label: '周'
  },
  {
    value: 'month',
    label: '月'
  },
  {
    value: 'year',
    label: '年'
  }
])

function handleConvert () {
  const { content, sourceType, targetType } = form

  form.result = convertTime(content, sourceType, targetType)
}

function convertTime (time: number, sourceUnit: string, targetUnit: string) {
  const units = ['ns', 'mu', 'ms', 's', 'min', 'h', 'd', 'week', 'month', 'year']
  const factors = [1, 1000, 1000, 1000, 60, 60, 24, 7, 30, 12]
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  let convertedTime = time

  // 转换到秒单位
  for (let i = 0; i < sourceIndex; i++) {
    convertedTime /= factors[i]
  }

  // 从秒单位转换到目标单位
  for (let i = 0; i < targetIndex; i++) {
    convertedTime *= factors[i]
  }

  return convertedTime.toFixed(2) + ' ' + units[targetIndex]
}
</script>
