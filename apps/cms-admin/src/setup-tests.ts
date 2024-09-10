/* eslint-disable ts/no-unsafe-return */
import { configure, prettyDOM } from '@testing-library/vue'
import { expect, vi } from 'vitest'
import * as matchers from 'vitest-dom/matchers'
import { mockDeep } from 'vitest-mock-extended'
import 'vitest-dom/extend-expect'

expect.extend(matchers)

vi.mock('@/client', () => mockDeep<any>())

configure(config => {
  config.throwSuggestions = true
  config.defaultIgnore = 'script, style, svg'

  config.getElementError = (message, container) => {
    let prettifiedDOM = prettyDOM(container, Number.MAX_SAFE_INTEGER) as string
    prettifiedDOM = prettifiedDOM
      .split('\n')
      // eslint-disable-next-line no-control-regex
      .map(line => line.replaceAll(/(?:\s|\[\d+m|)+$/g, ''))
      .filter(Boolean)
      .join('\n')
    const error = new Error([
      message,
      `Ignored nodes: comments, ${config.defaultIgnore}\n${prettifiedDOM}`,
    ].filter(Boolean).join('\n\n'))
    error.name = 'TestingLibraryElementError'
    return error
  }
  return config
})
