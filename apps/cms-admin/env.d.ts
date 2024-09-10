/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />

interface ImportMetaEnv {
  CI: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
