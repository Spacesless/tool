<template>
  <section class="section">
    <el-input v-model="keyword" @change="handleSearch" />

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

type TableData = Array<{
  province: string
  city: string
  area: string
  post_code: string
}>

const keyword = ref('')
const tableData = ref<TableData>([])

function handleSearch () {
  tableData.value = postalcodes.filter(item => item.province.includes(keyword.value) || item.city.includes(keyword.value) || item.area.includes(keyword.value))
}
</script>
