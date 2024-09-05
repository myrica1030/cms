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
}, {
  name: 'cms/api-client-rules',
  files: ['apps/*/src/client/**/*-api.ts'],
  // @keep-sorted
  rules: {
    'ts/no-unnecessary-type-constraint': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-return': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
