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
  const { content, sourceType } = form

  convertLength(content, sourceType)
}

function convertLength (length: number, sourceUnit: string): Record<string, string> {
  const units: string[] = ['km', 'm', 'dm', 'cm', 'mm', 'um', 'nm', 'nmi', 'mi', 'yd', 'ft', 'in', 'li', 'zhang', 'chi', 'cun', 'fen', 'li', 'hao']
  const factors: number[] = [1e3, 1, 1e-1, 1e-2, 1e-3, 1e-6, 1e-9, 1852, 1609.344, 0.9144, 0.3048, 0.0254, 500, 3.33, 0.333, 0.03, 0.003, 0.0003, 0.00003]
  const sourceIndex: number = units.indexOf(sourceUnit)

  if (sourceIndex === -1) {
    throw new Error('Invalid source unit')
  }

  const convertedValues: Record<string, string> = {} // 用于存储转换后的值

  // 转换到米单位
  const lengthMeter: number = length * factors[sourceIndex]

  // 计算其他单位对应的值
  for (let i = 0; i < units.length; i++) {
    convertedValues[units[i]] = (lengthMeter / factors[i]).toFixed(2)
  }

  return convertedValues
}
</script>
