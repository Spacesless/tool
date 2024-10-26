<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <p class="section-header__label">
          请输入省/市/简称/车牌前缀：
        </p>
        <el-input v-model="keyword" @change="handleSearch" />
      </div>

      <el-table :data="tableData" border>
        <el-table-column prop="province" label="省" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="code" label="简称" />
        <el-table-column prop="prefix" label="车牌前缀" />
      </el-table>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import licenses from '@/assets/json/license.json'

definePageMeta({
  title: '车牌归属地',
  description: '根据国内车牌号或车牌前缀查询所属归属省份城市'
})

interface License {
  province: string
  city: string
  code: string
  prefix: string
}

type TableData = Array<License>

const keyword = ref('桂')
const tableData = ref<TableData>([])

onBeforeMount(() => {
  handleSearch()
})

function handleSearch () {
  tableData.value = licenses.filter((item) => JSON.stringify(item).includes(keyword.value));
}
</script>
