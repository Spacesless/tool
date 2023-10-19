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
  const { content, sourceType, targetType } = form

  form.result = convertVolume(content, sourceType, targetType)
}

function convertVolume (volume: number, sourceUnit: string, targetUnit: string) {
  const units = ['mm3', 'cm3', 'ml', 'cl', 'dl', 'l', 'kl', 'm3', 'km3', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ft3', 'yd3']
  const factors = [1, 1000, 1000, 100, 100, 1, 0.001, 0.000001, 1e-18, 0.1, 5, 15, 150, 200, 800, 4.92892, 14.7868, 16387.064, 283.4952, 236.5882, 473.1765, 946.3529, 3785.412, 0.02831685, 0.7645549]
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  let convertedVolume = volume

  // 转换到升单位
  for (let i = 0; i < sourceIndex; i++) {
    convertedVolume /= factors[i]
  }

  // 从升单位转换到目标单位
  for (let i = 0; i < targetIndex; i++) {
    convertedVolume *= factors[i]
  }

  return convertedVolume.toFixed(2) + ' ' + units[targetIndex]
}
</script>
