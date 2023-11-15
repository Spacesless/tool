<template>
  <ToolBanner :current-tool="currentTool" />

  <section v-loading="pending" class="section">
    <div class="section-header">
      <p class="section-header__label">
        请输入成语：
      </p>
      <el-input v-model="keyword" clearable @change="handleSearch" />
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="name" label="成语" width="120" />
      <el-table-column prop="jbsy" label="基本释义" />
      <el-table-column prop="jyc" label="近义词" />
      <el-table-column prop="fyc" label="反义词" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

const { pending, data }: { pending: Ref<boolean>; data: Ref<any[]> } = await useFetch('/assets/json/idiom.json', {
  lazy: true,
  server: false
})

type TableData = Array<{ name: string, jbsy: string, jyc: string, fyc: string }>

const keyword = ref('为所欲为')
const tableData = ref<TableData>([])

watch(() => pending.value, handleSearch)

function handleSearch () {
  if (keyword.value) {
    tableData.value = data.value.filter(item => item.name.includes(keyword.value))
  } else {
    tableData.value = []
  }
}
</script>
