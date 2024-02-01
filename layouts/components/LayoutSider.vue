<template>
  <aside class="sider" :class="{'sider--collapse': isCollapse, 'sider--loaded': isLoaded}">
    <div class="sider-logo">
      <svg
        class="sider-logo__img"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1523"
        width="128"
        height="128"
      >
        <path d="M837.585455 725.410909l-294.167273 140.753455v-398.708364l327.214545-154.298182v360.866909c0 21.597091-12.055273 40.587636-33.047272 51.386182z m-648.471273 0c-20.945455-10.798545-35.979636-29.789091-33.047273-51.479273V313.250909L279.272727 372.829091V502.690909c0 10.705455 5.957818 21.643636 18.013091 26.996364 0 0 23.924364 13.498182 26.949818 13.498182 9.029818 0 14.987636-5.352727 14.987637-13.498182V402.432l141.125818 67.770182v398.708363l-291.188364-143.45309z m297.285818-615.330909c8.052364-5.12 17.361455-7.912727 26.949818-8.098909 8.983273 0 18.059636 2.792727 26.996364 5.399273l297.239273 140.8c2.978909 2.653091 9.029818 5.399273 12.008727 8.145454l-336.244364 162.397091-336.197818-159.744c2.978909-2.653091 8.983273-5.399273 11.962182-8.145454l297.285818-140.70691z m381.207273 89.367273L570.321455 58.647273a139.869091 139.869091 0 0 0-114.036364 0L159.185455 202.100364C117.015273 221.090909 93.090909 259.025455 93.090909 302.312727v371.712c0 43.287273 26.996364 81.175273 66.094546 102.772364l297.146181 143.546182c17.966545 8.145455 39.005091 13.498182 57.018182 13.498182 21.038545 0 39.051636-5.352727 57.018182-13.498182l294.213818-140.8c41.984-21.643636 69.073455-59.578182 66.094546-102.912v-374.225455c2.978909-43.380364-20.992-81.221818-63.115637-102.958545z" :fill="colorMode.preference === 'dark' ? '#fff' : '#000'" p-id="1524" />
        <path d="M177.152 258.932364s-16.290909 14.475636-19.223273 22.202181c-5.166545 13.777455-1.815273 32.116364-1.815272 32.116364l324.18909 156.997818v398.661818s15.080727 10.007273 31.65091 10.007273c22.574545 0 31.418182-12.706909 31.418181-12.706909v-398.801454l327.261091-154.251637s6.888727-15.918545 1.163637-33.047273c-5.957818-17.687273-22.202182-23.738182-22.202182-23.738181l-336.244364 162.397091-336.197818-159.837091z" fill="#1677ff" p-id="1525" />
        <path d="M312.413091 550.865455h-3.165091A29.975273 29.975273 0 0 1 279.272727 520.890182V374.830545c0-16.616727 13.405091-30.021818 29.975273-30.021818h3.165091c16.570182 0 29.975273 13.405091 29.975273 30.021818v146.059637a29.975273 29.975273 0 0 1-29.975273 29.975273" fill="#1677ff" p-id="1526" />
      </svg>
      <p class="sider-logo__name">
        Toolbox
      </p>
    </div>

    <el-scrollbar class="sider-scrollbar">
      <el-menu
        class="sider-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :default-openeds="['category']"
        :collapse-transition="!isMobile"
        router
      >
        <el-menu-item index="/">
          <Icon class="sider-menu__icon" name="iconamoon:home-light" />
          <template #title>
            首页
          </template>
        </el-menu-item>
        <el-menu-item index="/favorite">
          <Icon class="sider-menu__icon" name="clarity:favorite-line" />
          <template #title>
            我的收藏
          </template>
        </el-menu-item>
        <el-menu-item v-for="item in toolList" :key="item.path" :index="'/' + item.path">
          <Icon class="sider-menu__icon" :name="item.icon" />
          <template #title>
            {{ item.name }}
          </template>
        </el-menu-item>
        <el-menu-item index="/about">
          <Icon class="sider-menu__icon" name="ph:info" />
          <template #title>
            关于
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>

    <div class="sider-collapse" @click="toggleCollapse">
      <Icon :name="isCollapse ? 'uiw:right' : 'uiw:left'" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ToolCategory } from '@/types/tool'

const route = useRoute()
const colorMode = useColorMode()
const toolList = useState('tools', (): ToolCategory => [])

const isCollapse = useState('collapse', () => false)
const isMobile = useState('isMobile', () => false)

const activeMenu = computed(() => {
  const fullPath = route.path
  return '/' + fullPath.replace('/', '').split('/').shift()
})
watch(() => route.name, () => {
  if (isMobile.value && !isCollapse.value) {
    isCollapse.value = true
  }
})

const isLoaded = ref(false)
onMounted(() => {
  isLoaded.value = true
})

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: Bega;
  font-display: swap;
  src: url('@/assets/font/Bega-Light.ttf');
}

.sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 208px;
  height: 100%;
  background-color: var(--el-bg-color);
  transition: width 0.3s, left 0.3s;

  &-logo {
    padding: 24px 0 12px;
    text-align: center;

    &__img {
      width: 64px;
      height: 64px;
      transition: all 0.3s;
    }

    &__name {
      height: 34px;
      overflow: hidden;
      font-weight: bold;
      font-size: 30px;
      font-family: Bega, sans-serif;
      transition: height 0.3s;
    }
  }

  &-scrollbar {
    height: calc(100% - 186px);
    transition: height 0.3s;
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
  }

  &-collapse {
    height: 44px;
    font-size: 18px;
    line-height: 44px;
    text-align: center;
    border-top: 1px solid var(--el-border-color-light);
    cursor: pointer;
  }

  @media (width > 768px) {
    &--collapse {
      width: 64px;

      .sider {
          &-logo {
          &__img {
            width: 48px;
            height: 48px;
          }

          &__name {
            height: 0;
          }
        }

        &-scrollbar {
          height: calc(100% - 125px);
        }
      }

      :deep(.el-sub-menu__title) {
        padding-right: var(--el-menu-base-level-padding);
      }
    }
  }

  @media (width <= 768px) {
    display: none;

    &--loaded {
      display: block;
    }

    &--collapse {
      left: -208px;
    }

    :deep(.el-menu-item) {
      transition: none;
    }
  }
}
</style>
