<template>
  <header class="header">
    <div class="header-collapse" @click="toggleCollapse">
      <Icon class="header-icon" name="uiw:right" />
    </div>

    <div class="header-left">
      <GlobalSearch />
    </div>

    <div class="header-right">
      <el-tooltip effect="dark" :content="isDark ? '白天模式' : '黑夜模式'" placement="bottom">
        <Icon class="header-icon" :name="isDark ? 'ph:sun' : 'ph:moon'" @click="toggleColorMode" />
      </el-tooltip>
    </div>
  </header>
</template>

<script lang="ts" setup>
import GlobalSearch from './GlobalSearch.vue'

const colorMode = useColorMode()
const isCollapse = useState('collapse')

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const toggleCollapse = () => {
  isCollapse.value = false
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;

  &-collapse {
    display: none;
  }

  &-icon {
    font-size: 20px;
    outline: none;
  }

  @media (width <= 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    background: #ffffff;
    box-shadow: var(--el-box-shadow-lighter);

    &-collapse {
      display: block;
    }
  }
}
</style>
