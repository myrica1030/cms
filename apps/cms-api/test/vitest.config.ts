import path from 'node:path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      test: path.resolve(__dirname, '.'),
    },
  },
  plugins: [
    swc.vite(),
  ],
  test: {
    dir: __dirname,
    include: ['specs/**/*.e2e-spec.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/*.ts',
        'src/**/*.spec.ts',
        'src/**/*.{module,dto,ro,strategy,controller,fixture}.ts',
      ],
      thresholds: {
        perFile: true,
        branches: -10,
        statements: -15,
        functions: -3,
      },
    },
  },
})
