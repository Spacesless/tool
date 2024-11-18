<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :md="12">
          <el-form :model="formData" label-width="80px">
            <el-form-item label="类型">
              <el-select v-model="formData.type" style="width: 250px" @change="handleClear">
                <el-option-group
                  v-for="group in typeOptions"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="formData.count" :min="1" :max="5" controls-position="right" />
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="handleCreate">
                开始机选
              </el-button>
              <CopyButton :text="copyText" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="12">
          <ul class="result">
            <li v-for="(item, index) in result" :key="index">
              <span v-for="child in item" :key="child.key" :class="child.color">{{ child.code }}</span>

              <CopyButton class="result-copy" :text="item.map(child => child.code).join('、')" />
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>

    <template #content>
      <p>JS随机生成，仅供参考，并不能增加运气~</p>
      <p v-if="formData.type === 'ssq'">
        双色球投注区分为红色球号码区和蓝色球号码区，红色球号码区由1-33共三十三个号码组成，蓝色球号码区由1-16共十六个号码组成。投注时选择6个红色球号码和1个蓝色球号码组成一注进行单式投注，每注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'kl8'">
        快乐8游戏是指从1至80共八十个号码中任意选择一至十个号码进行投注，每一组一个至十个号码的组合称为一注彩票，每注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'fc3d'">
        3D是指以三个号码排列或组合为一注进行单式投注，投注号码由000-999组成，三个位置从左至右分别为“百位”、“十位”、“个位”，一组三个号码的排列或组合称为一注。每注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'qlc'">
        七乐彩采用组合式玩法，从01—30共30个号码中选择7个号码组合为一注投注号码。每注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'dlt'">
        超级大乐透基本投注是指从前区号码中任选五个号码，并从后区号码中任选两个号码的组合进行投注。其中，前区号码由01—35共三十五个号码组成，后区号码由01—12共十二个号码组成。每注基本投注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'px3'">
        排列3是指从000-999的数字中选取1个3位数作为一注投注号码进行的投注。每注金额人民币2元。
      </p>
      <p v-else-if="formData.type === 'px5'">
        购买“排列5”时，由购买者从00000-99999的数字中选取1个5位数为投注号码进行投注。
      </p>
      <p v-else-if="formData.type === 'qxc'">
        7星彩投注是指从000000-999999中选取1个6位数字作为前六位、从0-14中选取1个数字作为最后一位，共同组成一注号码进行的投注。每注金额人民币2元。
      </p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import random from 'xijs/src/random'

definePageMeta({
  title: '彩票机选',
  description: '福利彩票、体育彩票机选工具。'
})

const formData = reactive({
  type: 'ssq',
  count: 1
})
const typeOptions = reactive([
  {
    label: '福利彩票',
    options: [
      {
        value: 'ssq',
        label: '双色球'
      },
      {
        value: 'kl8',
        label: '快乐8'
      },
      {
        value: 'fc3d',
        label: '3D'
      },
      {
        value: 'qlc',
        label: '七乐彩'
      }
    ]
  },
  {
    label: '体育彩票',
    options: [
      {
        value: 'dlt',
        label: '大乐透'
      },
      {
        value: 'px3',
        label: '排列3'
      },
      {
        value: 'px5',
        label: '排列5'
      },
      {
        value: 'qxc',
        label: '七星彩'
      }
    ]
  }
])
const result = ref([])
const copyText = computed(() => {
  return result.value.map(item => item.map(child => child.code).join('、')).join('\n')
})

function handleClear () {
  result.value = []
}

function handleCreate () {
  switch (formData.type) {
    case 'ssq':
      result.value = createSSQ()
      break
    case 'kl8':
      result.value = createKL8()
      break
    case 'fc3d':
      result.value = createFC3D()
      break
    case 'qlc':
      result.value = createQLC()
      break
    case 'dlt':
      result.value = createDLT()
      break
    case 'px3':
      result.value = createFC3D()
      break
    case 'px5':
      result.value = createPX5()
      break
    case 'qxc':
      result.value = createQXC()
      break
  }
}

function createSSQ () {
  return Array.from({ length: formData.count }).map(() => {
    const red = randomNumber(33, 6, 'red')
    const blue = randomNumber(16, 1, 'blue')
    return [...red.sort((a, b) => a.code - b.code), ...blue]
  })
}

function createKL8 () {
  return Array.from({ length: formData.count }).map(() => {
    return randomNumber(80, 20, 'red').sort((a, b) => a.code - b.code)
  })
}

function createQLC () {
  return Array.from({ length: formData.count }).map(() => {
    return randomNumber(30, 7).sort((a, b) => a.code - b.code)
  })
}

function createFC3D () {
  return Array.from({ length: formData.count }).map(() => {
    return randomString(999)
  })
}

function createDLT () {
  return Array.from({ length: formData.count }).map(() => {
    const red = randomNumber(35, 5, 'red')
    const blue = randomNumber(12, 2, 'blue')
    return [...red.sort((a, b) => a.code - b.code), ...blue]
  })
}

function createPX5 () {
  return Array.from({ length: formData.count }).map(() => {
    return randomString(99999)
  })
}

function createQXC () {
  return Array.from({ length: formData.count }).map(() => {
    const red = randomString(999999, 'red')
    const blue = randomNumber(14, 1, 'blue')
    return [...red.sort((a, b) => a.code - b.code), ...blue]
  })
}

function randomNumber (end, count, color) {
  const result = []
  while (result.length < count) {
    const num = Math.floor(random(1, end))
    if (!result.includes(num)) {
      result.push(num)
    }
  }
  return result.map(item => ({
    code: item.toString().padStart(2, '0'),
    key: Math.random(),
    color
  }))
}

function randomString (end, color) {
  const num = Math.floor(random(0, end))
  return num.toString().padStart(end.toString().length, '0').split('').map(item => ({
    code: item,
    key: Math.random(),
    color
  }))
}
</script>

<style lang="scss" scoped>
.result {
  li {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 8px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: #ffffff;
      background-color: var(--el-color-info-light-3);
      border-radius: 50%;

      &.red {
        background-color: #f56c6c;
      }

      &.blue {
        background-color: #409eff;
      }
    }

    &:hover .result-copy {
      display: block;
    }
  }

  &-copy {
    display: none;
  }
}
</style>
