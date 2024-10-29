<template>
  <ToolLayout>
    <section class="section bing">
      <el-row v-loading="pending">
        <el-col
          v-for="(item, index) in imageList"
          :key="item.urlbase"
          :xs="24"
          :sm="12"
          :md="6"
          class="bing-list"
        >
          <el-image
            :src="item.thumb"
            :alt="item.title"
            :preview-src-list="previewSrcList"
            :initial-index="index"
            lazy
          />
          <div class="bing-list-text">
            <span class="bing-list__time">
              {{ item.time }}
            </span>
            <span class="bing-list__description">
              {{ item.title }}
            </span>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        v-model:current-page="params.page"
        class="pagination"
        :page-size="params.pageSize"
        :background="true"
        :layout="layout"
        :total="total"
      />
    </section>

    <template #content>
      <p>定时任务每日采集 https://cn.bing.com/HPImageArchive.aspx 的数据存于MongoDB，提供Api接口调用。</p>
      <p>Api接口请查看 <a href="https://api.timelessq.com" target="_blank" rel="noopener noreferrer">https://api.timelessq.com/</a></p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '必应图片',
  description: '自2018年到现在的必应每日图片。'
})

type ImageList = Array<{
  url: string;
  urlbase: string;
  time: string;
  title: string;
  copyright: string;
  thumb?: string;
}>

const params = ref({
  page: 1,
  pageSize: 12
})
const total = ref(0)
const { pending, data }: {
  pending: Ref<boolean>;
  data: Ref<{
    data: {
      count: number;
      data: ImageList
    }
  }>
} = await useFetch('https://api.timelessq.com/bing/list', {
  params: params.value,
  lazy: true,
  server: false,
  immediate: true
})
const imageList = ref<ImageList>([])

const previewSrcList = computed(() => {
  return imageList.value.map(item => item.url)
})
watch(() => data, (res) => {
  const { count, data } = res.value.data
  total.value = count
  imageList.value = data.map((item) => {
    return {
      ...item,
      thumb: `https://cn.bing.com${item.urlbase}_400x240.jpg`
    }
  })
}, {
  deep: true
})

const isMobile = useState('isMobile', () => false)
const layout = computed(() => isMobile.value ? 'total, ->,  prev, next, jumper' : 'total, ->, prev, pager, next, jumper')
</script>

<style lang="scss" scoped>
.bing {
  :deep(.el-image) {
    display: block;
    height: 100%;
  }

  &-list {
    position: relative;
    min-height: 200px;

    &-text {
      position: absolute;
      bottom: 4px;
      left: 6px;
      color: #ffffff;
      font-size: 12px;

      span {
        display: inline-block;
        text-shadow: 0 0 4px #000000;
      }
    }

    &__time{
      margin-right: 6px;
    }
  }
}
</style>
