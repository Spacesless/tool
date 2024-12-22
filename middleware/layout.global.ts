export default defineNuxtRouteMiddleware((to) => {
  if (to.query.iframe) {
    setPageLayout(false)
  }
})
