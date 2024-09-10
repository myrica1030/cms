/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />

import 'vue-router'

interface ImportMetaEnv {
  CI: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Requires authentication
     *
     * @default true
     */
    requiresAuth?: boolean
    /**
     * Requires guest
     *
     * @default false
     */
    requiresGuest?: boolean
  }
}
