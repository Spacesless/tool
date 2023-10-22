<template>
  <section class="section">
    <el-input v-model="keyword" @change="handleSearch" />

    <el-table :data="tableData">
      <el-table-column prop="name" label="成语" width="200" />
      <el-table-column prop="jbsy" label="基本释义" />
      <el-table-column prop="jyc" label="近义词" />
      <el-table-column prop="fyc" label="反义词" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
const { data } = await useFetch('/assets/json/idiom.json')

type TableData = Array<{ name: string, jbsy: string, jyc: string, fyc: string }>

const keyword = ref('')
const tableData = ref<TableData>([])

const handleSearch = () => {
  tableData.value = data.filter(item => item.name.includes(keyword.value))
}
</script>
