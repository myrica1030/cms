/* eslint-disable no-console */
import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { URL } from 'node:url'
import { config } from 'dotenv-flow'

config({
  files: [path.resolve(__dirname, '../.env')],
})

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined!')
}

const databaseUrl = new URL(process.env.DATABASE_URL)
if (!databaseUrl.pathname.endsWith('_test')) {
  databaseUrl.pathname += '_test'
}

process.env.DATABASE_URL = databaseUrl.toString()
process.env.APP_SECRET = 'secret'

async function execute(cmd: string, stdout: boolean = false) {
  return await new Promise((resolve, reject) => {
    const stream = spawn(cmd, {
      shell: true,
      cwd: path.resolve(__dirname, '..'),
      env: { ...process.env },
    })
    if (stdout) stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stderr)
    stream.on('close', code => {
      if (code === 0) resolve(code)
      // eslint-disable-next-line prefer-promise-reject-errors
      else reject()
    })
  })
}

export default async function setup() {
  console.time('Testing database is ready!')
  console.log(`Preparing reset testing database... (${databaseUrl.toString()})`)
  await execute('pnpm prisma migrate reset --force')
  console.log(`Preparing insert example data...`)
  await execute('pnpm db:seed-example')
  console.timeEnd(`Testing database is ready!`)
  console.log('')
}
