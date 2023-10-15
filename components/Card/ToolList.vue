<template>
  <h2 class="card__title">
    {{ categoryName }}
  </h2>
  <el-row :gutter="24">
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <NuxtLink class="card">
        <img class="card__icon" src="/image/cbbcd90fe4086a24.png" alt="文本工具">
        <div class="card-info">
          <strong class="card-info__title">文本工具</strong>
          <p class="card-info__description">
            在线中文简体一键转繁体工具。纯浏览器实现不上传服务器
          </p>
        </div>
      </NuxtLink>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
interface Props {
  categoryName: string
  toolList: []
}

const props = withDefaults(defineProps<Props>(), {
  categoryName: '',
  toolList: () => []
})

console.log(props)
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  height: 75px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--el-color-white);
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
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }
}
</style>
