<template>
  <section class="section">
    <el-date-picker v-model="dateTime" @change="handleSearch" />

    <el-table :data="tableData">
      <el-table-column prop="hours" label="时段" />
      <el-table-column prop="hour" label="时辰" />
      <el-table-column prop="yi" label="宜" />
      <el-table-column prop="ji" label="忌" />
      <el-table-column prop="chong" label="冲" />
      <el-table-column prop="sha" label="煞" />
      <el-table-column prop="nayin" label="纳音" />
      <el-table-column prop="jiuxing" label="九星" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import { Solar, Lunar, LunarUtil } from 'lunar-typescript'

type TableData = Array<{
  date: string
  hours: string
  hour: string
  yi: string
  ji: string
  chong: string
  sha: string
  nayin: string
  jiuxing: string
}>

const dateTime = ref(new Date())
const tableData = ref<TableData>([])

function handleSearch () {
  const solarInstance = Solar.fromDate(dateTime.value)
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

  const last = result.pop()
  if (last) {
    result.unshift(last) // 将子时提前
  }

  tableData.value = result
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
