import path from 'node:path'
import process from 'node:process'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import type { WorkspaceSpec } from 'vitest/node'

const isCI = !!process.env.CI

class Sequencer {
  async sort(files: WorkspaceSpec[]): Promise<WorkspaceSpec[]> {
    return files.sort(([,a], [,b]) => Number.parseInt(a) - Number.parseInt(b))
  }

  async shard(files: WorkspaceSpec[]): Promise<WorkspaceSpec[]> { return files }
}

export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'integration-test': path.resolve(__dirname, '.'),
      'common': path.resolve(__dirname, '../src/_common'),
      'infra': path.resolve(__dirname, '../src/_infra'),
      'test-utils': path.resolve(__dirname, '../test-utils'),
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
    globalSetup: [path.resolve(__dirname, './setup-test.ts')],
    fileParallelism: false,
    sequence: { sequencer: Sequencer },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    reporters: isCI ? ['basic', 'json', 'junit'] : 'default',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/*.ts',
        'src/**/*.spec.ts',
        'src/**/*.fixture.ts',
      ],
    },
  },
})
