<template>
  <el-row class="section">
    <el-form :model="form" label-width="80px">
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.content"
            :rows="3"
            type="textarea"
            @change="handleConvert"
          />
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="form.type">
            <el-radio label="cn">
              简体
            </el-radio>
            <el-radio label="hk">
              繁体
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-form-item label="">
          <el-input
            v-model="form.result"
            :rows="5"
            type="textarea"
            :readonly="true"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
import { Solar } from 'lunar-typescript'

const form = reactive({
  content: '',
  type: 'cn',
  result: ''
})

function handleConvert () {
  const calcTime = year ? new Date(`${year}-01-01`) : new Date()
  const solarInstance = Solar.fromDate(calcTime)
  const lunarInstance = solarInstance.getLunar()

  const result = []
  const jieQiList = lunarInstance.getJieQiList()
  const jieQi = lunarInstance.getJieQiTable()
  for (let i = 0, j = jieQiList.length; i < j; i++) {
    let name = jieQiList[i]
    const time = jieQi[name].toYmdHms()
    if (month) { // 查询指定月份的节气
      if (jieQi[name].getYear() === year && jieQi[name].getMonth() === +month) {
        name = this.solarTermEnum[name] || name
        result.push({ name, time })
      }
    } else { // 查询全部的节气
      name = this.solarTermEnum[name] || name
      result.push({ name, time })
    }
  }
}
</script>
