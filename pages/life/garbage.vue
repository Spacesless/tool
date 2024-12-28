<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <el-form>
          <el-form-item label="关键字">
            <el-input v-model="keyword" clearable placeholder="请输入生活垃圾名称" @keydown.enter="handleSearch" />
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="categroy" placeholder="请选择类别" clearable @change="handleSearch">
              <el-option v-for="item in categroyOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <el-table v-loading="status === 'pending'" :data="tableData" border height="600">
        <el-table-column prop="categroy" label="类别" />
        <el-table-column prop="name" label="垃圾名称" />
      </el-table>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '生活垃圾',
  description: '生活垃圾分类查询，可回收物、有害垃圾、湿垃圾、干垃圾'
})

type TableData = Array<{ name: string, categroy: string }>

const keyword = ref('牛奶')
const categroy = ref(undefined)
const categroyOptions = reactive(['可回收物', '有害垃圾', '湿垃圾', '干垃圾', '大件垃圾'])
const tableData = ref<TableData>([])

const { data, status, refresh } = useFetch<{ data: TableData }>(
  'https://api.timelessq.com/garbage',
  {
    query: {
      keyword,
      categroy
    },
    watch: false
  }
)

async function handleSearch () {
  if (!keyword.value && !categroy.value) {
    return (tableData.value = [])
  }
  await refresh()
  tableData.value = data.value?.data || []
}

onBeforeMount(() => {
  handleSearch()
})
</script>
