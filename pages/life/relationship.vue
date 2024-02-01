<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form">
        <el-form-item label="区域">
          <el-radio-group v-model="model">
            <el-radio label="default">
              默认
            </el-radio>
            <el-radio label="label">
              北方
            </el-radio>
            <el-radio label="label1">
              南方
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="model">
            <el-radio label="1">
              男
            </el-radio>
            <el-radio label="0">
              女
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关系">
          <el-radio-group v-model="model">
            <el-radio label="label" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输入">
          <el-input v-model="input" type="textarea" placeholder="称呼之间用“的”字分开" :rows="6" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleClear">
            清空
          </el-button>
          <el-button type="warning" @click="handleRevoke">
            回退
          </el-button>
          <el-button type="primary" @click="handleCalc">
            计算
          </el-button>
        </el-form-item>
        <el-form-item label="label">
          <el-input v-model="model" type="textarea" readonly :rows="6" />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import relationship from 'relationship.js'

const input = ref('')
const model = ref()
const form = reactive({
  input: '',
  output: ''
})

function handleClear () {
  form.input = ''
}

function handleRevoke () {
  const textToArray = form.input.split('的')
  textToArray.pop()
  form.input = textToArray.join('的')
}

function handleCalc () {
  form.output = relationship({
    text: input.value, // 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
    target: '', // 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
    sex: 1, // 本人性别：0表示女性,1表示男性
    type: 'default', // 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
    reverse: false, // 称呼方式：true对方称呼我,false我称呼对方
    mode: 'default', // 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
    optimal: false // 最短关系：计算两者之间的最短关系
  })

  // 够复杂的啊~快去问问
}
</script>
