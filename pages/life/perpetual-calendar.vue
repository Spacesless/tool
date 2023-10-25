<template>
  <section class="section">
    <el-calendar ref="calendar" v-model="dateTime">
      <template #header>
        <a-date-picker v-model="dateTime" size="small" type="year" format="YYYY" />
        <a-date-picker v-model="dateTime" size="small" type="month" format="MM" />
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-year')">
            <el-icon><ArrowLeft /></el-icon>
          </el-button>
          <el-button size="small" @click="selectDate('prev-month')">
            <el-icon><ArrowRight /></el-icon>
          </el-button>
          <el-button size="small" @click="selectDate('today')">
            今
          </el-button>
        </el-button-group>
      </template>
      <template #date-cell="{ date, data = getDayOverview(date) }">
        <div class="calender-item" :class="{'calender-item--holiday': data.isHoliday, 'canlender-item--work': data.isWork, 'canlender-item--weekend': data.isWeekend}">
          {{ data }}{{ date }}
        </div>
      </template>
    </el-calendar>

    <div class="detail">
      {{ getDayDetail(new Date()) }}
      <p />
      <p class="detail-day" />
      <p />
      <p />
      <p />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, LunarUtil, LunarYear, HolidayUtil } from 'lunar-typescript'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import dayjs from 'dayjs'

const dateTime = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) { return }
  calendar.value.selectDate(val)
}

const monthEnEnum = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekCnEnum = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const weekEnEnum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getDayOverview (datetime: Date) {
  const solarInstance = Solar.fromDate(datetime)
  const lunarInstance = solarInstance.getLunar()
  const solarWeek = solarInstance.getWeek()
  const holiday = HolidayUtil.getHoliday(dayjs(datetime).format('YYYY-MM-DD'))

  return {
    isHoliday: !!holiday?.getName(),
    isWork: holiday?.isWork(),
    isWeekend: solarWeek === 0 || solarWeek === 6,
    festivals: [
      ...solarInstance.getFestivals(),
      ...lunarInstance.getFestivals()
    ]
  }
}

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
  const hour = calcTime.getHours()
  const minute = calcTime.getMinutes()

  const result = {
    year: solarYear, // 公历年
    leapYear: solarInstance.isLeapYear(), // 是否为闰年
    month: solarMonth, // 公历月
    maxDayInMonth: SolarUtil.getDaysOfMonth(solarYear, solarMonth), // 公历当月天数
    enMonth: monthEnEnum[solarMonth - 1], // 公历月（英文）
    astro: solarInstance.getXingZuo() + '座', // 星座
    cnWeek: weekCnEnum[solarWeek], // 星期（中文）
    enWeek: weekEnEnum[solarWeek], // 星期（英文）
    weekInYear: solarWeekInstance.getIndexInYear(),
    day: solarDay, // 公历日
    dayInYear: SolarUtil.getDaysInYear(solarYear, solarMonth, solarDay),
    julianDay: solarInstance.getJulianDay(),
    hour,
    minute,
    second: calcTime.getSeconds(),
    festivals: [
      ...solarInstance.getFestivals(),
      ...lunarInstance.getFestivals(),
      ...solarInstance.getOtherFestivals(),
      ...lunarInstance.getOtherFestivals()
    ], // 节日
    lunar: {},
    almanac: {}
  }

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

  result.lunar = {
    zodiac: lunarInstance.getYearShengXiao(), // 生肖
    year: lunarYear, // 农历年
    month: lunarMonth, // 农历月
    day: lunarInstance.getDay(), // 农历日
    cnYear: cnYear ? cnYear.replace(/〇/g, '零') : '', // 农历年（中文）
    cnMonth: lunarInstance.getMonthInChinese() + '月', // 农历月（中文）
    cnDay: lunarInstance.getDayInChinese(), // 农历日（中文）
    cyclicalYear: lunarInstance.getYearInGanZhi(), // 干支纪年
    cyclicalMonth: lunarInstance.getMonthInGanZhi(), // 干支纪月
    cyclicalDay: lunarInstance.getDayInGanZhi(), // 干支纪日
    hour: LunarUtil.convertTime(`${formatTwoDigit(hour)}:${formatTwoDigit(minute)}`) + '时', // 时辰
    maxDayInMonth: lunarYearInstance?.getMonth(lunarMonth)?.getDayCount(), // 农历当月天数
    leapMonth: lunarYearInstance.getLeapMonth(), // 当年闰几月
    yuexiang: lunarInstance.getYueXiang(), // 月相
    wuhou: lunarInstance.getWuHou(), // 物候
    shujiu: shujiu ? shujiu.getName() : '', // 数九
    sanfu: lunarInstance.getFu() || '', // 三伏
    solarTerms // 二十四节气
  }

  const jiuxing = lunarInstance.getDayNineStar()

  // 老黄历
  result.almanac = {
    yi: lunarInstance.getDayYi().join(' '), // 宜,
    ji: lunarInstance.getDayJi().join(' '), // 忌,
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
    },
    liuyao: lunarInstance.getLiuYao(),
    jiuxing: jiuxing ? jiuxing.toString() : '',
    taisui: lunarInstance.getDayPositionTaiSui() + '-' + lunarInstance.getDayPositionTaiSuiDesc()
  }
}

/**
 * 格式化成两位数
 * @param {Number} val
 * @returns {String}
 */
function formatTwoDigit (val: number) {
  return val.toString().padStart(2, '0')
}
</script>
