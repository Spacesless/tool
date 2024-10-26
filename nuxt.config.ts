// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Toolbox - 一个安全免费的工具箱',
      meta: [
        { name: 'keywords', content: '工具箱|在线工具|免费工具|办公辅助' },
        { name: 'description', content: '一个安全免费无需登录的在线工具箱，数据全部在客户端处理。' }
      ]
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 5000
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    'nuxt-icon'
  ],
  eslint: {
    lintOnStart: false
  },
  stylelint: {
    lintOnStart: false
  },
  colorMode: {
    classSuffix: ''
  },
  elementPlus: {
    themes: ['dark'],
    importStyle: 'scss'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/assets/style/element/index.scss" as element;'
        }
      }
    },
    optimizeDeps: {
      needsInterop: ['svgo']
    }
  },
  compatibilityDate: '2024-10-25'
})
