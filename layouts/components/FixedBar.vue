<template>
  <div class="fixbar">
    <el-tooltip effect="dark" content="点我坐电梯" placement="left" :disabled="backTopTips">
      <transition name="fade-transform">
        <div v-show="backTopShow" class="fixbar-item fixbar-item-back" @click="backTop">
          <span class="fixbar-item-back__percent">{{ scrollPercent }}%</span>
          <Icon class="fixbar-item-back__icon" name="tdesign:backtop" />
        </div>
      </transition>
    </el-tooltip>
  </div>
</template>

<script>
import { getPosition, scrollTo } from '@/utils/scroll-to'

const REFERENCE = 100

export default {
  name: 'FixedBar',
  data () {
    return {
      backTopShow: false,
      backTopTips: false,
      scrollTop: 0,
      scrollPercent: 0
    }
  },
  watch: {
    scrollTop () {
      this.backTopShow = this.scrollTop > REFERENCE

      const screenHeight = window.innerHeight
      const windowHeight = document.body.clientHeight || document.documentElement.clientHeight
      const percent = Math.ceil(this.scrollTop / (windowHeight - screenHeight) * 100)
      this.scrollPercent = percent > 100 ? 100 : percent
    }
  },
  mounted () {
    this.scrollTop = getPosition()
    window.addEventListener('scroll', () => {
      this.scrollTop = getPosition()
    })
  },
  methods: {
    backTop () {
      this.backTopTips = true
      scrollTo(0, 800, undefined, () => {
        this.backTopTips = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fixbar {
  position: fixed;
  right: 12px;
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
