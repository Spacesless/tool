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
    width="550px"
    class="search-dialog"
    :show-close="false"
    :append-to-body="true"
  >
    <div class="search-dialog-wrapper">
      <el-select-v2
        :ref="selectRef"
        v-model="keyword"
        class="search-dialog-select"
        clearable
        filterable
        :options="options"
        placeholder="输入关键字查找工具，如图片压缩"
        size="large"
      >
        <template #default="{ item }">
          <p>{{ item.label }}</p>
          <p>{{ item.value }}</p>
        </template>
      </el-select-v2>

      <ul class="search-dialog-commands">
        <li>
          <Icon class="search-dialog-commands__key" name="uiw:enter" />
          <span class="search-dialog-commands__label">选择</span>
        </li>
        <li>
          <Icon class="search-dialog-commands__key" name="uiw:arrow-down" />
          <Icon class="search-dialog-commands__key" name="uiw:arrow-up" />
          <span class="search-dialog-commands__label">切换</span>
        </li>
        <li>
          <Icon class="search-dialog-commands__key" name="vaadin:esc-a" />
          <span class="search-dialog-commands__label">关闭</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { VNodeRef } from 'vue'
import { ToolItem } from '@/interfaces/tool'

const allTools = useState('allTools', (): Array<ToolItem> => [])

const keyword = ref<string>()
const selectRef = ref<VNodeRef>()

const options = computed(() => allTools.value.map(item => ({
  value: item.path,
  label: item.name
})))

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler)
})
onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})
const dialogVisible = ref<boolean>(false)
const handleSearch = () => {
  dialogVisible.value = true
}
const keyDownHandler = (e: KeyboardEvent) => {
  e.preventDefault()
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
    margin-left: 6px;
    font-size: 14px;
  }

  &__keycode {
    height: 22px;
    margin-left: 6px;
    padding: 0 6px;
    font-size: 12px;
    line-height: 22px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
  }

  &:hover &__keycode {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }

  &-dialog {
    &-wrapper {
      position: relative;
      height: 250px;
      padding-top: 16px;
      overflow: hidden;
      background-color: var(--el-fill-color-light);
    }

    &-select {
      display: block;
      width: calc(100% - 2 * 16px);
      margin: 0 16px;
    }

    &-commands{
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 44px;
      color: var(--el-text-color-primary);
      font-size: 14px;
      background-color: var(--el-color-white);

      li {
        margin-left: 16px;
      }

      &__key {
        margin-right: 6px;
        font-size: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
.search-dialog {
  margin-top: 10vh;
  overflow: hidden;
  border-radius: 8px;

  .el-dialog {
    &__header {
      display: none;
    }

    &__body {
      padding: 0;
    }
  }
}
</style>
