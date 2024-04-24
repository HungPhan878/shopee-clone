/* eslint-disable prettier/prettier */
import { waitFor } from '@testing-library/react'
import { path } from 'src/constants/auth'
import { access_token } from 'src/msw/auth.msw'
import authLS from 'src/utils/auth'
import { renderWithHistory } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'

describe('Profile', () => {
  it('Hiển thị trang Profile', async () => {
    authLS.setAccessTokenToLs(access_token)
    const { container } = renderWithHistory({ route: path.profile })

    await waitFor(() => {
      expect(
        (
          container.querySelector(
            'form input[placeholder="Tên"]'
          ) as HTMLInputElement
        ).value
      ).toBe('Rich Grimers 8')
      //vì khi đăng nhập thành công sẽ gọi đến api getUser me và
      //trong mock api ta trả về meRes có name Rich Grimers 8
      //=>nên ta so sánh với name luôn
    })
  })
})
