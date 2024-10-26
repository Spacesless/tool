<template>
  <LayoutSider />
  <section class="container" :class="{'container--collapse': isCollapse}">
    <div v-if="!isCollapse" class="container-mask" :class="{'container-mask--loaded': isLoaded}" @click="hideMask" />
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <FixedBar />
    <LayoutFooter />
    <div class="spotlight" />
  </section>
</template>

<script lang="ts" setup>
import LayoutSider from './components/LayoutSider.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import FixedBar from './components/FixedBar.vue'

const isCollapse = useState('collapse', () => false)
const isMobile = useState('isMobile', () => false)

const isLoaded = ref(false)
onMounted(() => {
  isLoaded.value = true
  onResize()

  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
watch(() => isCollapse.value, (collapse) => {
  if (isMobile.value) {
    if (collapse) {
      document.body.classList.remove('el-popup-parent--hidden')
    } else {
      document.body.classList.add('el-popup-parent--hidden')
    }
  }
})

function onResize () {
  const rect = document.body.getBoundingClientRect()

  isMobile.value = isCollapse.value = rect.width <= 768
}

function hideMask () {
  isCollapse.value = true
}
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 105px);
  padding-right: 32px;

  @media (width <= 768px) {
    padding-right: 0;
  }
}

.container {
  margin-left: 178px;
  padding: 0 32px;
  transition: margin-left 0.3s;

  @media (width > 768px) {
    &--collapse {
      margin-left: 64px;
    }

    &-mask {
      display: none;
    }
  }

  @media (width <= 768px) {
    margin-left: 0;
    padding: 60px 20px 0;

    &-mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 8;
      display: none;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.45);

      &--loaded {
        display: block;
      }
    }
  }
}

.spotlight {
  position: fixed;
  right: 0;
  bottom: -30vh;
  left: 0;
  z-index: -1;
  height: 40vh;
  background: linear-gradient(45deg,#00dc82,#69b1ff 50%,#1677ff);
  opacity: 0.45;
  filter: blur(20vh);
}
</style>
