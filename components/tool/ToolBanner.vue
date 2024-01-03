<template>
  <section class="banner">
    <h1 class="banner__title">
      {{ props.toolData.name }}
    </h1>
    <p v-for="(item, index) in descriptions" :key="index" class="banner__description">
      {{ item }}
    </p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  toolData: {
    type: Object,
    default: () => {}
  }
})

const descriptions = computed(() => {
  return props.toolData.description.split('\n')
})
</script>
