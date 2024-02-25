<template>
  <ToolLayout>
    <section class="section svgo">
      <el-scrollbar class="svgo-setting">
        <el-button-group>
          <el-button type="primary" @click="selectAll">全选</el-button>
          <el-button type="primary" @click="handleClear">清空</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-button-group>
        <el-checkbox-group v-model="plugins">
          <el-checkbox v-for="item in pluginOptions" :key="item.value" :label="item.value">
            {{ item.name }}}
          </el-checkbox>
        </el-checkbox-group>
      </el-scrollbar>
      <el-row class="svgo-editor" :gutter="16">
        <el-col :md="12">
          <CodeEditor v-model="svgString" />
          <div class="svgo-result">
            <img :src="svgToBase64(svgString)" alt="">
            <p></p>
          </div>
          <UploadFile />
          <el-button type="primary" @click="handleOptimize">压缩</el-button>
        </el-col>
        <el-col :md="12">
          <CodeEditor v-model="optimizedSvgString" />
          <div class="svgo-result">
            <img :src="svgToBase64(optimizedSvgString)" alt="">
            <p></p>
          </div>
          <el-button type="primary">复制</el-button>
          <el-button type="primary">下载</el-button>
        </el-col>
      </el-row>
    </section>
  </ToolLayout>
</template>

<script setup lang="ts">
import { optimize } from 'svgo'
import type { PluginConfig } from 'svgo'
import { ref, reactive } from 'vue'

const svgString = ref('')
const optimizedSvgString = ref('')

const pluginOptions = reactive<{
  name: string;
  value: PluginConfig
}[]>([
  {
    name: '清除属性空格',
    value: 'cleanupAttrs'
  },
  {
    name: '移除/整理可用背景',
    value: 'cleanupEnableBackground'
  },
  {
    name: '清理 ID',
    value: 'cleanupIds'
  },
  {
    name: '优化列表的值',
    value: 'cleanupListOfValues'
  },
  {
    name: '数字四舍五入重写',
    value: 'cleanupNumericValues'
  },
  {
    name: '合并组',
    value: 'collapseGroups'
  },
  {
    name: '压缩色值',
    value: 'convertColors'
  },
  {
    name: '将非偏心<椭圆>转换为<圆>',
    value: 'convertEllipseToCircle'
  },
  {
    name: '转换路径数据',
    value: 'convertPathData'
  },
  {
    name: '图形转路径',
    value: 'convertShapeToPath'
  },
  {
    name: '转换样式为属性',
    value: 'convertStyleToAttrs'
  },
  {
    name: '转换transform',
    value: 'convertTransform'
  },
  {
    name: '内联样式',
    value: 'inlineStyles'
  },
  {
    name: '合并路径',
    value: 'mergePaths'
  },
  {
    name: '',
    value: 'mergeStyles'
  },
  {
    name: '压缩styles',
    value: 'minifyStyles'
  },
  {
    name: '移动元素属性到组',
    value: 'moveElemsAttrsToGroup'
  },
  {
    name: '移动group属性到元素',
    value: 'moveGroupAttrsToElems'
  },
  {
    name: '移除注释',
    value: 'removeComments'
  },
  {
    name: '移除<desc>',
    value: 'removeDesc'
  },
  {
    name: '删除尺寸',
    value: 'removeDimensions'
  },
  {
    name: '移除doctype',
    value: 'removeDoctype'
  },
  {
    name: '移除编辑器数据',
    value: 'removeEditorsNSData'
  },
  {
    name: '移除空的属性',
    value: 'removeEmptyAttrs'
  },
  {
    name: '移除空的容器',
    value: 'removeEmptyContainers'
  },
  {
    name: '移除空的text',
    value: 'removeEmptyText'
  },
  {
    name: '移除隐藏的元素',
    value: 'removeHiddenElems'
  },
  {
    name: '移除<metadata>',
    value: 'removeMetadata'
  },
  {
    name: '移除不必要的组属性',
    value: 'removeNonInheritableGroupAttrs'
  },
  {
    name: '',
    value: 'removeOffCanvasPaths'
  },
  {
    name: '移除栅格图像',
    value: 'removeRasterImages'
  },
  {
    name: '移除script元素',
    value: 'removeScriptElement'
  },
  {
    name: '移除style元素',
    value: 'removeStyleElement'
  },
  {
    name: '移除<title>',
    value: 'removeTitle'
  },
  {
    name: '移除未知值和默认值',
    value: 'removeUnknownsAndDefaults'
  },
  {
    name: '移除未使用命名空间',
    value: 'removeUnusedNS'
  },
  {
    name: '移除未使用的defs',
    value: 'removeUselessDefs'
  },
  {
    name: '移除未使用的stroke和fill',
    value: 'removeUselessStrokeAndFill'
  },
  {
    name: '移除viewBox',
    value: 'removeViewBox'
  },
  {
    name: '移除Xlink',
    value: 'removeXlink'
  },
  {
    name: '移除XML指令',
    value: 'removeXMLProcInst'
  },
  {
    name: '移除xmlns',
    value: 'removeXMLNS'
  },
  {
    name: '用链接替换重复的元素',
    value: 'reusePaths'
  },
  {
    name: '属性排序',
    value: 'sortAttrs'
  },
  {
    name: '对 <defs 的子项进行排序>',
    value: 'sortDefsChildren'
  }
])

const defaultPlugins: PluginConfig[] = [
  'removeDoctype',
  'removeXMLProcInst',
  'removeComments',
  'removeMetadata',
  'removeEditorsNSData',
  'cleanupAttrs',
  'mergeStyles',
  'inlineStyles',
  'minifyStyles',
  'cleanupIds',
  'removeUselessDefs',
  'cleanupNumericValues',
  'convertColors',
  'removeUnknownsAndDefaults',
  'removeNonInheritableGroupAttrs',
  'removeUselessStrokeAndFill',
  'removeViewBox',
  'cleanupEnableBackground',
  'removeHiddenElems',
  'removeEmptyText',
  'convertShapeToPath',
  'convertEllipseToCircle',
  'moveElemsAttrsToGroup',
  'moveGroupAttrsToElems',
  'convertPathData',
  'collapseGroups',
  'convertTransform',
  'removeEmptyAttrs',
  'removeEmptyContainers',
  'removeUnusedNS',
  'mergePaths',
  'sortAttrs',
  'sortDefsChildren',
  'removeTitle',
  'removeDesc'
]
const plugins = ref<PluginConfig[]>([...defaultPlugins])

watch(() => plugins, handleOptimize)

function handleOptimize () {
  const result = optimize(svgString.value, {
    multipass: false, // boolean
    js2svg: {
      indent: 4, // number
      pretty: false // boolean
    },
    plugins: plugins.value
  })
  optimizedSvgString.value = result.data
}

function svgToBase64(svgString: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURI(svgString)}`;
}

function handleClear() {
  plugins.value = []
}
function selectAll() {
  plugins.value = pluginOptions.map(item => item.value)
}
function handleReset() {
  plugins.value = [...defaultPlugins]
}
</script>
