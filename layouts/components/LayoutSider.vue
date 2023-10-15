<template>
  <aside class="sider" :class="{'sider--collapse': isCollapse}">
    <div class="sider-logo">
      <img class="sider-logo__img" src="@/assets/image/logo.png" alt="logo">
      <span class="sider-logo__name">Tiny Tool</span>
    </div>

    <el-scrollbar class="sider-scrollbar">
      <el-menu
        class="sider-menu"
        :collapse="isCollapse"
        :default-openeds="['category']"
      >
        <el-menu-item index="home">
          <NuxtLink class="sider-menu-link" to="/">
            <Icon class="sider-menu__icon" name="iconamoon:home-light" />
            <span class="sider-menu__name">首页</span>
          </NuxtLink>
        </el-menu-item>
        <el-sub-menu index="category">
          <template #title>
            <Icon class="sider-menu__icon" name="iconamoon:box-light" />
            <span class="sider-menu__name">类别</span>
          </template>
          <el-menu-item v-for="item in toolList" :key="item.path">
            <NuxtLink class="sider-menu-link" :to="item.path">
              {{ item.name }}
            </NuxtLink>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="favorite">
          <NuxtLink class="sider-menu-link" to="/favorite">
            <Icon class="sider-menu__icon" name="clarity:favorite-line" />
            <span class="sider-menu__name">收藏</span>
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="about">
          <NuxtLink class="sider-menu-link" to="/about">
            <Icon class="sider-menu__icon" name="ph:info" />
            <span class="sider-menu__name">关于</span>
          </NuxtLink>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>

    <div class="sider-collapse" @click="toggleCollapse">
      <Icon :name="isCollapse ? 'solar:alt-arrow-right-broken' : 'solar:alt-arrow-left-broken'" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import tools from '@/assets/json/tools.json'

const isCollapse = useState('collapse', () => false)

const toolList = ref(tools)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 208px;
  height: 100%;
  background-color: #ffffff;
  transition: width .3s;

  &-logo {
    height: 60px;
    line-height: 60px;
    text-align: center;

    &__img {
      width: 40px;
      vertical-align: middle;
    }

    &__name {
      display: inline-block;
      margin-left: 12px;
      font-size: 26px;
      font-family: -apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
      font-style: italic;
      vertical-align: middle;
    }
  }

  &-scrollbar {
    height: calc(100% - 105px);
  }

  &-menu {
    height: 100%;
    border-right: none;

    &__icon {
      width: 24px;
      margin-right: 5px;
      font-size: 20px;
      text-align: center;
      vertical-align: middle;
    }

    &-link {
      display: block;
      width: 100%;
      color: var(--el-menu-text-color);
      text-decoration: none;

      &.router-link-active {
        color: var(--el-menu-active-color);
      }
    }
  }

  &-collapse {
    height: 44px;
    font-size: 18px;
    line-height: 44px;
    text-align: center;
    border-top: 1px solid var(--el-border-color-light);
    cursor: pointer;
  }

  &--collapse {
    width: 64px;

    .sider-menu {
      &__name {
        display: none;
      }

      &__icon {
        margin-right: 0;
      }
    }

    :deep(.el-sub-menu__title) {
      padding-right: var(--el-menu-base-level-padding);
    }
  }
}
</style>
