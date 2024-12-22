<template>
  <ToolLayout>
    <section class="section">
      <el-form :model="form" label-width="100px">
        <p class="section-header">
          注意：BMI计算器对于肌肉量较大的人（如运动员）或老年人和其他失去肌肉量的人可能不准确。
        </p>
        <el-form-item label="身高">
          <el-input-number
            v-model="form.height"
            controls-position="right"
            :min="0"
          >
            <template #suffix>
              <span>cm</span>
            </template>
          </el-input-number>
        </el-form-item>
        <el-form-item label="体重">
          <el-input-number
            v-model="form.weight"
            controls-position="right"
            :min="0"
          >
            <template #suffix>
              <span>kg</span>
            </template>
          </el-input-number>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="handleCalc">
            计算BMI
          </el-button>
        </el-form-item>
        <el-form-item label="结果">
          {{ form.result }}
        </el-form-item>
      </el-form>
    </section>

    <template #content>
      <p>BMI通常被用作筛查工具，以确定你的体重是否可能使你面临健康问题的风险。而BMI计算器可以快速计算出你的BMI。</p>
      <h2>中国成年人BMI标准</h2>
      <ul>
        <li>BMI&lt;18.5：体重过低</li>
        <li>18.5≤BMI&lt;24：正常</li>
        <li>24≤BMI&lt;：超重</li>
        <li>28≤BMI：肥胖</li>
      </ul>
      <h2>BMI计算公式</h2>
      <p>你可以使用BMI计算器来快速计算你的BMI，或者自己使用BMI计算公式来计算。下面是公制和英美制单位的计算bmi公式：</p>
      <p>公制单位的BMI计算公式：</p>
      <pre>BMI = 体重[kg] ÷ (身高[m])²
BMI = (体重[kg] ÷ 身高[cm] ÷ 身高[cm]) x 10,000</pre>
      <p>英制单位的BMI计算公式：</p>
      <pre>BMI = 体重[lb] ÷ (身高[in])² x 703</pre>
      <h2>如何保持良好的BMI或减少超重和肥胖？</h2>
      <p>超重和肥胖，以及与之相关的非传染性疾病，在很大程度上是可以预防的。根据世卫组织的建议，人们可以：</p>
      <ul>
        <li>减少总脂肪和糖的能量摄入</li>
        <li>增加水果、蔬菜以及豆类、全谷类及坚果的食用量</li>
        <li>定期进行身体运动（儿童每天60分钟，成人每周150分钟）</li>
      </ul>
      <p>建议密切关注BMI计算器，了解你的BMI变化，以保持良好和健康的体重。</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'BMI计算器',
  description: '身体质量指数（BMI）是一个由身高和体重算出的数值；\n是确定是否处于健康体重的一种方法。'
})

const form = reactive({
  height: 160,
  weight: 50,
  result: ''
})

handleCalc()

function handleCalc () {
  const { height, weight } = form
  // 将身高从厘米转换为米
  const formatHeight = height / 100

  // 计算BMI
  const bmi = +(weight / (formatHeight * formatHeight)).toFixed(2)

  let result = ''
  if (bmi < 18.5) {
    result = '体重过低'
  } else if (bmi >= 18.5 && bmi < 24) {
    result = '正常'
  } else if (bmi >= 24 && bmi < 28) {
    result = '超重'
  } else {
    result = '肥胖'
  }

  // 返回计算结果
  form.result = `BMI: ${bmi}，${result}` // 保留两位小数
}
</script>
