<template>
  <ToolLayout>
    <UploadFile />
    <el-checkbox-group v-model="plugins">
      <el-checkbox v-for="item in pluginOptions" :key="item.value" :label="item.value">
        {{ item.name }}}
      </el-checkbox>
    </el-checkbox-group>
    <CodeEditor />
    <CodeEditor />
  </ToolLayout>
</template>

<script setup lang="ts">
import { optimize } from 'svgo'
import type { PluginConfig } from 'svgo'
import { ref, reactive } from 'vue'

const optimizedSvgString = ref('')
const svgString = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="37.07" height="36" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 198"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path><path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path><path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path></svg>'

const pluginOptions = reactive([
  {
    name: '清除属性空格',
    value: 'cleanupAttrs'
  },
  {
    name: '移除/整理可用背景',
    value: 'cleanupEnableBackground'
  },
  {
    name: '',
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
    name: '',
    value: 'convertEllipseToCircle'
  },
  {
    name: '',
    value: 'convertOneStopGradients'
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
    name: '',
    value: 'prefixIds'
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
    name: '',
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
    name: '',
    value: 'reusePaths'
  },
  {
    name: '属性排序',
    value: 'sortAttrs'
  },
  {
    name: '',
    value: 'sortDefsChildren'
  }
])

const plugins = reactive<PluginConfig[]>([
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
])

function handleOptimize () {
  const result = optimize(svgString, {
    multipass: false, // boolean
    js2svg: {
      indent: 4, // number
      pretty: false // boolean
    },
    plugins
  })
  optimizedSvgString.value = result.data
}
</script>
