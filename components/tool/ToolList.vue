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
      <NuxtLink class="card-item" :to="getAbsolutePath(tool.path, item.path)">
        <strong class="card-item__title">{{ item.name }}</strong>
        <p class="card-item__description" :title="item.description">
          {{ item.description }}
        </p>
      </NuxtLink>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { CategoryItem } from '@/types/tool'

interface Props {
  tool: CategoryItem
}

const { tool } = withDefaults(defineProps<Props>(), {
  tool: () => ({
    name: '',
    path: '',
    icon: '',
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
  &__title {
    position: relative;
    padding: 16px 0 32px;
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

  &-item {
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
      color: var(--el-text-color-primary);
      font-weight: normal;
      font-size: 20px;
    }

    &__description {
      height: 20px;
      overflow: hidden;
      color: var(--el-text-color-regular);
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
