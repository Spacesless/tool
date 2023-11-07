<template>
  <section class="section">
    <el-date-picker v-model="dateTime" @change="handleSearch" />

    <el-table :data="tableData">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="time" label="时间" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import { Solar } from 'lunar-typescript'

type TableData = Array<{
  name: string
  time: string
}>

const dateTime = ref(new Date())
const tableData = ref<TableData>([])

function handleSearch () {
  const solarInstance = Solar.fromDate(dateTime.value)
  const lunarInstance = solarInstance.getLunar()

  const result = []
  const jieQiList = lunarInstance.getJieQiList()
  const jieQi = lunarInstance.getJieQiTable()
  for (let i = 0, j = jieQiList.length; i < j; i++) {
    let name = jieQiList[i]
    const time = jieQi[name].toYmdHms()
    if (month) { // 查询指定月份的节气
      if (jieQi[name].getYear() === year && jieQi[name].getMonth() === +month) {
        name = solarTermEnum[name] || name
        result.push({ name, time })
      }
    } else { // 查询全部的节气
      name = solarTermEnum[name] || name
      result.push({ name, time })
    }
  }

  tableData.value = result
}
</script>
