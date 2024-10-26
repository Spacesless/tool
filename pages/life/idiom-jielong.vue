<template>
  <ToolLayout>
    <section v-loading="pending" class="section">
      <div class="section-header">
        <p class="section-header__label">
          请输入成语后缀，按回车键搜索：
        </p>
        <el-input v-model="keyword" clearable @change="handleSearch" />
      </div>

      <el-table :data="filterData" border :height="600">
        <el-table-column prop="name" label="成语" width="120" />
        <el-table-column prop="jbsy" label="基本释义" min-width="200" />
        <el-table-column prop="jyc" label="近义词" min-width="200" />
        <el-table-column prop="fyc" label="反义词" min-width="200" />
      </el-table>

      <el-pagination
        v-model:current-page="pagination.currentPage"
        class="pagination"
        :page-size="pagination.pageSize"
        :background="true"
        :layout="layout"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      />
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '成语接龙',
  description: '支持输入整个成语，或只输入成语中的末尾一个字，返回符合接龙条件的成语；\n目前总计约收录4.5万组成语。'
})

const { pending, data }: { pending: Ref<boolean>; data: Ref<any[]> } = await useFetch('/assets/json/idiom.json', {
  lazy: true,
  server: false
})

type TableData = Array<{ name: string, jbsy: string, jyc: string, fyc: string }>

const keyword = ref('为所欲为')
const tableData = ref<TableData>([])
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 20
})

const filterData = computed(() => {
  const { currentPage, pageSize } = pagination
  return tableData.value.slice((currentPage - 1) * pageSize, currentPage * pageSize)
})
watch(() => pending.value, handleSearch)

function handleSearch () {
  if (keyword.value) {
    const lastChar = keyword.value.slice(-1)
    tableData.value = data.value.filter(item => item.name.startsWith(lastChar))
  } else {
    tableData.value = []
  }

  pagination.total = tableData.value.length
  pagination.currentPage = 1
}

function handleCurrentChange (val: number) {
  pagination.currentPage = val
}

const isMobile = useState('isMobile', () => false)
const layout = computed(() => isMobile.value ? 'total, ->,  prev, next, jumper' : 'total, ->, prev, pager, next, jumper')
</script>
