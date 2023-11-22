<template>
  <ToolLayout>
    <el-row class="section" tag="section" :gutter="16">
      <el-col :sm="24" :md="12">
        <el-form :model="form" label-width="80px">
          <el-form-item label="类型">
            <el-radio-group v-model="form.type">
              <el-radio-button label="uuid">
                UUID
              </el-radio-button>
              <el-radio-button label="nanoid">
                NANOID
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="版本">
            <el-radio-group v-model="form.version">
              <el-radio-button v-for="item in versionOptions" :key="item" :label="item">
                {{ item }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <template v-if="hasNamespace">
            <el-form-item label="名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="命名空间">
              <el-input v-model="form.namespace" />
            </el-form-item>
          </template>
          <el-form-item v-if="hasCount" label="数量">
            <el-input-number v-model="form.count" :min="1" :max="1024" controls-position="right" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="section-header">
          <copy-button :text="result" />
        </div>
        <el-input v-model="result" type="textarea" readonly :rows="10" />
      </el-col>
    </el-row>
  </ToolLayout>
</template>

<script setup lang="ts">
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import { nanoid } from 'nanoid'

const form = reactive({
  type: 'uuid',
  name: 'timeless',
  namespace: '1b671a64-40d5-491e-99b0-da01ff1f3341',
  version: 'v4',
  count: 5
})
const versionOptions = reactive(['v1', 'v3', 'v4', 'v5'])
const result = ref('')

const hasNamespace = computed(() => {
  const { type, version } = form
  return type === 'uuid' && (version === 'v3' || version === 'v5')
})
const hasCount = computed(() => {
  const { type, version } = form
  return (type === 'uuid' && (version === 'v1' || version === 'v4')) || type === 'nanoid'
})
watch(() => form, () => {
  const temp = []
  const count = hasCount.value ? form.count : 1
  for (let i = 0; i < count; i++) {
    temp.push(handleGenerator())
  }
  result.value = temp.join('\n')
}, {
  deep: true,
  immediate: true
})

function handleGenerator () {
  const { type, version, name, namespace } = form
  if (type === 'uuid') {
    switch (version) {
      case 'v1':
        return uuidv1()
      case 'v3':
        return uuidv3(name, namespace)
      case 'v4':
        return uuidv4()
      case 'v5':
        return uuidv5(name, namespace)
    }
  } else {
    return nanoid()
  }
}
</script>
