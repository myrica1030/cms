import defineConfig, { GLOB_TSX } from '@mutoe/eslint-config'

export default defineConfig({
  isInEditor: false,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: true,
  react: false,
  test: {
    cypress: true,
  },
  ignores: [
    'apps/cms-page-builder/public/ionicons',
    'apps/cms-admin-react',
  ],
}, {
  name: 'cms/apps-api',
  files: ['apps/cms-api/**/*.ts'],
  // @keep-sorted
  rules: {
    'camelcase': ['error', {
      // Prisma m-n connect key camelcase
      allow: [String.raw`^\S+(Id|ID|Key)_\S+(Id|ID|Key)$`],
    }],
    // Nestjs has no immediate plans to migrate to the ESM module https://github.com/nestjs/nest/pull/8736
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
}, {
  name: 'cms/apps-api/dto',
  files: ['apps/cms-api/**/*.dto.ts'],
  // @keep-sorted
  rules: {
    'ts/no-non-null-asserted-optional-chain': 'off',
  },
}, {
  name: 'cms/apps-admin',
  files: ['apps/cms-admin/**/*.ts'],
  rules: {
    'ts/no-unsafe-assignment': 'off',
  },
}, {
  name: 'cms/react-fix',
  files: [GLOB_TSX],
  rules: {
    'ts/no-misused-promises': 'off',
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
