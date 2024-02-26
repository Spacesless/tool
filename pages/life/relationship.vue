<template>
  <ToolLayout>
    <section class="section">
      <div class="section-header">
        <el-radio-group v-model="form.inputType" @change="handleClear">
          <el-radio-button label="default">
            关系找称呼
          </el-radio-button>
          <el-radio-button label="chain">
            称呼找关系
          </el-radio-button>
          <el-radio-button label="default1">
            两者间的称呼
          </el-radio-button>
          <el-radio-button label="pair">
            两者的合称
          </el-radio-button>
        </el-radio-group>
      </div>
      <el-form :model="form">
        <template v-if="form.inputType === 'default'">
          <el-form-item label="区域模式">
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
          <el-form-item label="我的性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">
                男
              </el-radio>
              <el-radio :label="0">
                女
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="称呼方式">
            <el-radio-group v-model="form.reverse">
              <el-radio :label="false">
                我称呼对方
              </el-radio>
              <el-radio :label="true">
                对方称呼我
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.input" type="textarea" placeholder="称呼之间用“的”字分开" :rows="6" />
          </el-form-item>
        </template>
        <template v-else-if="form.inputType === 'chain'">
          <el-form-item>
            <el-alert title="七舅姥爷和我什么关系？侄子和外甥的区别在哪里？" type="success" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.input" placeholder="输入要查询的称呼" />
          </el-form-item>
        </template>
        <template v-else-if="form.inputType === 'default1'">
          <el-form-item>
            <el-alert title="外舅公是我妈的谁？我爸应该叫舅老爷什么？" type="success" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.input" placeholder="输入要查询的称呼" />
          </el-form-item>
          <el-form-item label="称呼方式">
            <el-radio-group v-model="form.reverse">
              <el-radio :label="false">
                前者称呼后者
              </el-radio>
              <el-radio :label="true">
                后者称呼前者
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最短关系">
            <el-radio-group v-model="form.optimal">
              <el-radio :label="false">
                否
              </el-radio>
              <el-radio :label="true">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.target" placeholder="输入要查询的称呼" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item>
            <el-alert title="奶奶和外婆之间什么关系？舅公和爷爷是什么关系？" type="success" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.input" placeholder="输入要查询的称呼" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.target" placeholder="输入另一个要查询的称呼" />
          </el-form-item>
          <el-form-item label="最短关系">
            <el-radio-group v-model="form.optimal">
              <el-radio :label="false">
                否
              </el-radio>
              <el-radio :label="true">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="danger" @click="handleClear">
            清空
          </el-button>
          <el-button v-if="form.inputType === 'default'" type="warning" @click="handleRevoke">
            回退
          </el-button>
          <el-button type="primary" @click="handleCalc">
            计算
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.output" type="textarea" readonly :rows="6" />
        </el-form-item>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import relationship, { Options } from 'relationship.js'

interface FormData extends Options {
  inputType: string;
  input: string;
  output: string;
  target: string;
}

const form = reactive<FormData>({
  inputType: 'default',
  mode: 'default',
  sex: 1,
  input: '',
  target: '',
  output: '',
  optimal: true,
  reverse: false
})

watch(() => form.input, (input) => {
  if (!input) {
    form.output = ''
  }
})
function handleClear () {
  form.input = ''
  form.target = ''
}

function handleRevoke () {
  const textToArray = form.input.split('的')
  textToArray.pop()
  form.input = textToArray.join('的')
}

function handleCalc () {
  const { inputType, input, target, sex, optimal, reverse, mode } = form

  let options = {}
  if (inputType === 'default') {
    options = {
      text: input, // 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
      sex, // 本人性别：0表示女性,1表示男性
      reverse, // 称呼方式：true对方称呼我,false我称呼对方
      mode // 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
    }
  } else if (inputType === 'chain') {
    options = {
      text: input,
      type: 'chain'
    }
  } else if (inputType === 'default1') {
    let person1 = target
    let person2 = input
    if (reverse) {
      person1 = input
      person2 = target
    }
    options = {
      text: person1,
      target: person2,
      optimal
    }
  } else {
    options = {
      text: input,
      target,
      type: 'pair',
      optimal
    }
  }

  const output = relationship(options)

  form.output = output.join('\n') || '够复杂的啊~快去问问度娘'
}
</script>
