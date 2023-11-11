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
  const { content, sourceType } = form

  convertTemperature(content, sourceType)
}

function convertTemperature (temp: number, sourceUnit: string) {
  const units = ['C', 'F', 'K', 'R', 'Re']
  const conversions = {
    C: (temp: number) => temp,
    F: (temp: number) => (temp - 32) * 5 / 9,
    K: (temp: number) => temp - 273.15,
    R: (temp: number) => (temp - 491.67) * 5 / 9,
    Re: (temp: number) => temp * 5 / 4
  }
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(temp)) {
    throw new TypeError('Invalid temperature')
  }

  const results: {[key: string]: string} = {}

  for (let i = 0; i < units.length; i++) {
    results[units[i]] = conversions[units[i]](temp).toFixed(2) + ' ' + units[i]
  }

  return results
}
</script>
