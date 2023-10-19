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
  sourceType: 'C',
  result: '',
  targetType: 'F'
})

const options = reactive([
  {
    value: 'C',
    label: '摄氏度'
  },
  {
    value: 'K',
    label: '开氏度'
  },
  {
    value: 'F',
    label: '华氏度'
  },
  {
    value: 'R',
    label: '华氏度'
  }
])

function handleConvert () {
  const { content, sourceType, targetType } = form

  form.result = convertTemperature(content, sourceType, targetType)
}

function convertTemperature (temperature: number, sourceUnit: string, targetUnit: string) {
  const units = ['C', 'K', 'F', 'R']
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  // 转换成摄氏度
  let celsiusTemperature = temperature

  switch (sourceUnit) {
    case 'K':
      celsiusTemperature = temperature - 273.15
      break
    case 'F':
      celsiusTemperature = (temperature - 32) * 5 / 9
      break
    case 'R':
      celsiusTemperature = (temperature - 491.67) * 5 / 9
      break
  }

  // 根据目标单位转换
  let convertedTemperature = 0

  switch (targetUnit) {
    case 'C':
      convertedTemperature = celsiusTemperature
      break
    case 'K':
      convertedTemperature = celsiusTemperature + 273.15
      break
    case 'F':
      convertedTemperature = celsiusTemperature * 9 / 5 + 32
      break
    case 'R':
      convertedTemperature = (celsiusTemperature + 273.15) * 9 / 5
      break
  }

  return convertedTemperature.toFixed(2) + ' ' + targetUnit
}
</script>
