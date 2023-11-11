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
  sourceType: 'deg',
  result: '',
  targetType: 'arcmin'
})

const options = reactive([
  {
    value: 'rad',
    label: '弧度'
  },
  {
    value: 'deg',
    label: '度'
  },
  {
    value: 'grad',
    label: '梯度'
  },
  {
    value: 'arcmin',
    label: '角分'
  },
  {
    value: 'arcsec',
    label: '角秒'
  }
])

function handleConvert () {
  const { content, sourceType } = form

  convertAngle(content, sourceType)
}

function convertAngle (angle: number, sourceUnit: string): Record<string, string> {
  const units: string[] = ['rad', 'deg', 'grad', 'arcmin', 'arcsec']
  const factors: number[] = [1, 180 / Math.PI, 200 / Math.PI, 180 * 60 / Math.PI, 180 * 3600 / Math.PI]
  const sourceIndex: number = units.indexOf(sourceUnit)

  if (sourceIndex === -1) {
    throw new Error('Invalid source unit')
  }

  const convertedValues: Record<string, string> = {} // 用于存储转换后的值

  // 转换到弧度单位
  const angleRad: number = angle / factors[sourceIndex]

  // 计算其他单位对应的值
  for (let i = 0; i < units.length; i++) {
    convertedValues[units[i]] = (angleRad * factors[i]).toFixed(2)
  }

  return convertedValues
}
</script>
