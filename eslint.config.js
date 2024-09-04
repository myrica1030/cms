import defineConfig, { GLOB_TSX } from '@mutoe/eslint-config'

export default defineConfig({
  isInEditor: false,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: true,
  test: {
    cypress: true,
  },
  ignores: [
    'apps/cms-page-builder/public/ionicons',
    'apps/cms-admin/src/services/api.ts',
  ],
  rules: {
    // TODO
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
}, {
  files: [GLOB_TSX],
  rules: {
    'ts/no-misused-promises': 'off',
  },
}, {
  name: 'cms/ignore-prisma-connect-camelcase',
  files: ['apps/cms-api/src/**/*.ts'],
  rules: {
    camelcase: ['error', {
      allow: [String.raw`^\S+(Id|ID|Key)_\S+(Id|ID|Key)$`],
    }],
  },
})
