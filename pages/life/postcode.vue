<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <p class="section-header__label">
          请输入省/市/区/邮政编码：
        </p>
        <el-input v-model="keyword" @change="handleSearch" />
      </div>

      <el-table v-loading="status === 'pending'" :data="tableData" border height="600">
        <el-table-column prop="province" label="省" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="area" label="区" />
        <el-table-column prop="areaCode" label="区号" />
        <el-table-column prop="postCode" label="邮政编码" />
      </el-table>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '邮政编码',
  description: '邮政编码信息查询，根据地区、邮政编码查询相关信息'
})

type TableData = Array<{
  province: string
  city: string
  area: string
  post_code: string
}>

const keyword = ref('广州市')
const tableData = ref<TableData>([])

const { data, status, refresh } = useFetch<{ data: TableData }>(
  'https://api.timelessq.com/postalcode',
  {
    query: {
      keyword
    },
    watch: false
  }
)

async function handleSearch () {
  if (!keyword.value) {
    return (tableData.value = [])
  }
  await refresh()
  tableData.value = data.value?.data || []
}

onBeforeMount(() => {
  handleSearch()
})
</script>
