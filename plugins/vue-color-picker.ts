import { defineNuxtPlugin } from 'nuxt/app'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker'
import '@cyhnkckali/vue3-color-picker/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Vue3ColorPicker', Vue3ColorPicker)
})
