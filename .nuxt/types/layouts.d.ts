import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "data-bridge" | "default"
declare module "D:/code/admin-center-ts/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}