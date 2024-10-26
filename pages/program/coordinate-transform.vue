<template>
  <ToolLayout>
    <section class="section">
      <el-form ref="form" :model="formData" label-position="top">
        <el-row :gutter="16">
          <el-col :sm="24" :md="12">
            <el-form-item label="源坐标系">
              <el-radio-group v-model="formData.source">
                <el-radio-button label="bd09">
                  百度
                </el-radio-button>
                <el-radio-button label="gcj02">
                  高德、腾讯
                </el-radio-button>
                <el-radio-button label="wgs84">
                  WGS84
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="输入">
              <el-input v-model="formData.input" type="textarea" placeholder="请输入“经度,纬度”，如113,22" :rows="16" />
            </el-form-item>
            <el-form-item>
              <el-space :size="16">
                <p>结果保留小数位</p>
                <el-input-number v-model="formData.precision" controls-position="right" />
                <el-button type="primary" @click="handleConvert">
                  转换
                </el-button>
              </el-space>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="目标坐标系">
              <el-radio-group v-model="formData.target">
                <el-radio-button label="bd09">
                  百度
                </el-radio-button>
                <el-radio-button label="gcj02">
                  高德、腾讯
                </el-radio-button>
                <el-radio-button label="wgs84">
                  WGS84
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="输出">
              <el-input v-model="formData.output" readonly type="textarea" :rows="16" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '坐标转换',
  description: '百度、高德、腾讯、WGS84坐标系互转'
})

const formData = reactive({
  source: 'gcj02',
  input: `116.397755,39.903179
116.397691,39.904632`,
  target: 'wgs84',
  precision: 10,
  output: ''
})

onBeforeMount(() => {
  handleConvert()
})

function handleConvert () {
  const inputRow = formData.input.split('\n')
  const result: string[] = []
  inputRow.forEach((item) => {
    result.push(convertCoordinate(item))
  })
  formData.output = result.join('\n')
}

function convertCoordinate (input: string) {
  const { source, target, precision } = formData
  const [lon, lat] = input.split(',').map(Number)
  let output
  if (source === 'bd09') {
    const temp = bd09togcj02(lon, lat)
    if (target === 'gcj02') {
      output = temp
    }
    if (target === 'wgs84') {
      output = gcj02towgs84(temp[0], temp[1])
    }
  } else if (source === 'gcj02') {
    if (target === 'bd09') {
      output = gcj02tobd09(lon, lat)
    }
    if (target === 'wgs84') {
      output = gcj02towgs84(lon, lat)
    }
  } else {
    const temp = wgs84togcj02(lon, lat)
    if (target === 'gcj02') {
      output = temp
    }
    if (target === 'bd09') {
      output = gcj02tobd09(temp[0], temp[1])
    }
  }

  return output?.map(item => +item.toFixed(precision)).toString() || ''
}

/**
 * Created by Wandergis on 2015/7/8.
 * @see https://github.com/wandergis/coordtransform
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */

// 定义一些常量
const X_PI = 3.141592653589793 * 3000.0 / 180.0
const PI = 3.141592653589793
const a = 6378245.0
const ee = 0.006693421622965943

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bdLon
 * @param bdLat
 * @returns {*[]}
 */
function bd09togcj02 (bdLon: number, bdLat: number) : number[] {
  const X_PI = 3.141592653589793 * 3000.0 / 180.0
  const x = bdLon - 0.0065
  const y = bdLat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
  const ggLng = z * Math.cos(theta)
  const ggLat = z * Math.sin(theta)
  return [ggLng, ggLat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02tobd09 (lng: number, lat: number) : number[] {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI)
  const bdLng = z * Math.cos(theta) + 0.0065
  const bdLat = z * Math.sin(theta) + 0.006
  return [bdLng, bdLat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02 (lng: number, lat: number) : number[] {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0)
    let dlng = transformlng(lng - 105.0, lat - 35.0)
    const radlat = lat / 180.0 * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
    const mglat = lat + dlat
    const mglng = lng + dlng
    return [mglng, mglat]
  }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84 (lng: number, lat: number) : number[] {
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0)
    let dlng = transformlng(lng - 105.0, lat - 35.0)
    const radlat = lat / 180.0 * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
    const mglat = lat + dlat
    const mglng = lng + dlng
    return [lng * 2 - mglng, lat * 2 - mglat]
  }
}

function transformlat (lng: number, lat: number) : number {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
  return ret
}

function transformlng (lng: number, lat: number) : number {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
  return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function outOfChina (lng: number, lat: number) : boolean {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)
}
</script>
