<template>
  <footer class="footer">
    <span>Copyright © 2023 - {{ thisYear }} Timeless. All rights reserved. </span>
    <a
      class="footer__link"
      href="https://beian.miit.gov.cn/"
      rel="noopener noreferrer"
      target="_blank"
      title="ICP/IP地址/域名信息备案管理系统"
    >桂ICP备18003656号-1</a>
    <a
      class="footer__link"
      href="http://www.beian.gov.cn"
      rel="noopener noreferrer"
      target="_blank"
      title="全国互联网安全管理服务平台"
    >
      <img class="footer__icon" width="20" height="20" src="@/assets/image/icp-beian.png" alt="公网安备">桂公网安备45092102000147号
    </a>
  </footer>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const thisYear = ref(dayjs().year())
</script>

<style lang="scss" scoped>
.footer {
  height: 45px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  line-height: 45px;
  text-align: center;
  word-break: break-all;

  @media (width < 768px) {
    height: auto;
    margin-bottom: 16px;
    line-height: 1.7;
  }

  &__icon {
    padding: 0 3px;
    vertical-align: text-bottom;
  }

  &__link {
    display: inline-block;
    margin-left: 10px;
    color: var(--el-color-primary);
    text-decoration: none;
  }
}
</style>
