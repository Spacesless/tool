<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <p class="section-header">
          输入
        </p>
        <el-input v-model="input" clearable @change="handleConvert" />
      </div>

      <el-descriptions
        :column="1"
        border
      >
        <el-descriptions-item label="HEX">
          {{ result.hex || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="RGB">
          {{ result.rgb || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="OBJECT">
          {{ result.object || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="HSL">
          {{ result.hsl || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="CMYK">
          {{ result.cmyk || '' }}
        </el-descriptions-item>
      </el-descriptions>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import Color from 'color'

const input = ref('#66ccff')
const result = ref({
  hex: '',
  rgb: '',
  object: '',
  hsl: '',
  cmyk: ''
})

onBeforeMount(() => {
  handleConvert()
})

const handleConvert = () => {
  const color = Color(input.value)

  result.value = {
    hex: color.hexa(),
    rgb: color.rgb().toString(),
    object: JSON.stringify(color.object()),
    hsl: color.hsl().toString(),
    cmyk: color.cmyk().toString()
  }
}
</script>
