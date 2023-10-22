<template>
  <div />
</template>

<script setup lang="ts">
import postalcodes from '@/assets/json/postalcode.json'

const keyword = ref('')

function handleSearch () {
  return postalcodes.filter(item => item.province.includes(keyword.value) || item.city.includes(keyword.value) || item.area.includes(keyword.value))
}
</script>
