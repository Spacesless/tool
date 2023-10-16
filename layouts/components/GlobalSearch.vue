<template>
  <div class="search" @click="handleSearch">
    <el-icon class="search-icon">
      <Search />
    </el-icon>
    <span class="search__label">搜索</span>
    <span class="search__keycode">Ctrl + K</span>
  </div>

  <el-dialog
    v-model="dialogVisible"
    width="500px"
  >
    <el-select-v2
      :ref="selectRef"
      v-model="keyword"
      clearable
      filterable
      :options="options"
      placeholder="输入关键字查找工具，如图片压缩"
      size="large"
    >
      <template #default="{ item }">
        <p style="margin-right: 8px">
          {{ item.label }}
        </p>
        <p style="color: var(--el-text-color-secondary); font-size: 13px">
          {{ item.value }}
        </p>
      </template>
    </el-select-v2>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { VNodeRef } from 'vue'

const keyword = ref<string>('')
const options = ref<[]>([])
const selectRef = ref<VNodeRef>()

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler)
})
onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})
const dialogVisible = ref<boolean>(false)
const handleSearch = async () => {
  dialogVisible.value = true

  await nextTick()
  console.log(selectRef.value)
}
const keyDownHandler = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    handleSearch()
  }
}
</script>

<style lang="scss" scoped>
.search {
  color: var(--el-text-color-secondary);
  cursor: pointer;

  &:hover {
    color: var(--el-text-color-primary);
  }

  &-icon,
  &__label,
  &__keycode {
    display: inline-block;
    vertical-align: middle;
  }

  &__label {
    margin-left: 4px;
  }

  &__keycode {
    height: 22px;
    margin-left: 4px;
    padding: 0 6px;
    font-size: 12px;
    font-family: inherit;
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
}
</style>
