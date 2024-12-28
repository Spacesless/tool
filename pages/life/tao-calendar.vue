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
                  {{ lunar.festivals || lunar.solarTerms || lunar.lunarDay }}
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
              <el-descriptions-item label="节日" label-width="80">
                {{ dayData.festivals.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="三会日">
                {{ dayData.isDaySanHui }}
              </el-descriptions-item>
              <el-descriptions-item label="三元日">
                {{ dayData.isDaySanYuan }}
              </el-descriptions-item>
              <el-descriptions-item label="八节日">
                {{ dayData.isDayBaJie }}
              </el-descriptions-item>
              <el-descriptions-item label="五腊日">
                {{ dayData.isDayWuLa }}
              </el-descriptions-item>
              <el-descriptions-item label="八会日">
                {{ dayData.isDayBaHui }}
              </el-descriptions-item>
              <el-descriptions-item label="戊日">
                {{ dayData.isDayWu }}
              </el-descriptions-item>
              <el-descriptions-item label="天赦日">
                {{ dayData.isDayTianShe }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
    </section>

    <template #content>
      <h3>三会日</h3>
      <ul>
        <li>正月七日，名：举迁赏会，此日上元赐福，天官同地水二官考校罪福。</li>
        <li>七月七日，名：庆生中会，此日中元赦罪，地官同天水二官考校罪福。</li>
        <li>十月十五日，名：建生大会，此日下元解厄，水官同天地二官考校罪福。</li>
      </ul>
      <p>其三会之日，三官考核功过，三魂攒送生人善恶。又谓之三魂会日，宜焚香忏过。</p>

      <h3>三元日</h3>
      <p>正月十五，上元节；七月十五，中元节，十月十五，下元节。</p>
      <p>其三元之日，天地水三官二十七府百二十曹之神，先于三会日考校罪福，至三元日上奏金阙，以降祸福。其日可行道建斋，修身谢过。</p>

      <h3>八节日</h3>
      <ul>
        <li>立春：东北方度仙上圣天尊同梵炁始青天君下降。</li>
        <li>春分：东方玉宝星上天尊同青帝九炁天君下降。</li>
        <li>立夏：东南方好生度命天尊同梵炁始丹天君下降。</li>
        <li>夏至：南方玄真万福天尊同赤帝三炁天君下降。</li>
        <li>立秋：西南方太灵虚皇天尊同梵炁始素天君下降。</li>
        <li>秋分：西方太妙至极天尊同白帝七炁天君下降。</li>
        <li>立冬：西北方无量太华天尊同梵炁始玄天君下降。</li>
        <li>冬至：北方玄上玉宸天尊同黑帝五炁天君下降。</li>
      </ul>
      <p>其曰八极天尊天君同下人问，录人罪福，观察善恶。</p>

      <h3>五腊日</h3>
      <ul>
        <li>正月一日，名天腊，此日五帝会于东方九炁青天。</li>
        <li>五月五日，名地腊，此日五帝会于南方三炁丹天。</li>
        <li>七月七日，名道德腊，此日五帝会于西方七炁素天。</li>
        <li>十月一日，名民岁腊，此日五帝会于北方五炁黑天。</li>
        <li>十一月八日，名王侯腊，此日五帝会于上方玄都玉京。</li>
      </ul>
      <p>其五帝攒会之日，此日酆都北阴天帝考校鬼魂，查生人祖考及见世子孙所行善恶，以定罪福。此日皆累生人，宜当醮谢，须凭法力祭祀，追赎涂苦，一一得福，常日祭祀，不可享也。</p>

      <h3>八会日</h3>
      <p>天会丙午，地会壬午，人会壬子，日会庚午，月会庚申，星辰会辛酉，五行会甲辰，四时会甲戌。</p>
      <p>其节会宜斋戒焚香，醮告星辰，看经拜忏，祭祀先灵，可以延年益算。</p>

      <h3>戊日</h3>
      <p>戊日为禁忌日，道场会在戊日休息。戊日又分为明戊日、暗戊日。</p>
      <p>明戊日即天干为“戊”的日子。</p>
      <p>暗戊日则按口诀推算：</p>
      <blockquote>正羊（未日）二犬（戍日）三在辰，四月期间不犯寅，五午六子七鸡（酉日）位，八月周流又到申，九蛇（巳日）十猪（亥日）十一兔（卯日），十二牛头（丑日）重千斤。</blockquote>

      <h3>天赦日</h3>
      <p>天赦日，四时专气、生育万物、免罪赦过、天帝赦免众生罪过吉日，最利于消灾化煞，祈福延寿。天赦日最忌杀生，遇此日婚娶、宴请不要肆意杀生，尽量提前购买三净肉以备使用或者干脆素宴。</p>
      <p>天赦日规则：</p>
      <blockquote>春戊寅、夏甲午、秋戊申、冬甲子。</blockquote>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, Tao } from 'lunar-typescript'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

definePageMeta({
  title: '道历',
  description: '道历为道教专用的历纪；\n按我国夏历为准，用六十甲子以纪年。'
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
  const fotoInstance = Tao.fromLunar(lunarInstance)

  const solarDay = solarInstance.getDay()

  const festivals = fotoInstance.getFestivals().map(item => item.getName())

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
  const fotoInstance = Tao.fromLunar(lunarInstance)

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
    isDaySanHui: formatBoolean(fotoInstance.isDaySanHui()),
    isDaySanYuan: formatBoolean(fotoInstance.isDaySanYuan()),
    isDayBaJie: formatBoolean(fotoInstance.isDayBaJie()),
    isDayWuLa: formatBoolean(fotoInstance.isDayWuLa()),
    isDayBaHui: formatBoolean(fotoInstance.isDayBaHui()),
    isDayWu: formatBoolean(fotoInstance.isDayWu()),
    isDayTianShe: formatBoolean(fotoInstance.isDayTianShe()),
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
