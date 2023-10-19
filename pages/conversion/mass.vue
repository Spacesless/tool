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
  sourceType: 'kg',
  result: '',
  targetType: 'lb'
})

const options = reactive([
  {
    value: 'mcg',
    label: '微克'
  },
  {
    value: 'mg',
    label: '微克'
  },
  {
    value: 'g',
    label: '克'
  },
  {
    value: 'kg',
    label: '千克'
  },
  {
    value: 'mt',
    label: '公吨'
  },
  {
    value: 'oz',
    label: '盎司'
  },
  {
    value: 'lb',
    label: '英镑'
  },
  {
    value: 't',
    label: '短吨'
  }
])

function handleConvert () {
  const { content, sourceType, targetType } = form

  form.result = convertMass(content, sourceType, targetType)
}

function convertMass (mass: number, sourceUnit: string, targetUnit: string) {
  const units = ['mcg', 'mg', 'g', 'kg', 'mt', 'oz', 'lb', 't']
  const factors = [1, 1000, 1000, 1000, 1000, 35.27396, 2.204623, 0.001]
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  let convertedMass = mass

  // 转换到克单位
  for (let i = 0; i < sourceIndex; i++) {
    convertedMass /= factors[i]
  }

  // 从克单位转换到目标单位
  for (let i = 0; i < targetIndex; i++) {
    convertedMass *= factors[i]
  }

  return convertedMass.toFixed(2) + ' ' + units[targetIndex]
}
</script>
