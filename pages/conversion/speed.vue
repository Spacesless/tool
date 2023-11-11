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

  convertSpeed(content, sourceType)
}

function convertSpeed (speed: number, sourceUnit: string) {
  const units = ['m/s', 'km/h', 'mi/h', 'mach', 'c', 'knot', 'in/s', 'ft/s', 'kn']
  const conversionFactors = [1, 3.6, 2.23694, 343.2, 299792458, 1.94384, 0.0254, 0.3048, 0.514444]
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(speed) || speed < 0) {
    throw new Error('Invalid speed')
  }

  const results: {[key: string]: string} = {}

  for (let i = 0; i < units.length; i++) {
    results[units[i]] = (speed * conversionFactors[sourceIndex] / conversionFactors[i]).toFixed(2) + ' ' + units[i]
  }

  return results
}
</script>
