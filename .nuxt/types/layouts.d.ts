import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "headers" | "default"
declare module "C:/Users/10190_kondou/git/gnt0608/msal-sso-sample/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}