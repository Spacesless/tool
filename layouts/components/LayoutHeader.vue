<template>
  <header class="header">
    <div class="header-left">
      <GlobalSearch />
    </div>

    <div class="header-right">
      <el-tooltip effect="dark" :content="colorMode.preference === 'light' ? '黑夜模式' : '白天模式'" placement="bottom">
        <Icon class="header-right__icon" :name="isDark ? 'ph:sun' : 'ph:moon'" @click="toggleColorMode" />
      </el-tooltip>
    </div>
  </header>
</template>

<script lang="ts" setup>
import GlobalSearch from './GlobalSearch.vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;

  &-right {
    &__icon {
      font-size: 20px;
    }
  }

  &-alart {
    margin-bottom: 24px;
  }
}
</style>
