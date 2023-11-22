<template>
  <div id="gitalk-container" class="section" />
</template>

<script setup lang="ts">
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

onMounted(() => {
  // @see https://github.com/gitalk/gitalk
  const gitalk = new Gitalk({
    clientID: 'c772e534d69f326684f5',
    clientSecret: '3567ddddeb909883d61f2ccf87d22ae5bcb290b2',
    repo: 'tool-comment', // The repository of store comments,
    owner: 'Spacesless',
    admin: ['Spacesless'],
    id: location.pathname, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
    proxy: 'https://proxy.timelessq.workers.dev/?https://github.com/login/oauth/access_token'
  })

  gitalk.render('gitalk-container')
})
</script>

<style lang="scss" scoped>
.section {
  padding-top: 0;
}

:deep(.gt-container) {
  .gt-header-textarea {
    background-color: var(--el-bg-color-page);
  }
}
</style>
