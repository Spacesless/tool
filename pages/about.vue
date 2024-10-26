<template>
  <div class="banner">
    <h1 class="banner__title">
      一个安全免费的工具箱
    </h1>
    <p class="banner__description">
      所有数据处理都在客户端完成，不上传服务端；
    </p>
    <p class="banner__description">
      所有工具免费使用且无需登录。
    </p>
  </div>

  <section class="section content">
    <blockquote>这是一个在线工具网站~</blockquote>
    <h2>前言</h2>
    <p>网上的工具箱有很多，为啥还要自己开发一个呢？</p>
    <ul>
      <li>网上部分工具箱不是免费使用的，需要登录或者有各种限制；</li>
      <li>很多工具需要把数据上传到服务器再进行处理，对于有些要注意数据安全的情况不太友好，想试试纯Javascript能达到什么程度；</li>
      <li>更多是服务我自己吧，优先开发那些常用或者容易的。这是独立开发的第三个应用了，当做练练手。</li>
    </ul>
    <p>当然也不乏很多优秀的作品，比如：</p>
    <p>
      更适合开发者的：<a href="https://portal.he3app.com/home/category" target="_blank" rel="noopener noreferrer">https://portal.he3app.com/home/category</a>
    </p>
    <p>
      更多工具的：<a href="https://www.67tool.com/" target="_blank" rel="noopener noreferrer">https://www.67tool.com/</a>
    </p>
    <h2>技术方案</h2>
    <ul>
      <li>框架：Nuxt.js3</li>
      <li>UI：ElementPlus</li>
      <li>Typescript + Vue3</li>
      <li>以及工具里实现各种功能的npm包</li>
    </ul>
    <h2>功能特性</h2>
    <p>安全：所有处理均在您浏览器的 JavaScript 中进行，因此数据和文件从不会离开您的电脑。</p>
    <p>免费：没有后台程序和用户系统，所有工具免费使用，无需登录或关注公众号。</p>
    <ul>
      <li>暗黑模式</li>
      <li>文本工具</li>
      <li>多媒体工具</li>
      <li>生活工具</li>
      <li>数学换算</li>
      <li>开发工具</li>
      <li>编码转换</li>
      <li>...</li>
    </ul>
    <h2>挖坑画饼</h2>
    <p>只有我一个人维护，功能慢慢开发，有问题或建议可以评论区提出。</p>
    <ul>
      <li>更多工具</li>
      <li>国际化</li>
      <li>快速复制粘贴、文件导入导出</li>
      <li>...</li>
    </ul>
    <h2>外部嵌入</h2>
    <ul>
      <li>
        工具URL后面添加iframe参数即可去除外部容器使用iframe嵌入，如：
        <a href="https://app.timelessq.com/text/chinese-convert?iframe=true" target="_blank">
          https://app.timelessq.com/text/chinese-convert?iframe=true</a>
      </li>
      <li>
        工具URL后面添加theme以设置暗黑模式，如：
        <a href="https://app.timelessq.com/text/chinese-convert?theme=dark" target="_blank">
          https://app.timelessq.com/text/chinese-convert?theme=dark</a>
      </li>
    </ul>
  </section>

  <ClientOnly>
    <WalineComment />
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  title: '关于',
  icon: 'ph:info',
  order: 99
})

useSeoMeta({
  title: '关于本站',
  description: '一个安全免费无需登录的在线工具箱，数据全部在客户端处理。'
})
</script>
