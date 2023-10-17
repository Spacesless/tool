<template>
  <footer class="footer">
    <span>Copyright © 2023 Timeless. All rights reserved. </span>
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

<style lang="scss" scoped>
.footer {
  height: 45px;
  padding: 0 16px;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  line-height: 45px;
  text-align: center;

  &__icon {
    padding: 0 3px;
    vertical-align: text-bottom;
  }

  &__link {
    margin-left: 10px;
    color: var(--el-color-primary);
  }
}
</style>
