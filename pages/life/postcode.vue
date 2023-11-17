<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <div class="section-header">
      <p class="section-header__label">
        请输入省/市/区/邮政编码：
      </p>
      <el-input v-model="keyword" @change="handleSearch" />
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="province" label="省" />
      <el-table-column prop="city" label="市" />
      <el-table-column prop="area" label="区" />
      <el-table-column prop="post_code" label="邮政编码" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import postalcodes from '@/assets/json/postalcode.json'

const { currentTool } = useToolData()

type TableData = Array<{
  province: string
  city: string
  area: string
  post_code: string
}>

const keyword = ref('广州市')
const tableData = ref<TableData>([])

onBeforeMount(() => {
  handleSearch()
})

function handleSearch () {
  tableData.value = postalcodes.filter(item => item.province.includes(keyword.value) || item.city.includes(keyword.value) || item.area.includes(keyword.value))
}
</script>
