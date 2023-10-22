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
import { Solar, Lunar, LunarUtil } from 'lunar-typescript'

const form = reactive({
  content: '',
  type: 'cn',
  result: ''
})

function handleConvert () {
  const calcTime = date ? new Date(date) : new Date()
  const solarInstance = Solar.fromDate(calcTime)
  const lunarInstance = solarInstance.getLunar()

  // 公历
  const solarYear = solarInstance.getYear()
  const solarMonth = solarInstance.getMonth()

  // 农历
  const lunarYear = lunarInstance.getYear()
  const lunarMonth = lunarInstance.getMonth()
  const lunarDay = lunarInstance.getDay()

  const result = []
  for (let i = 0; i < 24; i += 2) {
    const middleHour = i + 2 >= 24 ? 24 - (i + 2) : i + 2
    const lunarInstance = Lunar.fromYmdHms(lunarYear, lunarMonth, lunarDay, middleHour, 0, 0)

    const row = {
      date: `${solarYear}-${solarMonth}-${solarInstance.getDay()}`,
      hours: `${formatTwoDigit(i + 1)}:00-${formatTwoDigit(middleHour)}:59`,
      hour: LunarUtil.convertTime(`${formatTwoDigit(middleHour)}:00`) + '时', // 时辰
      yi: lunarInstance.getTimeYi().join(' '), // 时宜
      ji: lunarInstance.getTimeJi().join(' '), // 时忌
      chong: '生肖冲' + lunarInstance.getTimeChongDesc(), // 时冲,
      sha: '煞' + lunarInstance.getTimeSha(), // 时煞
      nayin: lunarInstance.getTimeNaYin(), // 纳音
      jiuxing: lunarInstance.getTimeNineStar().toString() // 九星
    }
    result.push(row)
  }

  result.unshift(result.pop()) // 将子时提前
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
