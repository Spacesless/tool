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
  }
])

function handleConvert () {
  const { content, sourceType } = form

  convertStorage(content, sourceType)
}

function convertStorage (size: number, sourceUnit: string) {
  const units = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'B', 'KB', 'MB', 'GB', 'TB']
  const base = 1024
  const sourceIndex = units.indexOf(sourceUnit)

  if (sourceIndex < 0) {
    throw new Error('Invalid source unit')
  }

  if (isNaN(size) || size < 0) {
    throw new Error('Invalid size')
  }

  const results: {[key: string]: string} = {} // 用于存储所有单位的转换结果

  for (let i = 0; i < units.length; i++) {
    let tempSize = size

    if (i >= 5) { // 如果是字节单位，先转换为比特
      tempSize *= 8
      i -= 5
    }

    const diff = i - sourceIndex

    if (diff > 0) {
      for (let j = 0; j < diff; j++) {
        tempSize *= base
      }
    } else if (diff < 0) {
      for (let j = 0; j < -diff; j++) {
        tempSize /= base
      }
    }

    results[units[i]] = tempSize.toString()
  }

  return results
}
</script>
