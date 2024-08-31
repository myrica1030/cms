import type { StyleObject } from '../toStyle'
import { toStyle } from '../toStyle'

describe('# toStyle', () => {
  it('should convert style object to kebab-case from camelCase', () => {
    const styleObject: StyleObject = {
      paddingTop: '20px',
      border: '1px solid #fff',
    }

    expect(toStyle(styleObject)).toEqual('padding-top:20px;border:1px solid #fff')
  })

  it('should append "px" with number property value', () => {
    const styleObject: StyleObject = {
      paddingTop: 20,
      opacity: 1,
      top: 1,
      left: 0,
      zIndex: 0,
    }

    expect(toStyle(styleObject)).toEqual('padding-top:20px;opacity:1;top:1px;left:0;z-index:0')
  })
})
