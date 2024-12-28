<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <p class="section-header__label">
          请输入成语后缀，按回车键搜索：
        </p>
        <el-input v-model="keyword" clearable @keydown.enter="handleSearch" />
      </div>

      <el-table v-loading="status === 'pending'" :data="tableData" border :height="600">
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

type TableData = { name: string, jbsy: string, jyc: string, fyc: string }

const {
  keyword,
  tableData,
  pagination,
  layout,
  status,
  fetchList,
  handleSearch,
  handleCurrentChange
} = useFetchData()

onMounted(() => {
  fetchList()
})

function useFetchData () {
  const keyword = ref('为所欲为')
  const tableData = ref<TableData[]>([])
  const pagination = reactive({
    total: 0,
    currentPage: 1,
    pageSize: 20
  })

  const isMobile = useState('isMobile', () => false)
  const layout = computed(() => isMobile.value ? 'total, ->,  prev, next, jumper' : 'total, ->, prev, pager, next, jumper')
  const page = computed(() => pagination.currentPage)

  const { data, status, refresh } = useFetch<{ data: { count: number, data: TableData[] } }>(
    'https://api.timelessq.com/idiom/relay',
    {
      query: {
        wd: keyword,
        page,
        pageSize: pagination.pageSize
      },
      watch: false
    }
  )

  async function fetchList () {
    await refresh()
    const { count, data: list } = data.value?.data || {}

    pagination.total = count || 0
    tableData.value = list || []
  }

  function handleSearch () {
    pagination.currentPage = 1

    fetchList()
  }

  function handleCurrentChange (val: number) {
    pagination.currentPage = val

    fetchList()
  }

  return {
    keyword,
    tableData,
    pagination,
    layout,
    status,
    fetchList,
    handleSearch,
    handleCurrentChange
  }
}
</script>
