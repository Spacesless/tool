<template>
  <section class="banner">
    <h1 class="banner__title">
      {{ props.currentTool.name }}
    </h1>
    <p class="banner__description">
      {{ props.currentTool.description }}
    </p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  currentTool: {
    type: Object,
    default: () => {}
  }
})
</script>
