<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-position="top">
        <el-form-item label="输入">
          <el-input-number v-model="form.input" :max="100000000000" style="width: 350px;" controls-position="right" @change="handleFormat" />
        </el-form-item>
        <el-form-item label="结果">
          <el-input v-model="form.output" type="textarea" readonly :rows="3" />
        </el-form-item>
      </el-form>
    </section>

    <template #content>
      <p>可以将人民币小写金额转换为大写金额，免得一个个查找对应的汉字。</p>
      <p>人民币金额用到的中文大写汉字如：零、壹、贰、叁、肆、伍、陆、柒、捌、玖、拾、佰、仟、万、亿</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import capitalizedAmount from 'xijs/src/capitalizedAmount'

definePageMeta({
  title: '数字金额转换',
  description: '数字金额转为大写，最大只支持到千亿。',
  updateTime: '2023-11-26'
})

const form = reactive({
  input: 666.66,
  output: ''
})

onBeforeMount(() => {
  handleFormat()
})

function handleFormat () {
  const { input } = form
  form.output = capitalizedAmount(input)
}
</script>
