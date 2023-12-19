import { createVuetify, ThemeDefinition } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import "@mdi/font/css/materialdesignicons.css"
import * as labsComponents from "vuetify/labs/components"
import color from "@/assets/theme/exportcolor.module.scss"
const mainTheme: ThemeDefinition = { dark: false, colors: color } // const mainTheme: ThemeDefinition = {

const default_theme = {
  VBtn: { flat: "true", height: 40, color: "primary" },
  VTextField: { bgColor: "surface", variant: "outlined", density: "compact" },
  VSelect: { bgColor: "surface", variant: "outlined", density: "compact" },
  VCard: { color: "surface", border: true, flat: true, rounded: "lg" },
  VCheckbox: { color: "primary" },
  VRadio: { color: "primary" },
  VRow: { dense: "true" },
  // VCheckboxBtn: {color: "primary"},
}

aliases["original-yen"] = "original-yen"

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      defaultTheme: "mainTheme",
      themes: { mainTheme },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  })

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify)
})
