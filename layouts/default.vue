<template>
  <LayoutSider />
  <section class="container" :class="{'container--collapse': isCollapse}">
    <LayoutHeader />
    <slot />
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
.container {
  margin-left: 208px;
  padding: 0 24px;
  transition: margin-left 0.3s;

  &--collapse {
    margin-left: 64px;
  }
}
</style>
