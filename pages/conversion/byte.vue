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
    value: 'b',
    label: '比特'
  },
  {
    value: 'Kb',
    label: '千比特'
  },
  {
    value: 'Mb',
    label: '兆比特'
  },
  {
    value: 'Gb',
    label: '千兆比特'
  },
  {
    value: 'Tb',
    label: '太比特'
  },
  {
    value: 'B',
    label: '字节'
  },
  {
    value: 'KB',
    label: '千字节'
  },
  {
    value: 'MB',
    label: '兆字节'
  },
  {
    value: 'GB',
    label: '千兆字节'
  },
  {
    value: 'TB',
    label: '太字节'
  },
  {
    value: 'PB',
    label: '拍字节'
  },
  {
    value: 'EB',
    label: '艾字节'
  }
])

function handleConvert () {
  const { content, sourceType, targetType } = form

  form.result = convertStorage(content, sourceType, targetType)
}

function convertStorage (size: number, sourceUnit: string, targetUnit: string) {
  const units = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  const base = 1024
  const sourceIndex = units.indexOf(sourceUnit)
  const targetIndex = units.indexOf(targetUnit)

  if (sourceIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid source or target unit')
  }

  let convertedSize = size

  if (sourceIndex < 5) { // 原始单位为比特
    for (let i = 0; i < sourceIndex; i++) {
      convertedSize /= base
    }
    convertedSize *= 8 // 比特与字节的转换关系
  } else { // 原始单位为字节
    for (let i = 5; i < sourceIndex; i++) {
      convertedSize /= base
    }
  }

  if (targetIndex < 5) { // 目标单位为比特
    convertedSize /= 8 // 比特与字节的转换关系
    for (let i = 0; i < targetIndex; i++) {
      convertedSize *= base
    }
  } else { // 目标单位为字节
    for (let i = 5; i < targetIndex; i++) {
      convertedSize *= base
    }
  }

  return convertedSize.toString()
}
</script>
