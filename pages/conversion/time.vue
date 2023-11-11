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
  const { content, sourceType } = form

  convertTime(content, sourceType)
}

function convertTime (time: number, sourceUnit: string) {
  const units = ['ns', 'mu', 'ms', 's', 'min', 'h', 'd', 'week', 'month', 'year']
  const conversionFactors = [1e-9, 1e-6, 1e-3, 1, 60, 3600, 86400, 604800, 2628000, 31536000]
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(time) || time < 0) {
    throw new Error('Invalid time')
  }

  const results: {[key: string]: string} = {}

  for (let i = 0; i < units.length; i++) {
    results[units[i]] = (time * conversionFactors[sourceIndex] / conversionFactors[i]).toFixed(2) + ' ' + units[i]
  }

  return results
}
</script>
