import path from 'node:path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'integration-test': path.resolve(__dirname, '.'),
    },
  },
  plugins: [
    swc.vite() as any,
  ],
  test: {
    name: 'api-integration',
    dir: __dirname,
    include: ['specs/**/*.integration.spec.ts'],
    globals: true,
    reporters: ['basic', 'html', 'json', 'junit'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/*.ts',
        'src/**/*.spec.ts',
        'src/**/*.{module,dto,ro,strategy,controller,fixture}.ts',
      ],
    },
  },
})
