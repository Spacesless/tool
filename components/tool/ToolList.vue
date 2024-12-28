<template>
  <section class="card">
    <div v-if="!isSameList" class="card-header">
      <h2 class="card-header__title">
        {{ tool.meta?.title }}
      </h2>
      <span class="card-header__count">{{ tool.count || tool.children.length }}</span>
    </div>
    <el-row :gutter="24">
      <el-col
        v-for="({ path, name, meta }) in tool.children"
        :key="path"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <NuxtLink class="card-item" :to="getAbsolutePath(tool.path, path)">
          <strong class="card-item__title">{{ meta?.title }}</strong>
          <Icon
            v-if="!isSameList"
            class="card-item__icon"
            :name="calcFavorite(name) ? 'clarity:favorite-solid' : 'clarity:favorite-line'"
            @click.stop.prevent="toggleFavorite(name)"
          />
          <p class="card-item__description" :title="meta?.description">
            {{ meta?.description }}
          </p>
        </NuxtLink>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts" setup>
const { tool } = defineProps({
  tool: {
    type: Object,
    default: () => {}
  },
  isSameList: {
    type: Boolean,
    default: false
  }
})

const getAbsolutePath = (parentPath: string, path: string) : string => {
  return parentPath ? `${parentPath}/${path}` : path
}

const { calcFavorite, toggleFavorite } = useFavorite()
</script>

<style lang="scss" scoped>
@font-face {
  font-family: zcool;
  src: url('@/assets/font/zcool-happy.ttf');
}

.card {
  &-header {
    position: relative;
    padding: 24px 0 42px;

    &__title {
      position: relative;
      font-weight: 400;
      font-size: 30px;
      line-height: 1.5;

      &::after{
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 80px;
        height: 4px;
        background: linear-gradient(130deg,#24c6dc,var(--el-color-primary) 60%,#5433ff);
        border-radius: 96px;
        content: "";
      }
    }

    &__count {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      color: var(--el-color-info-light-8);
      font-weight: bold;
      font-size: 90px;
      font-family: zcool, sans-serif;
      background: linear-gradient(to bottom, var(--el-color-primary-light-5) 0%, var(--el-color-primary-light-9) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &-item {
    position: relative;
    display: block;
    height: 55px;
    margin-bottom: 24px;
    padding: 16px;
    text-decoration: none;
    background-color: var(--el-bg-color);
    border-radius: 10px;

    &__title {
      display: block;
      margin-bottom: 8px;
      padding-right: 24px;
      overflow: hidden;
      color: var(--el-text-color-primary);
      font-weight: normal;
      font-size: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 16px;
      color: var(--el-text-color-primary);
      font-size: 24px;

      &:hover {
        color: var(--el-color-primary);
      }
    }

    &__description {
      height: 20px;
      overflow: hidden;
      color: var(--el-text-color-regular);
      font-size: 16px;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:hover {
      box-shadow: var(--el-box-shadow);
    }

    &:hover &__title{
      color: var(--el-color-primary);
    }
  }
}
</style>
