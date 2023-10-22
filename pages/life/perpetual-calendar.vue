<template>
  <el-row class="section">
    <el-form :model="form" label-width="80px">
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.content"
            :rows="3"
            type="textarea"
            @change="handleConvert"
          />
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="form.type">
            <el-radio label="cn">
              简体
            </el-radio>
            <el-radio label="hk">
              繁体
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.result"
            :rows="5"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, LunarUtil, LunarYear } from 'lunar-typescript'

const form = reactive({
  content: '',
  type: 'cn',
  result: ''
})

const monthEnEnum = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekCnEnum = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const weekEnEnum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function handleConvert () {
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
    ] // 节日
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
    cnYear: cnYear ? cnYear.replace(new RegExp('〇', 'g'), '零') : '', // 农历年（中文）
    cnMonth: lunarInstance.getMonthInChinese() + '月', // 农历月（中文）
    cnDay: lunarInstance.getDayInChinese(), // 农历日（中文）
    cyclicalYear: lunarInstance.getYearInGanZhi(), // 干支纪年
    cyclicalMonth: lunarInstance.getMonthInGanZhi(), // 干支纪月
    cyclicalDay: lunarInstance.getDayInGanZhi(), // 干支纪日
    hour: LunarUtil.convertTime(`${formatTwoDigit(hour)}:${formatTwoDigit(minute)}`) + '时', // 时辰
    maxDayInMonth: lunarYearInstance.getMonth(lunarMonth)._p.dayCount, // 农历当月天数
    leapMonth: lunarYearInstance.getLeapMonth(lunarYear), // 当年闰几月
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
  return val.toString().padEnd(2, '0')
}
</script>
