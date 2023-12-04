<template>
  <LayoutSider />
  <section class="container" :class="{'container--collapse': isCollapse}">
    <div v-if="!isCollapse" class="container-mask" @click="hideMask" />
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <FixedBar />
    <LayoutFooter />
  </section>
</template>

<script lang="ts" setup>
import LayoutSider from './components/LayoutSider.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import FixedBar from './components/FixedBar.vue'

const isCollapse = useState('collapse', () => false)
const isMobile = useState('isMobile', () => false)

onMounted(() => {
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
}

.container {
  margin-left: 208px;
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
    padding: 70px 20px 0;

    &-mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 8;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.45);
    }
  }
}
</style>
