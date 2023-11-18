<template>
  <section class="banner">
    <h1 class="banner__title">
      {{ props.toolData.name }}
    </h1>
    <p class="banner__description">
      {{ props.toolData.description }}
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
</script>
