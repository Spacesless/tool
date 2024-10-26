<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <p class="section-header__label">
          请输入生活垃圾：
        </p>
        <el-input v-model="keyword" clearable @change="handleSearch" />
      </div>

      <el-table :data="tableData" border>
        <el-table-column prop="categroy" label="类别" />
        <el-table-column prop="name" label="垃圾名称" />
      </el-table>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import garbages from '@/assets/json/garbage.json'

definePageMeta({
  title: '生活垃圾',
  description: '生活垃圾分类查询，可回收物、有害垃圾、湿垃圾、干垃圾'
})

interface GarbageItem {
  name: string
  categroy: number
}

type TableData = Array<{ name: string, categroy: string }>

const categroysEnum: {[key: number]: string} = {
  1: '可回收物',
  2: '有害垃圾',
  4: '湿垃圾',
  8: '干垃圾',
  16: '大件垃圾'
}

const keyword = ref('牛奶')
const categroy = ref('')
const tableData = ref<TableData>([])

onBeforeMount(() => {
  handleSearch()
})

function handleSearch () {
  const filterGarbages: Array<GarbageItem> = garbages.filter((item) => {
    let isEqualCategroy = true
    let includeKeyword = true

    if (categroy.value) {
      const keys = Object.keys(categroysEnum)
      const values = Object.values(categroysEnum)
      const findIndex = values.findIndex(item => item === categroy.value)
      const categroyId = keys[findIndex]
      isEqualCategroy = item.categroy === +categroyId
    }
    if (keyword.value) {
      includeKeyword = item.name.includes(keyword.value)
    }

    return isEqualCategroy && includeKeyword
  })

  tableData.value = filterGarbages.map((item) => {
    const { name, categroy } = item
    return {
      name,
      categroy: categroysEnum[categroy]
    }
  })
}
</script>
