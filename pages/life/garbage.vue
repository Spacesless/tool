<template>
  <section class="section">
    <el-input v-model="keyword" @change="handleSearch" />

    <el-table :data="tableData">
      <el-table-column prop="categroy" label="类别" width="200" />
      <el-table-column prop="name" label="垃圾名称" />
    </el-table>
  </section>
</template>

<script setup lang="ts">
import garbages from '@/assets/json/garbage.json'

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

const keyword = ref('')
const categroy = ref('')
const tableData = ref<TableData>([])

function handleSearch () {
  const filterGarbages: Array<GarbageItem> = garbages.filter((item) => {
    let isEqualCategroy = true
    let includeKeyword = true

    if (categroy) {
      const keys = Object.keys(categroysEnum)
      const values = Object.values(categroysEnum)
      const findIndex = values.findIndex(item => item === categroy.value)
      const categroyId = keys[findIndex]
      isEqualCategroy = item.categroy === +categroyId
    }
    if (keyword.value) { includeKeyword = item.name.includes(keyword.value) }

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
