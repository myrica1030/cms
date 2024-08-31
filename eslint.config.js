import defineConfig, { GLOB_SRC_EXT, GLOB_TESTS, GLOB_TSX } from '@mutoe/eslint-config'

export default defineConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  ignores: [
    'apps/cms-page-builder/public/ionicons',
    'apps/cms-api/migration/**',
    'apps/cms-admin/src/services/api.ts',
  ],
  overrides: {
    yaml: {
      'yaml/flow-sequence-bracket-spacing': ['error', 'always'],
    },
  },
}, {
  files: [GLOB_TSX],
  rules: {
    'ts/no-misused-promises': 'off',
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
  files: [...GLOB_TESTS, `**/*.e2e-spec.${GLOB_SRC_EXT}`],
  languageOptions: {
    globals: {
      Cypress: true,
      cy: true,
      it: true,
      beforeEach: true,
      describe: true,
      expect: true,
    },
  },
  rules: {
    'ts/no-empty-function': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-argument': 'off',
  },
})
