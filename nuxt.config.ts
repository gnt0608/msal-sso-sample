import { defineNuxtConfig } from "nuxt/config"
import vuetify from "vite-plugin-vuetify"

export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  hooks: {
    "vite:extendConfig": (config: any) => {
      config.plugins!.push(vuetify())
    },
  },
  vite: {
    define: {
      "window.global": {},
    },
    resolve: {
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser",
      },
    },
    ssr: {
      noExternal: ["vuetify"],
    },
    server: {
      proxy: {
        "/api/": {
          target: "http://localhost:8080/",
        },
      },
    },
  },
  css: ["@/assets/main.scss"],
  app: {
    head: {
      title: "SeatManager",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
  runtimeConfig: {
    public: {
      clientId: "",
      tenantId: "",
      redirectUri: "",
      postLogoutRedirectUri: "",
    },
  },
})
