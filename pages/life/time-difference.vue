<template>
  <ToolLayout>
    <el-form :model="form">
      <el-form-item label="类型">
        <el-radio-group>
          <el-radio-button>时间递推</el-radio-button>
          <el-radio-button>时间差计算</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="只计算工作日">
        <el-swtich />
      </el-form-item>
      <el-form-item>
        <el-date-picker />
      </el-form-item>
      <el-form-item>
        <el-date-picker />
      </el-form-item>
      <el-form-item />
    </el-form>
  </ToolLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Solar } from 'lunar-typescript'

const form = reactive({})

function getWorkingDaysDiff (startDate, endDate) {
  let workingDays = 0
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return workingDays
}
</script>
