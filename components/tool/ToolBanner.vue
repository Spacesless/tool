<template>
  <section class="banner">
    <h1 class="banner__title">
      {{ route.meta?.title }}
    </h1>
    <p v-for="(item, index) in descriptions" :key="index" class="banner__description">
      {{ item }}
    </p>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()

const descriptions = computed(() => {
  return route.meta.description?.split('\n') || []
})
</script>
