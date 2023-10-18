<template>
  <h2 class="card__title">
    {{ tool.name }}
  </h2>
  <el-row :gutter="24">
    <el-col
      v-for="item in tool.children"
      :key="item.path"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <NuxtLink class="card" :to="getAbsolutePath(tool.path, item.path)">
        <img class="card__icon" src="/image/cbbcd90fe4086a24.png" alt="文本工具">
        <div class="card-info">
          <strong class="card-info__title">{{ item.name }}</strong>
          <p class="card-info__description">
            {{ item.description }}
          </p>
        </div>
      </NuxtLink>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { CategoryItem } from '@/interfaces/tool'

interface Props {
  tool: CategoryItem
}

const { tool } = withDefaults(defineProps<Props>(), {
  tool: () => ({
    name: '',
    path: '',
    description: '',
    children: []
  })
})

const getAbsolutePath = (parentPath: string, path: string) : string => {
  return `/${parentPath}/${path}`
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  height: 75px;
  margin-bottom: 24px;
  padding: 16px;
  text-decoration: none;
  background-color: var(--el-bg-color);
  border-radius: 10px;

  &__title {
    position: relative;
    padding: 32px 0;
    font-weight: 400;
    font-size: 30px;
    line-height: 1.5;

    &::after{
      position: absolute;
      bottom: 24px;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(130deg,#24c6dc,var(--el-color-primary) 60%,#5433ff);
      border-radius: 96px;
      content: "";
    }
  }

  &__icon {
    margin-right: 16px;
  }

  &-info {
    &__title {
      display: block;
      margin-bottom: 8px;
      color: var(--el-text-color-primary);
      font-weight: normal;
      font-size: 20px;
    }

    &__description {
      display: -webkit-box;
      height: 40px;
      overflow: hidden;
      color: var(--el-text-color-regular);
      font-size: 14px;
      line-height: 20px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
