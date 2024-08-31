import defineConfig, { GLOB_TESTS } from '@mutoe/eslint-config'

export default defineConfig({
  ignores: [
    'apps/cms-page-builder/public/ionicons',
    'apps/cms-api/migration/**',
  ],
  overrides: {
    yaml: {
      'yaml/flow-sequence-bracket-spacing': ['error', 'always'],
    },
  },
}, {
  files: [
    'apps/cms-admin/src/services/**',
  ],
  rules: {
    'ts/no-unused-vars': 'off',
    'ts/promise-function-async': 'off',
    'ts/no-use-before-define': 'off',
    'no-use-before-define': 'off',
  },
}, {
  files: [
    'apps/cms-admin/src/**/use*.ts?(x)',
    'apps/cms-admin/src/**/*.context.ts?(x)',
  ],
  rules: {
    'ts/explicit-module-boundary-types': 'off',
  },
}, {
  files: GLOB_TESTS,
  rules: {
    'ts/no-empty-function': 'off',
  },
})
