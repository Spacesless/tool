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
    :width="isMobile ? '90%' : '600px'"
    class="search-dialog"
    :show-close="false"
    :append-to-body="true"
  >
    <div class="search-dialog-wrapper">
      <ClientOnly>
        <el-select-v2
          ref="searchRef"
          v-model="keyword"
          class="search-dialog-select"
          clearable
          filterable
          :options="options"
          :height="232"
          placeholder="输入关键字查找工具，如图片压缩"
          size="large"
          @change="onSelectChange"
        >
          <template #default="{ item }">
            <p>{{ item.label }}</p>
            <p>{{ item.value }}</p>
          </template>
        </el-select-v2>
      </ClientOnly>

      <ul class="search-commands">
        <li>
          <span class="search-commands__tooltip">Tab</span>
        </li>
        <li>
          <kbd class="search-commands-key">
            <svg width="15" height="15" aria-label="Enter key" role="img">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3" />
              </g>
            </svg>
          </kbd>
          <span class="search-commands-label">选择</span>
        </li>
        <li>
          <kbd class="search-commands-key">
            <svg width="15" height="15" aria-label="Arrow down" role="img">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3" />
              </g>
            </svg>
          </kbd>
          <kbd class="search-commands-key">
            <svg width="15" height="15" aria-label="Arrow up" role="img">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3" />
              </g>
            </svg>
          </kbd>
          <span class="search-commands-label">切换</span>
        </li>
        <li>
          <kbd class="search-commands-key">
            <svg width="15" height="15" aria-label="Escape key" role="img">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956" />
              </g>
            </svg>
          </kbd>
          <span class="search-commands-label">关闭</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { sleep } from '@/utils'

const router = useRouter()
const routes = router.getRoutes()
const isMobile = useState('isMobile', () => false)

const keyword = ref()

const options = computed(() => routes.filter(item => item.meta.description).map(item => ({
  value: item.path,
  label: item.meta.title
})))

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler)
})
onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})
const dialogVisible = ref<boolean>(false)
const searchRef = ref()
const handleSearch = async () => {
  dialogVisible.value = true
  await sleep(300)
  searchRef.value.$el.click()
  searchRef.value.$refs.inputRef?.focus()
}
const keyDownHandler = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    handleSearch()
  }
}

const onSelectChange = () => {
  router.push({ path: keyword.value })
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.search {
  color: var(--el-text-color-regular);
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
      height: 356px;
      padding-top: 16px;
      overflow: hidden;
      background-color: var(--el-fill-color-light);
    }

    &-select {
      display: block;
      width: calc(100% - 2 * 16px);
      margin: 0 16px;
    }
  }

  &-commands{
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    color: var(--el-text-color-primary);
    font-size: 14px;
    background-color: var(--el-bg-color);

    li {
      margin-left: 16px;
    }

    &__tooltip {
      display: inline-block;
      padding: 2px 6px;
      color: var(--el-text-color-secondary);
      border: 1px solid var(--el-border-color-light);
      border-radius: var(--el-border-radius-base);
    }

    &-key {
      margin-right: 6px;
      font-size: 12px;
      vertical-align: middle;
    }

    &-label {
      vertical-align: middle;
    }
  }
}
</style>

<style lang="scss">
.search-dialog {
  margin-top: 60px;
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
