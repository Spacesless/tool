<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <el-date-picker v-model="year" type="year" :clearable="false" />
        <div>
          <el-button text :icon="ArrowLeft" @click="selectYear('prev')" />
          <el-button text :icon="ArrowRight" @click="selectYear('next')" />
        </div>
        <span v-show="isNoThisYear" class="section-header__today" @click="selectYear('today')">今</span>
      </div>
      <el-timeline>
        <el-timeline-item v-for="item in holidays" :key="item.month">
          <div class="holiday-month">
            <p class="holiday-month__num">
              {{ item.month }}
            </p>
            <div>
              <p class="holiday-month__unit en">
                {{ item.monthEn }}
              </p>
              <p class="holiday-month__unit">
                月
              </p>
            </div>
          </div>
          <el-row :gutter="16">
            <el-col v-for="child in item.children" :key="child.day" :md="12">
              <div class="holiday-date">
                <span class="holiday-date__name">{{ child.name }}</span>
                <span class="holiday-date__day">[{{ child.day }} {{ child.cnDay }}]</span>
                <span class="holiday-date__distance">
                  {{ child.distance < 0 ? '已过' : '还有' }}<span class="bold">{{ Math.abs(child.distance) }}</span>天
                </span>
              </div>
            </el-col>
          </el-row>
        </el-timeline-item>
      </el-timeline>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { Solar, SolarUtil } from 'lunar-typescript'

definePageMeta({
  title: '节日大全',
  description: '每年的节日信息，当前日期和每个节日的间隔时长'
})

const year = ref(new Date())

const holidays = computed(() => {
  const solarYear = year.value.getFullYear()

  return getHolidays(solarYear)
})

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

const nowTime = dayjs().startOf('day')
function getHolidays (solarYear: number) {
  const yearDays = SolarUtil.getDaysOfYear(solarYear)

  const start = Solar.fromYmd(solarYear, 1, 1)
  const holidayTree: Record<string, {
    month: string;
    monthEn: string;
    children: {
      day: string;
      cnDay: string;
      name: string;
      distance: number;
    }[]
  }> = {}

  for (let i = 0; i < yearDays; i++) {
    const solarInstance = start.next(i)
    const lunarInstance = solarInstance.getLunar()

    const festivals = [
      ...solarInstance.getFestivals(),
      ...lunarInstance.getFestivals(),
      ...solarInstance.getOtherFestivals(),
      ...lunarInstance.getOtherFestivals()
    ]

    if (festivals.length > 0) {
      const day = solarInstance.toString()
      const dayjsInstance = dayjs(day)
      const month = dayjsInstance.format('M')
      const monthEn = dayjsInstance.format('MMM')

      festivals.forEach((item) => {
        const row = {
          day: dayjsInstance.format('MM-DD'),
          cnDay: `${lunarInstance.getMonthInChinese()}月${lunarInstance.getDayInChinese()}`,
          name: item,
          distance: dayjsInstance.diff(nowTime, 'd')
        }

        if (holidayTree[monthEn]) {
          holidayTree[monthEn].children.push(row)
        } else {
          holidayTree[monthEn] = {
            month,
            monthEn,
            children: [row]
          }
        }
      })
    }
  }

  return Object.values(holidayTree)
}
</script>

<style lang="scss" scoped>
.section {
  &-header {
    display: flex;
    gap: 16px;
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

.holiday {
  &-month {
    display: flex;
    align-items: center;
    font-family: var(--el-font-family);

    &__num {
      margin-right: 8px;
      color: var(--el-text-color-primary);
      font-size: 60px;
    }

    &__unit {
      color: var(--el-text-color-regular);
      font-size: 13px;

      &.en {
        color: var(--el-text-color-placeholder);
        font-size: 30px;
      }
    }
  }

  &-date {
    display: inline-flex;
    gap: 6px;
    align-items: baseline;
    padding-left: 60px;
    font-size: 16px;
    line-height: 1.7;

    @media (width < 768px) {
      padding-left: 0;
    }

    &__name {
      color: var(--el-text-color-primary);
    }

    &__day {
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }

    &__distance {
      color: var(--el-text-color-regular);

      .bold {
        margin: 0 4px;
        font-weight: bold;
      }
    }
  }
}
</style>
