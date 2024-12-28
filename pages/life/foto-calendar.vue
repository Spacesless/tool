<template>
  <ToolLayout>
    <section class="section">
      <el-row :gutter="16">
        <el-col :sm="24" :md="16">
          <el-calendar ref="calendar" v-model="dateTime" class="calendar">
            <template #header>
              <div class="calendar-header">
                <el-date-picker v-model="dateTime" size="default" type="month" />
                <div>
                  <el-button text :icon="ArrowLeft" @click="selectDate('prev-month')" />
                  <el-button text :icon="ArrowRight" @click="selectDate('next-month')" />
                </div>
                <span v-show="isToday" class="calendar-header__today" @click="selectDate('today')">今</span>
              </div>
            </template>
            <template #date-cell="{ data, lunar = getDayOverview(data.date) }">
              <div
                class="calendar-item"
                :class="{
                  'calendar-item--selected': data.isSelected
                }"
              >
                <p class="calendar-item__day">
                  {{ lunar.solarDay }}
                </p>
                <p class="calendar-item__info" :class="{'calendar-item__info--holiday': lunar.festivals || lunar.solarTerms}">
                  {{ lunar.festivals || lunar.lunarDay }}
                </p>
              </div>
            </template>
          </el-calendar>
        </el-col>

        <el-col :sm="24" :md="8">
          <div class="solar">
            <p class="solar-day">
              {{ dayData.day }}
            </p>

            <div class="solar-info">
              <p>{{ dayData.date }} {{ dayData.cnWeek }}</p>
              <p>{{ dayData.lunar.date }}</p>
              <p>
                {{ dayData.lunar.cyclicalYear }}({{ dayData.lunar.zodiac }})年
                {{ dayData.lunar.cyclicalMonth }}月
                {{ dayData.lunar.cyclicalDay }}日
              </p>
            </div>
          </div>

          <div class="lunar">
            <el-descriptions
              :column="1"
              border
            >
              <el-descriptions-item label="因果犯忌" label-width="80">
                {{ dayData.festivals.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="纪念日">
                {{ dayData.otherFestivals.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="月斋">
                {{ dayData.isMonthZhai }}
              </el-descriptions-item>
              <el-descriptions-item label="十斋日">
                {{ dayData.isDayZhaiTen }}
              </el-descriptions-item>
              <el-descriptions-item label="六斋日">
                {{ dayData.isDayZhaiSix }}
              </el-descriptions-item>
              <el-descriptions-item label="朔望斋">
                {{ dayData.isDayZhaiShuoWang }}
              </el-descriptions-item>
              <el-descriptions-item label="观音斋">
                {{ dayData.isDayZhaiGuanYin }}
              </el-descriptions-item>
              <el-descriptions-item label="杨公忌">
                {{ dayData.isDayYangGong }}
              </el-descriptions-item>
              <el-descriptions-item label="二十七宿">
                {{ dayData.xiu }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
    </section>

    <template #content>
      <h3>月斋</h3>
      <p>农历每年正月、五月、九月为月斋。</p>

      <h3>十斋日</h3>
      <p>十斋日，即于每月初一、初八、十四、十五、十八、廿三、廿四、廿八、廿九、三十受持斋戒。</p>

      <h3>六斋日</h3>
      <p>六斋日，若逢大月，为农历每月初八、十四、十五、廿三、廿九、三十；若逢小月，为农历每月初八、十四、十五、廿三、廿八、廿九。</p>

      <h3>朔望斋</h3>
      <p>农历每月初一、十五。</p>

      <h3>观音斋</h3>
      <p>（正月）初八，（二月）初七、初九、十九，（三月）初三、初六、十三，（四月）廿二，（五月）初三、十七，（六月）十六、十八、十九、廿三，（七月）十三，（八月）十六，（九月）十九、廿三，（十月）初二，（十一月）十九、廿四，（十二月）廿五。</p>

      <h3>杨公忌</h3>
      <p>相传唐代风水宗师杨筠松根据“二十八星宿”顺数，订定了“杨公十三忌”。这十三个“忌日”分别是正月十三、二月十一、三月初九、四月初七、五月初五、六月初三、七月初一、七月廿九、八月廿七、九月廿五、十月廿三、十一月廿一、十二月十九。</p>

      <h3>二十七宿</h3>
      <p>可能是印度人观察星象的位置和角度不同，中国人在黄河流域远观天象，与印度人在纬度较低的地域观星，在角度上肯定有差异，而天上各星的明暗程度，在两地亦有差别。这就使得中国有二十八星宿，而印度只有二十七星宿。佛教从印度传入中国，把牛宿(牛金牛)纳入了女宿(女土蝠)，所以只有二十七宿。</p>
      <p>二十七宿包括：</p>
      <ul>
        <li>东方七宿：角、亢、氐、房、心、尾、箕；</li>
        <li>北方六宿：斗、女、虚、危、室、壁；</li>
        <li>西方七宿：奎、娄、胃、昴、毕、觜、参；</li>
        <li>南方七宿：井、鬼、柳、星、张、翼、轸。</li>
      </ul>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, Foto } from 'lunar-typescript'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

definePageMeta({
  title: '佛历',
  description: '佛历是历法的一种；\n以释迦牟尼涅槃后一年为纪元元年。'
})

const dateTime = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) { return }
  calendar.value.selectDate(val)
}

function getDayOverview (datetime: Date) {
  const solarInstance = Solar.fromDate(datetime)
  const lunarInstance = solarInstance.getLunar()
  const fotoInstance = Foto.fromLunar(lunarInstance)

  const solarDay = solarInstance.getDay()

  const festivals = [
    ...fotoInstance.getFestivals().map(item => item.getName()),
    ...lunarInstance.getOtherFestivals()
  ]

  return {
    solarDay,
    festivals: festivals[0],
    lunarDay: lunarInstance.getDayInChinese()
  }
}

const dayData = computed(() => getDayDetail(dateTime.value))
const isToday = computed(() => !dayjs().isSame(dayjs(dateTime.value), 'day'))

const weekCnEnum = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
function getDayDetail (datetime: Date) {
  const calcTime = datetime ? new Date(datetime) : new Date()
  const solarInstance = Solar.fromDate(calcTime)
  const solarWeekInstance = SolarWeek.fromDate(calcTime, 1)
  const lunarInstance = solarInstance.getLunar()
  const fotoInstance = Foto.fromLunar(lunarInstance)

  // 阳历
  const solarYear = solarInstance.getYear()
  const solarMonth = solarInstance.getMonth()
  const solarWeek = solarInstance.getWeek()
  const solarDay = solarInstance.getDay()

  // 农历
  const cnYear = lunarInstance.getYearInChinese()

  const result = {
    date: `${solarYear}-${solarMonth}-${solarDay}`,
    leapYear: solarInstance.isLeapYear(), // 是否为闰年
    maxDayInMonth: SolarUtil.getDaysOfMonth(solarYear, solarMonth), // 公历当月天数
    astro: solarInstance.getXingZuo() + '座', // 星座
    cnWeek: weekCnEnum[solarWeek], // 星期（中文）
    weekInYear: solarWeekInstance.getIndexInYear(),
    day: solarDay, // 公历日
    festivals: fotoInstance.getFestivals().map(item => item.getName()),
    otherFestivals: fotoInstance.getOtherFestivals(),
    isMonthZhai: formatBoolean(fotoInstance.isMonthZhai()), // 是否为月斋
    isDayZhaiTen: formatBoolean(fotoInstance.isDayZhaiTen()), // 是否为十斋日
    isDayZhaiSix: formatBoolean(fotoInstance.isDayZhaiSix()), // 是否为六斋日
    isDayZhaiShuoWang: formatBoolean(fotoInstance.isDayZhaiShuoWang()), // 是否为朔望斋
    isDayZhaiGuanYin: formatBoolean(fotoInstance.isDayZhaiGuanYin()), // 是否为观音斋
    isDayYangGong: formatBoolean(fotoInstance.isDayYangGong()), // 是否为杨公忌
    xiu: lunarInstance.getXiu(), // 二十七宿
    lunar: {
      date: `${cnYear + lunarInstance.getMonthInChinese()}月${lunarInstance.getDayInChinese()}`,
      zodiac: lunarInstance.getYearShengXiao(), // 生肖
      cyclicalYear: lunarInstance.getYearInGanZhi(), // 干支纪年
      cyclicalMonth: lunarInstance.getMonthInGanZhi(), // 干支纪月
      cyclicalDay: lunarInstance.getDayInGanZhi() // 干支纪日
    }
  }

  return result
}

function formatBoolean (flag: boolean) {
  return flag ? '是' : '否'
}
</script>

<style lang="scss" scoped>
.calendar {
  &-header {
    display: flex;
    gap: 16px;
    align-items: center;

    &__today {
      width: 24px;
      height: 24px;
      color: #ffffff;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      background: var(--el-color-primary);
      border-radius: var(--el-border-radius-base);
      cursor: pointer;
    }
  }

  :deep(.calendar-item) {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    padding-top: 10px;
    text-align: center;

    .calendar-item__day {
      font-size: 18px;
      line-height: 2;
    }

    .calendar-item__info {
      font-size: 14px;
    }

    .calendar-item__info--holiday {
      color: var(--el-color-primary);
    }

    .calendar-item__rest,
    .calendar-item__work {
      position: absolute;
      top: 6px;
      right: 8px;
      width: 16px;
      height: 16px;
      color: #ffffff;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      border-radius: var(--el-border-radius-base);
    }

    .calendar-item__rest {
      background-color: #eb3333;
    }

    .calendar-item__work {
      background-color: #4e5877;
    }
  }
}

:deep(.calendar) {
  .calendar-item--holiday {
    background-color: var(--el-color-danger-light-9);
  }

  .calendar-item--work {
    background-color: var(--el-color-warning-light-9);
  }

  .calendar-item--weekend .calendar-item__day {
    color: #ff5a5d;
  }
}

:deep(.el-calendar) {
  .el-calendar__header {
    padding: 4px 0 16px;
  }

  .el-calendar__body {
    padding: 0;
  }
}

:deep(.el-calendar-table) {
  th {
    border-left: var(--el-calendar-border);

    &:last-child {
      border-right: var(--el-calendar-border);
    }
  }

  .el-calendar-day {
    padding: 0;
  }
}

.solar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  text-align: center;

  &-day {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    color: #ffffff;
    font-size: 50px;
    line-height: 90px;
    background-color: #367df1;
    border-radius: 10px;

    &::before {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 6px;
      height: 6px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 50px 0 #ffffff;
      content: "";
    }
  }
}

.lunar {
  height: 432px;
  overflow: auto;
}
</style>
