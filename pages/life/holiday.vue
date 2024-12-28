<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <el-date-picker v-model="year" type="year" :clearable="false" :disabled-date="getDisabledDate" />
        <div>
          <el-button text :icon="ArrowLeft" :disabled="year.getFullYear() === START" @click="selectYear('prev')" />
          <el-button text :icon="ArrowRight" :disabled="year.getFullYear() === END" @click="selectYear('next')" />
        </div>
        <span v-show="isNoThisYear" class="section-header__today" @click="selectYear('today')">今</span>
      </div>
      <el-table :data="holidays" border>
        <el-table-column prop="name" label="假期名称" width="120" />
        <el-table-column prop="target" label="假期范围">
          <template #default="{ row }">
            {{ row.start }} ~ {{ row.end }}
          </template>
        </el-table-column>
        <el-table-column prop="length" label="假期长度" width="120">
          <template #default="{ row }">
            {{ getLength(row.start, row.end) }}天
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="假期余额" width="120">
          <template #default="{ row }">
            {{ getBalance(row.start, row.end) }}天
          </template>
        </el-table-column>
        <el-table-column prop="distance" label="距离" width="120">
          <template #default="{ row }">
            {{ row.distance < 0 ? '已过' : '还有' }}<span>{{ Math.abs(row.distance) }}</span>天
          </template>
        </el-table-column>
        <el-table-column prop="work" label="调休日期" />
      </el-table>
    </section>

    <template #content>
      <p>法定假日指国家规定的放假和调休安排，来源于国务院办公厅发布的国办发明电文件。可前往<a href="http://www.gov.cn/zhengce/xxgk/index.htm" target="_blank" rel="noopener noreferrer">http://www.gov.cn/zhengce/xxgk/index.htm</a>搜索节假日查看。一般是每年11月底12月初发布来年的节假日安排。</p>
      <p>目前支持从2001年12月29日到2025年12月31日的法定假日安排。</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { HolidayUtil } from 'lunar-typescript'

definePageMeta({
  title: '法定节假',
  description: '法定假日指国家规定的放假和调休安排；\n来源于国务院办公厅发布的国办发明电文件。'
})

const year = ref(new Date())

const holidays = computed(() => {
  const solarYear = year.value.getFullYear()

  return getHolidays(solarYear)
})

const START = 2002
const END = 2025
function getDisabledDate (date: Date) {
  const fullYear = date.getFullYear()
  return fullYear < START || fullYear > END
}

const isNoThisYear = computed(() => {
  return year.value.getFullYear() !== new Date().getFullYear()
})
function selectYear (type: 'prev' | 'next' | 'today') {
  const date = new Date(year.value)

  if (type === 'prev') {
    date.setFullYear(date.getFullYear() - 1)
  } else if (type === 'next') {
    date.setFullYear(date.getFullYear() + 1)
  } else {
    date.setFullYear(new Date().getFullYear())
  }

  year.value = date
}

function getHolidays (solarYear: number) {
  const holidays = HolidayUtil.getHolidays(solarYear)
  const result: Record<string, any> = {}

  holidays.forEach((holiday) => {
    const name = holiday.getName()
    const target = holiday.getTarget()
    const isWork = holiday.isWork()
    const day = holiday.getDay()

    result[name] = result[name] || {}

    if (isWork) {
      result[name].work = [...(result[name]?.work || []), day]
    }

    const distance = dayjs(target).diff(dayjs().startOf('day'), 'day')

    if (!isWork && dayjs(target).year() === solarYear) {
      result[name] = {
        name,
        start: result[name]?.start || day,
        end: day,
        distance
      }
    }
  })

  return Object.values(result)
}

function getLength (start: string, end: string) {
  const startDay = dayjs(start)
  const endDay = dayjs(end)

  return endDay.diff(startDay, 'day') + 1
}

function getBalance (start: string, end: string) {
  const startDay = dayjs(start)
  const endDay = dayjs(end)
  const today = dayjs()

  if (today.isBefore(startDay)) {
    return getLength(start, end)
  }

  if (today.isAfter(endDay)) {
    return 0
  }

  return endDay.diff(today, 'day') + 1
}
</script>

<style lang="scss" scoped>
.section {
  &-header {
    display: flex;
    gap: 6px;
    align-items: center;

    &__today {
      width: 24px;
      height: 24px;
      color: #ffffff;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      background: var(--el-color-primary);
      border-radius: var(--el-border-radius-base);
      cursor: pointer;
    }
  }
}
</style>
