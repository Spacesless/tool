<template>
  <ToolLayout>
    <section class="section poetry">
      <el-space class="section-header" :size="16">
        <el-input v-model="author" style="width: 250px" placeholder="请输入作者" clearable @change="handleSearch" />
        <el-input v-model="keyword" style="width: 250px" placeholder="请输入关键词" clearable @change="handleSearch" />
        <el-button type="primary" @click="handleSearch">
          搜索
        </el-button>
      </el-space>

      <el-table :data="tableData" border :height="600">
        <el-table-column type="expand">
          <template #default="props">
            <div class="poetry-paragraphs">
              <p v-for="item in props.row.paragraphs" :key="item">
                {{ item }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="tags" label="标签" />
        <el-table-column prop="prologue" label="注释" />
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

    <template #content>
      <p>中文诗歌，目前收录诗经、唐诗、宋词、元曲等诗歌12000多首，部分存在繁体字。</p>
      <p>数据来源：<a href="https://github.com/chinese-poetry/chinese-poetry" target="_blank" rel="noopener noreferrer">https://github.com/chinese-poetry/chinese-poetry</a></p>
      <p>Api接口：<a href="https://api.timelessq.com/poetry" target="_blank" rel="noopener noreferrer">https://api.timelessq.com/poetry</a></p>
      <p>文档查看：<a href="https://api.timelessq.com" target="_blank" rel="noopener noreferrer">https://api.timelessq.com</a></p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '中文诗歌',
  description: '诗经、唐诗、宋词、元曲等诗歌12000多首。',
  updateTime: '2024-10-29'
})

const author = ref('')
const keyword = ref('')
const tableData = ref<Record<string, string>[]>([])
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 20
})

const { fetchList } = useFetchData()

onMounted(() => {
  fetchList()
})

const isMobile = useState('isMobile', () => false)
const layout = computed(() => isMobile.value ? 'total, ->,  prev, next, jumper' : 'total, ->, prev, pager, next, jumper')

function handleCurrentChange (val: number) {
  pagination.currentPage = val

  fetchList()
}

function handleSearch () {
  pagination.currentPage = 1

  fetchList()
}

function useFetchData () {
  const page = computed(() => pagination.currentPage)

  const { data, refresh } = useFetch<{ data: { count: number, data: {}[] } }>(
    'https://api.timelessq.com/poetry',
    {
      query: {
        author,
        keyword,
        page,
        pageSize: pagination.pageSize
      }
    }
  )

  async function fetchList () {
    await refresh()
    const { count, data: list } = data.value?.data || {}

    pagination.total = count || 0
    tableData.value = list || []
  }

  return {
    fetchList
  }
}
</script>

<style lang="scss" scoped>
.poetry-paragraphs {
  padding: 8px 0;
  font-size: 16px;
  line-height: 2;
  text-align: center;
}
</style>
