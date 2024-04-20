import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'

// components
import { isAxiosError, isAxiosUnproccessableEntityError } from '../utils'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
  })
})

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnproccessableEntityError', () => {
  it('isAxiosUnproccessableEntityError return boolean', () => {
    expect(
      isAxiosUnproccessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
