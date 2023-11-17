<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <div class="section-header">
      <p class="section-header__label">
        请选择年份：
      </p>
      <el-date-picker v-model="dateTime" type="year" @change="handleSearch" />
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="time" label="时间" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import { Solar } from 'lunar-typescript'

const { currentTool } = useToolData()

type TableData = Array<{
  name: string
  time: string
}>

const solarTermEnum: Record<string, string> = {
  DA_XUE: '大雪',
  DONG_ZHI: '冬至',
  XIAO_HAN: '小寒',
  DA_HAN: '大寒',
  LI_CHUN: '立春',
  YU_SHUI: '雨水',
  JING_ZHE: '惊蛰'
}

const dateTime = ref(new Date())
const tableData = ref<TableData>([])

onBeforeMount(() => {
  handleSearch()
})

function handleSearch () {
  const solarInstance = Solar.fromDate(dateTime.value)
  const lunarInstance = solarInstance.getLunar()

  const result = []
  const jieQiList = lunarInstance.getJieQiList()
  const jieQi = lunarInstance.getJieQiTable()
  for (let i = 0, j = jieQiList.length; i < j; i++) {
    let name = jieQiList[i]
    const time = jieQi.get(name).toYmdHms()
    name = solarTermEnum[name] || name
    result.push({ name, time })
  }

  tableData.value = result
}
</script>
