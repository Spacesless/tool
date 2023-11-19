<template>
  <h2 class="card__title">
    {{ tool.name }}
  </h2>
  <el-row :gutter="24">
    <el-col
      v-for="({ path, name, id, description }) in tool.children"
      :key="path"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <NuxtLink class="card-item" :to="getAbsolutePath(tool.path, path)">
        <strong class="card-item__title">{{ name }}</strong>
        <Icon
          class="card-item__icon"
          :name="calcFavorite(id) ? 'clarity:favorite-solid' : 'clarity:favorite-line'"
          @click.stop.prevent="toggleFavorite(id)"
        />
        <p class="card-item__description" :title="description">
          {{ description }}
        </p>
      </NuxtLink>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const { tool } = defineProps({
  tool: {
    type: Object,
    default: () => {}
  }
})

const getAbsolutePath = (parentPath: string, path: string) : string => {
  return parentPath ? `/${parentPath}/${path}` : path
}

const favoriteTools = useState('favoriteTools', (): string[] => [])
const calcFavorite = (id: string) => {
  return favoriteTools.value.includes(id)
}
const toggleFavorite = (id: string) => {
  const isFavorite = calcFavorite(id)
  if (isFavorite) {
    const findIndex = favoriteTools.value.findIndex(item => item === id)
    favoriteTools.value.splice(findIndex, 1)
  } else {
    favoriteTools.value.push(id)
  }

  localStorage.setItem('favoriteTools', favoriteTools.value.toString())
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
      font-size: 20px;
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
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
