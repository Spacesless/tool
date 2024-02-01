<template>
  <code-mirror v-model="value" basic :dark="dark" :lang="props.lang" />
</template>

<script setup lang="ts">
// npm i vue-codemirror6 codemirror

const value = ref()

const colorMode = useColorMode()
const dark = computed(() => (colorMode.value === 'dark'))

const props = defineProps({
  lang: {
    type: String,
    default: ''
  }
})
</script>
