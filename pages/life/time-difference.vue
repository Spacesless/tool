<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form">
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio-button label="diff">
              两日间隔计算
            </el-radio-button>
            <el-radio-button label="calc">
              日期加减计算
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="form.startDate" />
        </el-form-item>
        <template v-if="form.type === 'diff'">
          <el-form-item label="结束日期">
            <el-date-picker v-model="form.endDate" />
          </el-form-item>
          <el-form-item label="结果">
            {{ diffResult }}
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="间隔天数">
            <el-input-number v-model="form.diff" controls-position="right" />
          </el-form-item>
          <el-form-item label="结果">
            {{ calcResult }}
          </el-form-item>
        </template>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  title: '日期计算',
  description: '自然日间隔计算、日期加减计算'
})

const form = reactive({
  type: 'diff',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
  diff: 1
})

const diffResult = computed(() => {
  const { type, startDate, endDate } = form
  if (type === 'calc') {
    return ''
  }
  const diffDay = dayjs(endDate).diff(dayjs(startDate), 'd')
  return `相差天数 ${diffDay} 天`
})

const calcResult = computed(() => {
  const { type, startDate, diff } = form
  if (type === 'diff') {
    return ''
  }
  const endDate = dayjs(startDate).add(diff, 'days')
  const weekEnum = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${endDate.format('YYYY-MM-DD')} ${weekEnum[endDate.day()]}`
})
</script>
