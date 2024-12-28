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
                  'calendar-item--holiday': lunar.isHoliday,
                  'calendar-item--work': lunar.isWork,
                  'calendar-item--weekend': lunar.isWeekend && !lunar.isWork,
                  'calendar-item--selected': data.isSelected
                }"
              >
                <p class="calendar-item__day">
                  {{ lunar.solarDay }}
                </p>
                <p class="calendar-item__info" :class="{'calendar-item__info--holiday': lunar.festivals || lunar.solarTerms}">
                  {{ lunar.festivals || lunar.solarTerms || lunar.lunarDay }}
                </p>
                <span v-if="lunar.isHoliday && !lunar.isWork" class="calendar-item__rest">休</span>
                <span v-if="lunar.isWork" class="calendar-item__work">班</span>
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
              <p>本年第{{ dayData.weekInYear }}周， 第{{ dayData.dayInYear }}天</p>
            </div>
          </div>

          <div class="lunar">
            <el-descriptions
              :column="1"
              border
            >
              <el-descriptions-item label="星座" label-width="80">
                {{ dayData.astro }}
              </el-descriptions-item>
              <el-descriptions-item label="节日">
                {{ dayData.festivals.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="月相">
                {{ dayData.lunar.yuexiang }}月
              </el-descriptions-item>
              <el-descriptions-item label="禄">
                {{ dayData.lunar.dayLu }}
              </el-descriptions-item>
              <el-descriptions-item label="物候">
                {{ dayData.lunar.wuhou }}
              </el-descriptions-item>
              <el-descriptions-item label="数九">
                {{ dayData.lunar.shujiu }}
              </el-descriptions-item>
              <el-descriptions-item label="三伏">
                {{ dayData.lunar.sanfu }}
              </el-descriptions-item>
              <el-descriptions-item label="六曜">
                {{ dayData.lunar.liuYao }}
              </el-descriptions-item>
              <el-descriptions-item label="宜">
                {{ dayData.almanac.yi }}
              </el-descriptions-item>
              <el-descriptions-item label="忌">
                {{ dayData.almanac.ji }}
              </el-descriptions-item>
              <el-descriptions-item label="吉神方位">
                <p>喜神：{{ dayData.almanac.jishenfangwei.xi }}</p>
                <p>阳贵神：{{ dayData.almanac.jishenfangwei.yanggui }}</p>
                <p>阴贵神：{{ dayData.almanac.jishenfangwei.yingui }}</p>
                <p>福神：{{ dayData.almanac.jishenfangwei.fu }}</p>
                <p>财神：{{ dayData.almanac.jishenfangwei.cai }}</p>
              </el-descriptions-item>
              <el-descriptions-item label="胎神方位">
                {{ dayData.almanac.taishenfangwei }}
              </el-descriptions-item>
              <el-descriptions-item label="太岁方位">
                {{ dayData.almanac.taisuifangwei }}
              </el-descriptions-item>

              <el-descriptions-item label="冲">
                {{ dayData.almanac.chong }}
              </el-descriptions-item>
              <el-descriptions-item label="煞">
                {{ dayData.almanac.sha }}
              </el-descriptions-item>
              <el-descriptions-item label="纳音">
                {{ dayData.almanac.nayin }}
              </el-descriptions-item>
              <el-descriptions-item label="建除十二执星">
                {{ dayData.almanac.shiershen }}
              </el-descriptions-item>
              <el-descriptions-item label="十二天神">
                {{ dayData.almanac.tianshen }}
              </el-descriptions-item>
              <el-descriptions-item label="二十八宿">
                {{ dayData.almanac.xingxiu }}
              </el-descriptions-item>
              <el-descriptions-item label="七政">
                {{ dayData.almanac.zheng }}
              </el-descriptions-item>
              <el-descriptions-item label="彭祖百忌">
                {{ dayData.almanac.pengzubaiji.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="四神兽">
                {{ dayData.almanac.shou }}
              </el-descriptions-item>
              <el-descriptions-item label="值日九星">
                {{ dayData.almanac.jiuxing }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
    </section>

    <template #content>
      <h3>儒略日</h3>
      <p>儒略日（Julian day，JD）是指由公元前4713年1月1日，协调世界时中午12时开始所经过的天数，多为天文学家采用，用以作为天文学的单一历法，把不同历法的年表统一起来。如果计算相隔若干年的两个日期之间间隔的天数，利用儒略日就比较方便。</p>

      <h3>干支</h3>
      <p>10天干和12地支结合，形成60个干支为一轮回，即60甲子。如辛亥即天干辛与地支亥的组合。</p>
      <p>60甲子的排列顺序为：</p>
      <table>
        <tbody>
          <tr>
            <td>序号</td>
            <td>干支</td>
            <td>序号</td>
            <td>干支</td>
            <td>序号</td>
            <td>干支</td>
            <td>序号</td>
            <td>干支</td>
            <td>序号</td>
            <td>干支</td>
          </tr>
          <tr>
            <td>1</td>
            <td>甲子</td>
            <td>13</td>
            <td>丙子</td>
            <td>25</td>
            <td>戊子</td>
            <td>37</td>
            <td>庚子</td>
            <td>49</td>
            <td>壬子</td>
          </tr>
          <tr>
            <td>2</td>
            <td>乙丑</td>
            <td>14</td>
            <td>丁丑</td>
            <td>26</td>
            <td>己丑</td>
            <td>38</td>
            <td>辛丑</td>
            <td>50</td>
            <td>癸丑</td>
          </tr>
          <tr>
            <td>3</td>
            <td>丙寅</td>
            <td>15</td>
            <td>戊寅</td>
            <td>27</td>
            <td>庚寅</td>
            <td>39</td>
            <td>壬寅</td>
            <td>51</td>
            <td>甲寅</td>
          </tr>
          <tr>
            <td>4</td>
            <td>丁卯</td>
            <td>16</td>
            <td>己卯</td>
            <td>28</td>
            <td>辛卯</td>
            <td>40</td>
            <td>癸卯</td>
            <td>52</td>
            <td>乙卯</td>
          </tr>
          <tr>
            <td>5</td>
            <td>戊辰</td>
            <td>17</td>
            <td>庚辰</td>
            <td>29</td>
            <td>壬辰</td>
            <td>41</td>
            <td>甲辰</td>
            <td>53</td>
            <td>丙辰</td>
          </tr>
          <tr>
            <td>6</td>
            <td>己巳</td>
            <td>18</td>
            <td>辛巳</td>
            <td>30</td>
            <td>癸巳</td>
            <td>42</td>
            <td>乙巳</td>
            <td>54</td>
            <td>丁巳</td>
          </tr>
          <tr>
            <td>7</td>
            <td>庚午</td>
            <td>19</td>
            <td>壬午</td>
            <td>31</td>
            <td>甲午</td>
            <td>43</td>
            <td>丙午</td>
            <td>55</td>
            <td>戊午</td>
          </tr>
          <tr>
            <td>8</td>
            <td>辛未</td>
            <td>20</td>
            <td>癸未</td>
            <td>32</td>
            <td>乙未</td>
            <td>44</td>
            <td>丁未</td>
            <td>56</td>
            <td>己未</td>
          </tr>
          <tr>
            <td>9</td>
            <td>壬申</td>
            <td>21</td>
            <td>甲申</td>
            <td>33</td>
            <td>丙申</td>
            <td>45</td>
            <td>戊申</td>
            <td>57</td>
            <td>庚申</td>
          </tr>
          <tr>
            <td>10</td>
            <td>癸酉</td>
            <td>22</td>
            <td>乙酉</td>
            <td>34</td>
            <td>丁酉</td>
            <td>46</td>
            <td>己酉</td>
            <td>58</td>
            <td>辛酉</td>
          </tr>
          <tr>
            <td>11</td>
            <td>甲戌</td>
            <td>23</td>
            <td>丙戌</td>
            <td>35</td>
            <td>戊戌</td>
            <td>47</td>
            <td>庚戌</td>
            <td>59</td>
            <td>壬戌</td>
          </tr>
          <tr>
            <td>12</td>
            <td>乙亥</td>
            <td>24</td>
            <td>丁亥</td>
            <td>36</td>
            <td>己亥</td>
            <td>48</td>
            <td>辛亥</td>
            <td>60</td>
            <td>癸亥</td>
          </tr>
        </tbody>
      </table>

      <h3>生肖</h3>
      <p>十二生肖，又叫属相，是中国与十二地支相配以人出生年份的十二种动物，包括鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪。</p>
      <p>也是十二地支的形象化代表，即子（鼠）、丑（牛）、寅（虎）、卯（兔）、辰（龙）、巳（蛇）、午（马）、未（羊）、申（猴）、酉（鸡）、戌（狗）、亥（猪）。</p>

      <h3>月相</h3>
      <p>月相，是天文学中对于地球上看到的月球被太阳照明部分的称呼。随着月亮每天在星空中自东向西移动一大段距离，它的形状也在不断地变化着，这就是月亮位相变化，叫做月相。</p>
      <table>
        <tbody>
          <tr><td>农历日期</td><td>月相名</td><td>日月黄经差值（度）</td></tr><tr><td>初一</td><td>朔月（也称新月）</td><td>0</td></tr><tr>
            <td>初二</td><td>既朔月</td><td colspan="1" rowspan="5">
              0——90
            </td>
          </tr><tr>
            <td>初三</td><td colspan="1" rowspan="2">
              蛾眉新月
            </td>
          </tr><tr><td>初四</td></tr><tr><td>初五</td><td>蛾眉月</td></tr><tr><td>初六</td><td>夕月</td></tr><tr>
            <td>初七</td><td colspan="1" rowspan="2">
              上弦月
            </td><td colspan="1" rowspan="2">
              90
            </td>
          </tr><tr><td>初八</td></tr><tr>
            <td>初九</td><td>九夜月</td><td colspan="1" rowspan="6">
              90——180
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              初十
            </td><td colspan="1" rowspan="3">
              宵月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十一
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十二
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十三
            </td><td colspan="1" rowspan="1">
              渐盈凸月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十四
            </td><td colspan="1" rowspan="1">
              小望月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十五
            </td><td colspan="1" rowspan="1">
              望月（也称满月）
            </td><td colspan="1" rowspan="1">
              180
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十六
            </td><td colspan="1" rowspan="1">
              既望月
            </td><td colspan="1" rowspan="6">
              180——270
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十七
            </td><td colspan="1" rowspan="1">
              立待月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十八
            </td><td colspan="1" rowspan="1">
              居待月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              十九
            </td><td colspan="1" rowspan="1">
              寝待月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十
            </td><td colspan="1" rowspan="1">
              更待月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十一
            </td><td colspan="1" rowspan="1">
              渐亏凸月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十二
            </td><td colspan="1" rowspan="2">
              下弦月
            </td><td colspan="1" rowspan="2">
              270
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十三
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十四
            </td><td colspan="1" rowspan="2">
              有明月
            </td><td colspan="1" rowspan="7">
              270——360
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十五
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十六
            </td><td colspan="1" rowspan="2">
              蛾眉残月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十七
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十八
            </td><td colspan="1" rowspan="1">
              残月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              二十九
            </td><td colspan="1" rowspan="1">
              晓月
            </td>
          </tr><tr>
            <td colspan="1" rowspan="1">
              三十
            </td><td colspan="1" rowspan="1">
              晦月
            </td>
          </tr>
        </tbody>
      </table>

      <h3>禄</h3>
      <p>禄神为四柱神煞之一，是民间信仰中的主司官禄之神。</p>
      <p>甲禄在寅，乙禄在卯，丙戊禄在巳，丁己禄在午，庚禄在申，辛禄在酉，壬禄在亥，癸禄在子。</p>
      <p>禄在年支叫岁禄，禄在月支叫建禄，禄在日支叫专禄（也叫日禄），禄在时支叫归禄。</p>

      <h3>节气</h3>
      <p>二十四节气包括十二节（立春、惊蛰、清明、立夏、芒种、小暑、立秋、白露、寒露、立冬、大雪、小寒）和十二气（雨水、春分、谷雨、小满、夏至、大暑、处暑、秋分、霜降、小雪、冬至、大寒）。</p>

      <h3>物候</h3>
      <p>七十二候，是我国古代用来指导农事活动的历法补充。它是根据黄河流域的地理、气候、和自然界的一些景象编写而成，以五日为候，三候为气，六气为时，四时为岁，一年“二十四节气”共七十二候。各候均以一个物候现象相应，称“候应”。其中植物候应有植物的幼芽萌动、开花、结实等；动物候应有动物的始振、始鸣、交配、迁徙等；非生物候应有始冻、解冻、雷始发声等。七十二候“候应”的依次变化，反映了一年中物候和气候变化的一般情况。</p>

      <h3>数九</h3>
      <p>数九，又称冬九九，是中国民间一种计算寒天与春暖花开日期的方法。一般“三九、四九”是一年中最冷的时段。当数到九个“九天”（九九八十一天），便春深日暖、万物生机盎然，是春耕的时候了。</p>

      <h3>三伏</h3>
      <p>三伏，是初伏、中伏和末伏的统称，是一年中最热的时节。</p>
      <p>即是从夏至后第3个庚日算起，初伏为10天，中伏为10天或20天，末伏为10天。当夏至与立秋之间出现4个庚日时中伏为10天，出现5个庚日则为20天。</p>

      <h3>六曜</h3>
      <p>六曜，又称孔明六曜星或小六壬，是中国传统历法中的一种附注。它包括先胜、友引、 先负、佛灭、大安和赤口六个词汇，分别表示当天宜行何事，用以作为判定每日凶吉的参考。</p>

      <h3>二十八宿</h3>
      <p>二十八宿，是黄道附近的二十八组星象总称。上古时代人们根据日月星辰的运行轨迹和位置，把黄道附近的星象划分为二十八组，俗称二十八宿。</p>
      <ul>
        <li>东方七宿：角、亢、氐、房、心、尾、箕；</li>
        <li>北方七宿：斗、牛、女、虚、危、室、壁；</li>
        <li>西方七宿：奎、娄、胃、昴、毕、觜、参；</li>
        <li>南方七宿：井、鬼、柳、星、张、翼、轸。</li>
      </ul>

      <h3>彭祖百忌</h3>
      <p>彭祖百忌指的是在天干地支记日中的某日或当日里的某时不要做某事否则会发生某事。彭祖，道家先驱，是中国远古道家的重要人物，他以善养生而长寿。</p>

      <h3>太岁方位</h3>
      <p>
        四库全书收录的《御定月令辑要》曰：“太岁者，主宰一岁之尊神。凡吉事勿冲之，凶事勿犯之，凡修造方向等事尤宜慎避。太岁所在之方不宜兴工动土，否则必有灾祸。”
      </p>
      <p> 经常听说的太岁头上动土，就出自这里。</p>
      <p>本命年，也就是值太岁。 </p>

      <h3>十二天神</h3>
      <p>十二天神择日法，又名大黄道择日法，有十二位星神轮流值日，其名称及排列顺序依次为：青龙、明堂、天刑；朱雀、金贵、天德；白虎、玉堂、天牢；玄武、司命、勾陈。</p>
      <p>逢青龙、明堂、金贵、天德、玉堂、司命六神值日为黄道日；逢天刑、朱雀、白虎、天牢、玄武、勾陈六神值日为黑道日。</p>
      <p>黄道主吉，黑道主凶。我们经常在电视中听到选一个黄道吉日做什么的说法，就是从这里来的。</p>

      <h3>十二值星</h3>
      <p>十二值星，也称建除十二神，中国民俗信仰中的十二位神明，分别为建、除、满、平、定、执、破、危、成、收、开、闭。</p>
      <p>这十二位神明每日轮值，周而复始，负责保护凡间人民的平安。在传统农民历中，二十八宿下，通常会依序在每日标注上今日轮值神名，作为择日吉凶的参考，称为十二建除日。</p>

      <h3>九星</h3>
      <p>九星指北斗九星，我们熟知的北斗七星，在古代实际上有9颗，而随着时间的推移，另外2颗逐渐暗淡，人眼已经不容易观察到。</p>
      <p>太乙（太乙神数）、奇门（奇门遁甲）、六壬，并称“三式”，是中国术数三大绝学。太乙以天元为主，测国事；奇门以地元为主，测集体事；六壬以人元为主，测人事。</p>
      <p>而太乙、奇门、玄空（玄空风水）中都有与北斗九星相关的内容，其中九数、七色、五行、后天八卦方位都是相通的。</p>
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { Solar, SolarWeek, SolarUtil, LunarYear, HolidayUtil } from 'lunar-typescript'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

definePageMeta({
  title: '万年历',
  description: '从1900年到2099年的万年历日历表，包括阳历、农历、节日、节气、五行等信息。',
  updateTime: '2024-12-28',
  version: 'v1.1.0'
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
  const solarWeek = solarInstance.getWeek()
  const holiday = HolidayUtil.getHoliday(dayjs(datetime).format('YYYY-MM-DD'))

  const solarDay = solarInstance.getDay()
  const jieQi = lunarInstance.getCurrentJieQi()

  const festivals = [
    ...solarInstance.getFestivals(),
    ...lunarInstance.getFestivals()
  ]

  return {
    isHoliday: !!holiday?.getName(),
    isWork: holiday?.isWork(),
    isWeekend: solarWeek === 0 || solarWeek === 6,
    solarDay,
    festivals: festivals[0],
    solarTerms: jieQi?.getName(),
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

  // 阳历
  const solarYear = solarInstance.getYear()
  const solarMonth = solarInstance.getMonth()
  const solarWeek = solarInstance.getWeek()
  const solarDay = solarInstance.getDay()

  // 农历
  const lunarYear = lunarInstance.getYear()
  const cnYear = lunarInstance.getYearInChinese()
  const lunarMonth = lunarInstance.getMonth()

  const lunarYearInstance = LunarYear.fromYear(lunarYear)

  // 计算当天的二十四节气
  let solarTerms = {}
  const jieQi = lunarInstance.getCurrentJieQi()
  if (jieQi) {
    solarTerms = {
      name: jieQi.getName(),
      time: jieQi.getSolar().toYmdHms()
    }
  }

  const shujiu = lunarInstance.getShuJiu()

  const result = {
    date: `${solarYear}-${solarMonth}-${solarDay}`,
    leapYear: solarInstance.isLeapYear(), // 是否为闰年
    maxDayInMonth: SolarUtil.getDaysOfMonth(solarYear, solarMonth), // 公历当月天数
    astro: solarInstance.getXingZuo() + '座', // 星座
    cnWeek: weekCnEnum[solarWeek], // 星期（中文）
    weekInYear: solarWeekInstance.getIndexInYear(),
    day: solarDay, // 公历日
    dayInYear: SolarUtil.getDaysInYear(solarYear, solarMonth, solarDay),
    julianDay: solarInstance.getJulianDay(),
    festivals: [
      ...solarInstance.getFestivals(),
      ...lunarInstance.getFestivals(),
      ...solarInstance.getOtherFestivals(),
      ...lunarInstance.getOtherFestivals()
    ], // 节日
    lunar: {
      date: `${cnYear + lunarInstance.getMonthInChinese()}月${lunarInstance.getDayInChinese()}`,
      zodiac: lunarInstance.getYearShengXiao(), // 生肖
      cyclicalYear: lunarInstance.getYearInGanZhi(), // 干支纪年
      cyclicalMonth: lunarInstance.getMonthInGanZhi(), // 干支纪月
      cyclicalDay: lunarInstance.getDayInGanZhi(), // 干支纪日
      maxDayInMonth: lunarYearInstance?.getMonth(lunarMonth)?.getDayCount(), // 农历当月天数
      leapMonth: lunarYearInstance.getLeapMonth(), // 当年闰几月
      yuexiang: lunarInstance.getYueXiang(), // 月相
      dayLu: lunarInstance.getDayLu(), // 禄
      liuYao: lunarInstance.getLiuYao(), // 六曜
      wuhou: lunarInstance.getWuHou(), // 物候
      shujiu: shujiu ? shujiu.getName() : '', // 数九
      sanfu: lunarInstance.getFu() || '', // 三伏
      solarTerms // 二十四节气
    },
    almanac: {
      yi: lunarInstance.getDayYi().join('、'), // 宜,
      ji: lunarInstance.getDayJi().join('、'), // 忌,
      chong: '生肖冲' + lunarInstance.getDayChongDesc(), // 冲,
      sha: '煞' + lunarInstance.getDaySha(), // 煞,
      nayin: lunarInstance.getDayNaYin(), // 纳音
      shiershen: lunarInstance.getZhiXing() + '神', // 建除十二执星
      xingxiu: lunarInstance.getXiu() + '宿', // 二十八宿
      zheng: lunarInstance.getZheng(), // 七政
      shou: lunarInstance.getShou(), // 四神兽
      pengzubaiji: [lunarInstance.getPengZuGan(), lunarInstance.getPengZuZhi()], // 彭祖百忌
      jishenfangwei: { // 吉神方位
        xi: lunarInstance.getDayPositionXi() + '-' + lunarInstance.getDayPositionXiDesc(), // 喜神
        yanggui: lunarInstance.getDayPositionYangGui() + '-' + lunarInstance.getDayPositionYangGuiDesc(), // 阳贵神
        yingui: lunarInstance.getDayPositionYinGui() + '-' + lunarInstance.getDayPositionYinGuiDesc(), // 阴贵神
        fu: lunarInstance.getDayPositionFu() + '-' + lunarInstance.getDayPositionFuDesc(), // 福神
        cai: lunarInstance.getDayPositionCai() + '-' + lunarInstance.getDayPositionCaiDesc() // 财神
      },
      taishenfangwei: lunarInstance.getDayPositionTai(), // 胎神方位
      taisuifangwei: `${lunarInstance.getDayPositionTaiSui()}-${lunarInstance.getDayPositionTaiSuiDesc()}`, // 太岁方位
      tianshen: `${lunarInstance.getDayTianShen()}-${lunarInstance.getDayTianShenType()}-${lunarInstance.getDayTianShenLuck()}`, // 十二天神
      jiuxing: lunarInstance.getDayNineStar().toFullString() // 值日九星
    }
  }

  return result
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
