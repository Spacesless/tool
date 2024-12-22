<template>
  <header class="header">
    <div class="header-collapse" @click="toggleCollapse">
      <Icon class="header-icon" name="uiw:right" />
    </div>

    <div class="header-left">
      <GlobalSearch />
    </div>

    <div class="header-right">
      <ClientOnly>
        <el-tooltip effect="dark" :content="isDark ? '白天模式' : '黑夜模式'" placement="bottom">
          <Icon class="header-icon" :name="isDark ? 'ph:sun' : 'ph:moon'" @click="toggleColorMode" />
        </el-tooltip>
      </ClientOnly>
    </div>
  </header>
</template>

<script lang="ts" setup>
import GlobalSearch from './GlobalSearch.vue'

const route = useRoute()
const colorMode = useColorMode()
const isCollapse = useState('collapse')

onBeforeMount(() => {
  if (route.query.theme) {
    colorMode.preference = route.query.theme === 'dark' ? 'dark' : 'light'
  }
})

const isDark = computed(() => colorMode.preference === 'dark')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const toggleCollapse = () => {
  isCollapse.value = false
}
</script>

<style lang="scss" scoped>
.header {
  --header-height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  line-height: var(--header-height);

  &-collapse {
    display: none;
  }

  &-icon {
    font-size: 20px;
    outline: none;
    cursor: pointer;
  }

  @media (width <= 768px) {
    --header-height: 50px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 7;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);

    &-collapse {
      display: block;
    }
  }
}
</style>
