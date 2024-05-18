<template>
  <el-upload
    class="upload"
    action=""
    :auto-upload="false"
    :accept="accept"
    :drag="drag"
    :multiple="multiple"
    :file-list="fileList"
    :list-type="!isPictureCard ? 'text' : 'picture-card'"
    :show-file-list="isPictureCard"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :before-upload="beforeUpload"
  >
    <template v-if="!isPictureCard">
      <template v-if="drag">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          把文件拖到这或者 <em>点击上传</em>
        </div>
      </template>
      <el-button v-else type="primary">
        上传文件
      </el-button>
    </template>
    <el-icon v-else>
      <Plus />
    </el-icon>
  </el-upload>
  <el-image-viewer v-if="previewShow" :url-list="previewSrcList" @close="closeImageViewer" />
</template>

<script lang="ts" setup>
import { UploadFilled, Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile } from 'element-plus'

const props = defineProps({
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
  },
  listType: {
    type: String,
    default: 'text'
  },
  limitSize: {
    type: Number,
    default: 100
  }
})
const emit = defineEmits(['changeFile'])

const fileList = ref([])

const isPictureCard = computed(() => props.listType === 'picture-card')

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  emit('changeFile', { uploadFile, uploadFiles })
  fileList.value = []
}

const previewShow = ref(false)
const previewSrcList = ref<string[]>([])
const handlePreview = (uploadFile: UploadFile) => {
  previewShow.value = true
  previewSrcList.value = [uploadFile.url || '']
  document.body.classList.add('el-popup-parent--hidden')
}
const closeImageViewer = () => {
  previewShow.value = false
  document.body.classList.remove('el-popup-parent--hidden')
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > props.limitSize) {
    ElMessage.error(`为了你的浏览器着想，请不要上传超过${props.limitSize}MB的文件!`)
    return false
  }
  return true
}
</script>

<style>
.upload {
  height: inherit;
}

.el-upload.is-drag {
  height: 100%;
}

.el-upload-dragger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
}
</style>
