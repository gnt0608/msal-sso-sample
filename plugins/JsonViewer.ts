import JsonViewer from 'vue-json-viewer'

export default defineNuxtPlugin((nuxtApp) => {

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(JsonViewer)
})
