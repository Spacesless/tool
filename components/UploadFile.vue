<template>
  <el-upload
    action=""
    :auto-upload="false"
    :accept="accept"
    :drag="drag"
    :multiple="multiple"
    :show-file-list="false"
    :on-change="handleChange"
  >
    <template v-if="drag">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </template>
    <el-button v-else type="primary">
      上传文件
    </el-button>
  </el-upload>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const { accept, drag, multiple } = defineProps({
  accept: {
    type: String,
    default: ''
  },
  drag: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['changeFile'])

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  emit('changeFile', { uploadFile, uploadFiles })
}
</script>
