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
    value: 'mm3',
    label: '立方毫米'
  },
  {
    value: 'cm3',
    label: '立方厘米'
  },
  {
    value: 'ml',
    label: '毫升'
  },
  {
    value: 'cl',
    label: '厘升'
  },
  {
    value: 'dl',
    label: '分升'
  },
  {
    value: 'l',
    label: '公升'
  },
  {
    value: 'kl',
    label: '千升'
  },
  {
    value: 'm3',
    label: '千升'
  },
  {
    value: 'km3',
    label: '立方千米'
  },
  {
    value: 'krm',
    label: '勺子'
  },
  {
    value: 'tsk',
    label: '贸易'
  },
  {
    value: 'msk',
    label: '勺子'
  },
  {
    value: 'kkp',
    label: '咖啡杯'
  },
  {
    value: 'glas',
    label: '格拉斯'
  },
  {
    value: 'kanna',
    label: 'Kanna'
  },
  {
    value: 'tsp',
    label: '茶匙'
  },
  {
    value: 'Tbs',
    label: '茶匙'
  },
  {
    value: 'in3',
    label: '立方英寸'
  },
  {
    value: 'fl-oz',
    label: '液量盎司'
  },
  {
    value: 'cup',
    label: '杯'
  },
  {
    value: 'pnt',
    label: '品脱'
  },
  {
    value: 'qt',
    label: '立方码'
  },
  {
    value: 'gal',
    label: '加仑'
  },
  {
    value: 'ft3',
    label: '立方英尺'
  },
  {
    value: 'yd3',
    label: '立方码'
  }
])

function handleConvert () {
  const { content, sourceType } = form

  convertVolume(content, sourceType)
}

function convertVolume (volume: number, sourceUnit: string) {
  const units = ['m3', 'dm3', 'cm3', 'mm3', 'st', 'l', 'dl', 'cl', 'ml', 'in3', 'yd3', 'gallon']
  const conversionFactors = [1, 0.001, 0.000001, 1e-9, 0.1, 0.001, 0.0001, 0.00001, 0.000001, 0.0000163871, 0.00454609]
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(volume) || volume < 0) {
    throw new Error('Invalid volume')
  }

  const results: {[key: string]: string} = {}

  for (let i = 0; i < units.length; i++) {
    results[units[i]] = (volume * conversionFactors[sourceIndex] / conversionFactors[i]).toFixed(2) + ' ' + units[i]
  }

  return results
}
</script>
