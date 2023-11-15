<template>
  <ToolBanner :current-tool="currentTool" />

  <section class="section">
    <el-form label-width="80px">
      <el-form-item>
        <el-radio-group v-model="type">
          <el-radio-button label="date">
            按日期搜索
          </el-radio-button>
          <el-radio-button label="string">
            按关键字搜索
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="type === 'date'" label="日期">
        <el-date-picker v-model="dateTime" @change="handleSearch" />
      </el-form-item>
      <el-form-item v-else label="关键字">
        <el-input v-model="keyword" @input="handleSearch" />
      </el-form-item>
    </el-form>

    <el-descriptions
      v-if="result.name"
      :column="1"
      size="large"
      border
    >
      <el-descriptions-item label="星座名称" min-width="120">
        {{ result.name }}
      </el-descriptions-item>
      <el-descriptions-item label="公历范围">
        {{ result.range }}
      </el-descriptions-item>
      <el-descriptions-item label="特点">
        {{ result.zxtd }}
      </el-descriptions-item>
      <el-descriptions-item label="属性">
        {{ result.sssx }}
      </el-descriptions-item>
      <el-descriptions-item label="掌管宫位">
        {{ result.zggw }}
      </el-descriptions-item>
      <el-descriptions-item label="阴阳性">
        {{ result.yysx }}
      </el-descriptions-item>
      <el-descriptions-item label="最大特征">
        {{ result.zdtz }}
      </el-descriptions-item>
      <el-descriptions-item label="主管星">
        {{ result.zgxx }}
      </el-descriptions-item>
      <el-descriptions-item label="颜色">
        {{ result.xyys }}
      </el-descriptions-item>
      <el-descriptions-item label="珠宝">
        {{ result.jssw }}
      </el-descriptions-item>
      <el-descriptions-item label="幸运号码">
        {{ result.xyhm }}
      </el-descriptions-item>
      <el-descriptions-item label="金属">
        {{ result.kyjs }}
      </el-descriptions-item>
      <el-descriptions-item label="基本表现">
        {{ result.bx }}
      </el-descriptions-item>
      <el-descriptions-item label="优点">
        {{ result.yd }}
      </el-descriptions-item>
      <el-descriptions-item label="缺点">
        {{ result.qd }}
      </el-descriptions-item>
      <el-descriptions-item label="基本特质">
        {{ result.jbtz }}
      </el-descriptions-item>
      <el-descriptions-item label="具体特质">
        {{ result.jttz }}
      </el-descriptions-item>
      <el-descriptions-item label="行事风格">
        {{ result.xsfg }}
      </el-descriptions-item>
      <el-descriptions-item label="个性缺点">
        {{ result.gxmd }}
      </el-descriptions-item>
      <el-descriptions-item label="总体评价">
        {{ result.zj }}
      </el-descriptions-item>
    </el-descriptions>
  </section>

  <GitalkComment />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import constellation from '@/assets/json/xing-zuo.json'
import { useToolData } from '@/hooks/tool'

const { currentTool } = useToolData()

interface RoleItem {
  name: string
  range:string
  zxtd: string
  sssx: string
  zggw: string
  yysx: string
  zdtz: string
  zgxx: string
  xyys: string
  jssw: string
  xyhm: string
  kyjs: string
  bx: string
  yd: string
  qd: string
  jbtz: string
  jttz: string
  xsfg: string
  gxmd: string
  zj: string
}

interface Role {
  [key: string]: RoleItem
}

type MonthRange = Array<{
  name: string
  start: string
  end: string
}>

const type = ref('date')
const dateTime = ref(new Date())
const keyword = ref('')
const result = ref({
  name: '',
  range: '',
  zxtd: '',
  sssx: '',
  zggw: '',
  yysx: '',
  zdtz: '',
  zgxx: '',
  xyys: '',
  jssw: '',
  xyhm: '',
  kyjs: '',
  bx: '',
  yd: '',
  qd: '',
  jbtz: '',
  jttz: '',
  xsfg: '',
  gxmd: '',
  zj: ''
})

onBeforeMount(() => {
  handleSearch()
})

function handleSearch () {
  const { role, monthRange }: { role: Role, monthRange: MonthRange } = constellation

  let key = ''
  if (type.value === 'date') {
    const momentTime = dayjs(dateTime.value)
    const year = momentTime.year()
    const findRange = monthRange.find((item) => {
      return momentTime.isAfter(`${year}-${item.start}`) && momentTime.isAfter(`${year}-${item.end}`)
    })
    key = findRange?.name || '摩羯'
  } else {
    key = keyword.value.replace('座', '')
  }

  result.value = role[key] || {}
}
</script>
