<template>
  <div class="fixbar">
    <el-tooltip effect="dark" content="分享" placement="left">
      <div class="fixbar-item" @click="handleCopy">
        <Icon class="fixbar-item__icon" name="clarity:share-line" />
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="点我坐电梯" placement="left" :disabled="backTopTips">
      <transition name="fade-transform">
        <div v-show="backTopShow" class="fixbar-item fixbar-item-back" @click="backTop">
          <span class="fixbar-item-back__percent">{{ scrollPercent }}%</span>
          <Icon class="fixbar-item__icon fixbar-item-back__icon" name="radix-icons:pin-top" />
        </div>
      </transition>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { getPosition, scrollTo } from '@/utils/scroll-to'

const REFERENCE = 100

const backTopShow = ref(false)
const backTopTips = ref(false)
const scrollTop = ref(0)
const scrollPercent = ref(0)

watch(scrollTop, () => {
  backTopShow.value = scrollTop.value > REFERENCE

  const screenHeight = window.innerHeight
  const windowHeight = document.body.clientHeight || document.documentElement.clientHeight
  const percent = Math.ceil(scrollTop.value / (windowHeight - screenHeight) * 100)
  scrollPercent.value = percent > 100 ? 100 : percent
})

onMounted(() => {
  scrollTop.value = getPosition()

  document.addEventListener('scroll', () => {
    scrollTop.value = getPosition()
  })
})

const backTop = () => {
  backTopTips.value = true
  scrollTo(0, 800, undefined, () => {
    backTopTips.value = false
  })
}

const { copied, copy } = useClipboard({ legacy: true })
const handleCopy = async () => {
  await copy(`${location.href}，${document.title}`)

  if (copied) {
    ElNotification({
      title: '复制成功',
      message: '快拿这个工具去祸祸别人吧',
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>
.fixbar {
  position: fixed;
  right: 10px;
  bottom: 24px;
  z-index: 998;

  @media (width <= 768px) {
    display: none;
  }

  &-item {
    width: 42px;
    height: 42px;
    margin-top: 16px;
    color: var(--el-text-color-regular);
    font-size: 20px;
    line-height: 42px;
    text-align: center;
    background-color: var(--el-bg-color);
    border-radius: 50%;
    outline: none;
    box-shadow: var(--el-box-shadow-light);
    cursor: pointer;
    user-select: none;

    &__icon{
      font-size: 20px;
      vertical-align: -0.1em;
    }

    &:hover {
      color: var(--color-primary);
    }

    &--active {
      color: var(--el-color-primary);
    }

    &-back {
      &__percent {
        font-size: 14px;
        vertical-align: bottom;
      }

      &__icon {
        display: none;
      }

      &:hover & {
        &__percent {
          display: none;
        }

        &__icon {
          display: inline-block;
        }
      }
    }
  }
}
</style>
