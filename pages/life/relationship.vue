<template>
  <ToolLayout>
    <section class="section">
      <el-radio-group v-model="form.type">
        <el-radio-button label="default">
          关系找称呼
        </el-radio-button>
        <el-radio-button label="chain1">
          称呼找关系
        </el-radio-button>
        <el-radio-button label="chain2">
          两者间的称呼
        </el-radio-button>
        <el-radio-button label="pair">
          两者的合称
        </el-radio-button>
      </el-radio-group>
      <el-form :model="form">
        <el-form-item label="区域">
          <el-radio-group v-model="form.mode">
            <el-radio label="default">
              默认
            </el-radio>
            <el-radio label="northern">
              北方
            </el-radio>
            <el-radio label="guangdong">
              粤语
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">
              男
            </el-radio>
            <el-radio :label="0">
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
          <el-input v-model="form.input" type="textarea" placeholder="称呼之间用“的”字分开" :rows="6" />
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
          <el-input v-model="form.output" type="textarea" readonly :rows="6" />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import relationship from 'relationship.js'

const form = reactive({
  type: 'default',
  sex: 1,
  input: '',
  target: '',
  output: '',
  optimal: false,
  reverse: false
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
  const { type, sex, input, target, optimal, reverse } = form

  const targetType = type.replace(/\d/g, '')

  const output = relationship({
    text: input, // 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
    target, // 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
    sex, // 本人性别：0表示女性,1表示男性
    type: targetType, // 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
    reverse, // 称呼方式：true对方称呼我,false我称呼对方
    mode, // 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
    optimal // 最短关系：计算两者之间的最短关系
  })

  form.output = output || '够复杂的啊~快去问问度娘'
}
</script>