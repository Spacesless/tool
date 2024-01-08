<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :md="12">
          <Vue3ColorPicker v-model="picker" mode="solid" class="color-picker" :theme="theme" />
        </el-col>
        <el-col :md="12">
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
        </el-col>
      </el-row>
      <div v-if="!imageUrl" class="color-image">
        <UploadFile :drag="true" @change-file="onFileChange" />
      </div>
      <div v-else class="color-image__wrapper">
        <el-image class="color-image" fit="contain" :src="imageUrl" />
        <el-button class="color-image-close" :icon="Close" circle @click="handleClear" />
      </div>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import Color from 'color'
import { Close } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const colorMode = useColorMode()
const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light')

const picker = ref('#1677ff')
const result = ref({
  hex: '',
  rgb: '',
  object: '',
  hsl: '',
  cmyk: ''
})

watch(() => picker.value, () => {
  handleConvert()
}, {
  immediate: true
})

function handleConvert () {
  const color = Color(picker.value)

  result.value = {
    hex: color.hexa(),
    rgb: color.rgb().toString(),
    object: JSON.stringify(color.object()),
    hsl: color.hsl().toString(),
    cmyk: color.cmyk().toString()
  }
}

const imageUrl = ref('')
const onFileChange = ({ uploadFile }: { uploadFile: UploadFile }) => {
  if (uploadFile.raw) {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
  }
}
const handleClear = () => {
  imageUrl.value = ''
}
</script>

<style lang="scss" scoped>
.color {
  &-picker {
    margin: 16px auto;
  }

  &-image {
    width: 100%;
    height: 500px;
    margin-top: 16px;

    &__wrapper {
      position: relative;
    }

    &-close {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
