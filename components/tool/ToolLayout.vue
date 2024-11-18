<template>
  <section v-if="isIframe" class="container">
    <slot />
  </section>

  <template v-else>
    <ToolBanner />

    <slot />

    <section class="section content">
      <h2 class="section__title">
        工具简介
      </h2>

      <el-space class="content-tool" :size="20">
        <el-tooltip effect="dark" content="点赞" placement="bottom">
          <a href="#thumbsup">
            <Icon class="content-tool__icon" name="octicon:thumbsup-24" />
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" content="投币" placement="bottom">
          <Icon class="content-tool__icon" name="hugeicons:coins-yen" @click="dialogVisible = true" />
        </el-tooltip>
        <el-tooltip effect="dark" content="收藏" placement="bottom">
          <Icon class="content-tool__icon" :name="isFavorite ? 'clarity:favorite-solid' : 'clarity:favorite-line'" @click="toggleFavorite(routeName)" />
        </el-tooltip>
      </el-space>

      <slot name="content">
        <p>很抱歉，你要找的简介内容因为站长太懒，没有写~</p>
      </slot>

      <div class="content-footer">
        <p>版本：{{ route.meta?.version || 'v1.0.0' }}</p>
        <p>更新时间：{{ route.meta?.updateTime || '2023-11-19' }}</p>
      </div>
    </section>

    <section v-if="sameList.children.length" class="section">
      <h2 class="section__title">
        相关工具
      </h2>

      <ToolList :tool="sameList" :is-same-list="true" />
    </section>

    <ClientOnly>
      <WalineComment />
    </ClientOnly>

    <el-dialog
      v-model="dialogVisible"
      title="请我喝[茶]~(￣▽￣)~*"
      width="660"
      :align-center="true"
    >
      <div style="display: flex;justify-content: space-between;">
        <img width="300px" style="margin-right: 28px;" src="@/assets/image/alipay.png" alt="alipay">
        <img width="300px" src="@/assets/image/wechat.png" alt="wechat">
      </div>
    </el-dialog>
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routes = router.getRoutes()
const colorMode = useColorMode()

const dialogVisible = ref(false)

const { calcFavorite, toggleFavorite } = useFavorite()
const isFavorite = computed(() => calcFavorite(routeName.value))
const routeName = computed(() => route.name as string)

useSeoMeta({
  title: route.meta.title || '',
  description: route.meta.description?.replace('\n', '')
})

const isIframe = ref(false)

const sameList = computed(() => {
  return {
    children: routes.filter(item => route.meta.same?.includes(item.name as string))
  }
})

onMounted(() => {
  const { iframe, theme } = route.query || {}

  if (iframe) {
    setPageLayout(false)
    isIframe.value = true
  } else {
    setPageLayout('default')
  }

  colorMode.preference = theme === 'dark' ? 'dark' : 'light'
})
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}

.content-tool {
  margin-bottom: 10px;
  font-size: 28px;

  a {
    margin: 0;
    line-height: 24px
  }

  &__icon{
    color: var(--el-text-color-regular);
    outline: none;
    cursor: pointer;

    &:hover{
      color: var(--el-color-primary);
    }
  }
}

:deep(.card-item) {
  margin-top: 12px;
  margin-bottom: 0;
  background-color: var(--el-color-primary-light-9);
}

:deep(.card-header) {
  padding-top: 0;
}

:deep(.card-header__count) {
  top: -16px;
}
</style>
