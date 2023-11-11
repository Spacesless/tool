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
  const { content, sourceType } = form

  convertMass(content, sourceType)
}

function convertMass (weight: number, sourceUnit: string) {
  const units = ['t', 'kg', 'g', 'mg', 'q', 'lb', 'oz', 'ct', 'gr', 'cwt', 'jin', 'tael', 'liang']
  const conversionFactors = [1000000, 1000, 1, 0.001, 10000, 453.592, 28.3495, 0.2, 0.0648, 50000, 500, 50, 10]
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(weight) || weight < 0) {
    throw new Error('Invalid weight')
  }

  const results: {[key: string]: string} = {}

  for (let i = 0; i < units.length; i++) {
    results[units[i]] = (weight * conversionFactors[sourceIndex] / conversionFactors[i]).toFixed(2) + ' ' + units[i]
  }

  return results
}
</script>
