<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :sm="24" :md="16">
          <el-calendar ref="calendar" v-model="dateTime" class="calendar">
            <template #header>
              <div class="calendar-header">
                <el-date-picker v-model="dateTime" size="default" type="month" />
                <el-icon @click="selectDate('prev-month')">
                  <ArrowLeft />
                </el-icon>
                <el-icon @click="selectDate('next-month')">
                  <ArrowRight />
                </el-icon>
                <span v-show="isToday" class="calendar-header__today" @click="selectDate('today')">今</span>
              </div>
            </template>
            <template #date-cell="{ data, lunar = getDayOverview(data.date) }">
              <div
                class="calendar-item"
                :class="{
                  'calendar-item--holiday': lunar.isHoliday,
                  'calendar-item--work': lunar.isWork,
                  'calendar-item--weekend': lunar.isWeekend && !lunar.isWork,
                  'calendar-item--selected': data.isSelected
                }"
              >
                <p class="calendar-item__day">
                  {{ lunar.solarDay }}
                </p>
                <p class="calendar-item__info" :class="{'calendar-item__info--holiday': lunar.festivals || lunar.solarTerms}">
                  {{ lunar.festivals || lunar.solarTerms || lunar.lunarDay }}
                </p>
                <span v-if="lunar.isHoliday && !lunar.isWork" class="calendar-item__rest">休</span>
                <span v-if="lunar.isWork" class="calendar-item__work">班</span>
              </div>
            </template>
          </el-calendar>
        </el-col>

        <el-col :sm="24" :md="8">
          <div class="solar">
            <p class="solar-day">
              {{ dayData.day }}
            </p>
            <p>{{ dayData.date }} {{ dayData.cnWeek }}</p>
            <p>{{ dayData.lunar.date }}</p>
            <p>
              {{ dayData.lunar.cyclicalYear }}({{ dayData.lunar.zodiac }})年
              {{ dayData.lunar.cyclicalMonth }}月
              {{ dayData.lunar.cyclicalDay }}日
            </p>
            <p>本年第{{ dayData.weekInYear }}周， 第{{ dayData.dayInYear }}天</p>
          </div>

          <div class="lunar">
            <el-descriptions
              :column="1"
              size="small"
              border
            >
              <el-descriptions-item label="星座" min-width="80">
                {{ dayData.astro }}
              </el-descriptions-item>
              <el-descriptions-item label="节日">
                {{ dayData.festivals.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="月相">
                {{ dayData.lunar.yuexiang }}
              </el-descriptions-item>
              <el-descriptions-item label="物候">
                {{ dayData.lunar.wuhou }}
              </el-descriptions-item>
              <el-descriptions-item label="数九">
                {{ dayData.lunar.shujiu }}
              </el-descriptions-item>
              <el-descriptions-item label="三伏">
                {{ dayData.lunar.sanfu }}
              </el-descriptions-item>
              <el-descriptions-item label="宜">
                {{ dayData.almanac.yi }}
              </el-descriptions-item>
              <el-descriptions-item label="忌">
                {{ dayData.almanac.ji }}
              </el-descriptions-item>
              <el-descriptions-item label="吉神方位">
                <p>喜神：{{ dayData.almanac.jishenfangwei.xi }}</p>
                <p>阳贵神：{{ dayData.almanac.jishenfangwei.yanggui }}</p>
                <p>阴贵神：{{ dayData.almanac.jishenfangwei.yingui }}</p>
                <p>福神：{{ dayData.almanac.jishenfangwei.fu }}</p>
                <p>财神：{{ dayData.almanac.jishenfangwei.cai }}</p>
              </el-descriptions-item>
              <el-descriptions-item label="冲">
                {{ dayData.almanac.chong }}
              </el-descriptions-item>
              <el-descriptions-item label="煞">
                {{ dayData.almanac.sha }}
              </el-descriptions-item>
              <el-descriptions-item label="纳音">
                {{ dayData.almanac.nayin }}
              </el-descriptions-item>
              <el-descriptions-item label="建除十二执星">
                {{ dayData.almanac.shiershen }}
              </el-descriptions-item>
              <el-descriptions-item label="二十八宿">
                {{ dayData.almanac.xingxiu }}
              </el-descriptions-item>
              <el-descriptions-item label="七政">
                {{ dayData.almanac.zheng }}
              </el-descriptions-item>
              <el-descriptions-item label="彭祖百忌">
                {{ dayData.almanac.pengzubaiji.join('、') }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, LunarYear, HolidayUtil } from 'lunar-typescript'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

definePageMeta({
  title: '万年历',
  description: '从1900年到2099年的万年历日历表，包括阳历、农历、节日、节气、五行等信息。'
})

const dateTime = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) { return }
  calendar.value.selectDate(val)
}

function getDayOverview (datetime: Date) {
  const solarInstance = Solar.fromDate(datetime)
  const lunarInstance = solarInstance.getLunar()
  const solarWeek = solarInstance.getWeek()
  const holiday = HolidayUtil.getHoliday(dayjs(datetime).format('YYYY-MM-DD'))

  const solarDay = solarInstance.getDay()
  const jieQi = lunarInstance.getCurrentJieQi()

  const festivals = [
    ...solarInstance.getFestivals(),
    ...lunarInstance.getFestivals()
  ]

  return {
    isHoliday: !!holiday?.getName(),
    isWork: holiday?.isWork(),
    isWeekend: solarWeek === 0 || solarWeek === 6,
    solarDay,
    festivals: festivals[0],
    solarTerms: jieQi?.getName(),
    lunarDay: lunarInstance.getDayInChinese()
  }
}

const dayData = computed(() => getDayDetail(dateTime.value))
const isToday = computed(() => !dayjs().isSame(dayjs(dateTime.value), 'day'))

const weekCnEnum = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
function getDayDetail (datetime: Date) {
  const calcTime = datetime ? new Date(datetime) : new Date()
  const solarInstance = Solar.fromDate(calcTime)
  const solarWeekInstance = SolarWeek.fromDate(calcTime, 1)
  const lunarInstance = solarInstance.getLunar()

  // 阳历
  const solarYear = solarInstance.getYear()
  const solarMonth = solarInstance.getMonth()
  const solarWeek = solarInstance.getWeek()
  const solarDay = solarInstance.getDay()

  // 农历
  const lunarYear = lunarInstance.getYear()
  const cnYear = lunarInstance.getYearInChinese()
  const lunarMonth = lunarInstance.getMonth()

  const lunarYearInstance = LunarYear.fromYear(lunarYear)

  // 计算当天的二十四节气
  let solarTerms = {}
  const jieQi = lunarInstance.getCurrentJieQi()
  if (jieQi) {
    solarTerms = {
      name: jieQi.getName(),
      time: jieQi.getSolar().toYmdHms()
    }
  }

  const shujiu = lunarInstance.getShuJiu()

  const result = {
    date: `${solarYear}-${solarMonth}-${solarDay}`,
    leapYear: solarInstance.isLeapYear(), // 是否为闰年
    maxDayInMonth: SolarUtil.getDaysOfMonth(solarYear, solarMonth), // 公历当月天数
    astro: solarInstance.getXingZuo() + '座', // 星座
    cnWeek: weekCnEnum[solarWeek], // 星期（中文）
    weekInYear: solarWeekInstance.getIndexInYear(),
    day: solarDay, // 公历日
    dayInYear: SolarUtil.getDaysInYear(solarYear, solarMonth, solarDay),
    julianDay: solarInstance.getJulianDay(),
    festivals: [
      ...solarInstance.getFestivals(),
      ...lunarInstance.getFestivals(),
      ...solarInstance.getOtherFestivals(),
      ...lunarInstance.getOtherFestivals()
    ], // 节日
    lunar: {
      date: `${cnYear + lunarInstance.getMonthInChinese()}月${lunarInstance.getDayInChinese()}`,
      zodiac: lunarInstance.getYearShengXiao(), // 生肖
      cyclicalYear: lunarInstance.getYearInGanZhi(), // 干支纪年
      cyclicalMonth: lunarInstance.getMonthInGanZhi(), // 干支纪月
      cyclicalDay: lunarInstance.getDayInGanZhi(), // 干支纪日
      maxDayInMonth: lunarYearInstance?.getMonth(lunarMonth)?.getDayCount(), // 农历当月天数
      leapMonth: lunarYearInstance.getLeapMonth(), // 当年闰几月
      yuexiang: lunarInstance.getYueXiang(), // 月相
      wuhou: lunarInstance.getWuHou(), // 物候
      shujiu: shujiu ? shujiu.getName() : '', // 数九
      sanfu: lunarInstance.getFu() || '', // 三伏
      solarTerms // 二十四节气
    },
    almanac: {
      yi: lunarInstance.getDayYi().join('、'), // 宜,
      ji: lunarInstance.getDayJi().join('、'), // 忌,
      chong: '生肖冲' + lunarInstance.getDayChongDesc(), // 冲,
      sha: '煞' + lunarInstance.getDaySha(), // 煞,
      nayin: lunarInstance.getDayNaYin(), // 纳音
      shiershen: lunarInstance.getZhiXing() + '神', // 建除十二执星
      xingxiu: lunarInstance.getXiu() + '宿', // 二十八宿
      zheng: lunarInstance.getZheng(), // 七政
      shou: lunarInstance.getShou(), // 四神兽
      pengzubaiji: [lunarInstance.getPengZuGan(), lunarInstance.getPengZuZhi()], // 彭祖百忌
      jishenfangwei: { // 吉神方位
        xi: lunarInstance.getDayPositionXi() + '-' + lunarInstance.getDayPositionXiDesc(), // 喜神
        yanggui: lunarInstance.getDayPositionYangGui() + '-' + lunarInstance.getDayPositionYangGuiDesc(), // 阳贵神
        yingui: lunarInstance.getDayPositionYinGui() + '-' + lunarInstance.getDayPositionYinGuiDesc(), // 阴贵神
        fu: lunarInstance.getDayPositionFu() + '-' + lunarInstance.getDayPositionFuDesc(), // 福神
        cai: lunarInstance.getDayPositionCai() + '-' + lunarInstance.getDayPositionCaiDesc() // 财神
      }
    }
  }

  return result
}
</script>

<style lang="scss" scoped>
.calendar {
  &-header {
    display: flex;
    gap: 16px;
    align-items: center;

    .el-icon{
      cursor: pointer;
    }

    &__today {
      width: 24px;
      height: 24px;
      color: #ffffff;
      line-height: 24px;
      text-align: center;
      background: var(--el-color-primary);
      border-radius: var(--el-border-radius-base);
      cursor: pointer;
    }
  }

  :deep(.calendar-item) {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    padding-top: 10px;
    text-align: center;

    .calendar-item__day {
      font-size: 18px;
      line-height: 2;
    }

    .calendar-item__info {
      font-size: 14px;
    }

    .calendar-item__info--holiday {
      color: var(--el-color-primary);
    }

    .calendar-item__rest,
    .calendar-item__work {
      position: absolute;
      top: 6px;
      right: 8px;
      width: 16px;
      height: 16px;
      color: #ffffff;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      border-radius: var(--el-border-radius-base);
    }

    .calendar-item__rest {
      background-color: #eb3333;
    }

    .calendar-item__work {
      background-color: #4e5877;
    }
  }
}

:deep(.calendar) {
  .calendar-item--holiday {
    background-color: var(--el-color-danger-light-9);
  }

  .calendar-item--work {
    background-color: var(--el-color-warning-light-9);
  }

  .calendar-item--weekend .calendar-item__day {
    color: #ff5a5d;
  }
}

:deep(.el-calendar) {
  .el-calendar__header {
    padding: 4px 0 16px;
  }

  .el-calendar__body {
    padding: 0;
  }
}

:deep(.el-calendar-table) {
  th {
    border-left: var(--el-calendar-border);

    &:last-child {
      border-right: var(--el-calendar-border);
    }
  }

  .el-calendar-day {
    padding: 0;
  }
}

.solar {
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  text-align: center;

  &-day {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 6px 0;
    color: #ffffff;
    font-size: 50px;
    line-height: 90px;
    background-color: #367df1;
    border-radius: 10px;

    &::before {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 6px;
      height: 6px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 50px 0 #ffffff;
      content: "";
    }
  }
}

.lunar {
  height: 346px;
  overflow: auto;
}
</style>
