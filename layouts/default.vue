<template>
  <LayoutSider />
  <section class="container" :class="{'container--collapse': isCollapse}">
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
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 105px);
}

.container {
  margin-left: 208px;
  padding: 0 32px;
  transition: margin-left 0.3s;

  &--collapse {
    margin-left: 64px;
  }
}
</style>
