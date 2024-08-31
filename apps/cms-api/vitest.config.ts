import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    swc.vite(),
  ],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/*.ts',
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
