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
  sourceType: 'ft',
  result: '',
  targetType: 'm'
})

const options = reactive([
  {
    value: 'mm',
    label: '毫米'
  },
  {
    value: 'cm',
    label: '厘米'
  },
  {
    value: 'm',
    label: '米'
  },
  {
    value: 'km',
    label: '千米'
  },
  {
    value: 'in',
    label: '厘米'
  },
  {
    value: 'yd',
    label: '厘米'
  },
  {
    value: 'ft',
    label: '英尺'
  },
  {
    value: 'mi',
    label: '英里'
  }
])

function handleConvert () {
  const { content, sourceType, targetType } = form

  form.result = convertLength(content, sourceType, targetType)
}

function convertLength (length: number, sourceUnit: string, targetUnit: string) {
  const units = ['mm', 'cm', 'm', 'km', 'in', 'yd', 'ft', 'mi']
  const factors = [1, 10, 1000, 1000000, 25.4, 914.4, 304.8, 1609.344]
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  let convertedLength = length

  if (sourceIndex < 4) { // 源单位为米以内的单位
    convertedLength /= factors[sourceIndex]
  } else { // 源单位为英里
    convertedLength *= 1609.344 // 英里和米之间的转换关系
  }

  if (targetIndex < 4) { // 目标单位为米以内的单位
    convertedLength *= factors[targetIndex]
  } else { // 目标单位为英里
    convertedLength /= 1609.344 // 英里和米之间的转换关系
  }

  return convertedLength.toFixed(2) + ' ' + units[targetIndex]
}
</script>
