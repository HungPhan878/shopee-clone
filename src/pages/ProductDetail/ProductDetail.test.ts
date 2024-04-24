/* eslint-disable prettier/prettier */
import { delay, renderWithHistory } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'

describe('Profile detail', () => {
  it('render ui product detail page', async () => {
    // da login in test login
    renderWithHistory({
      route:
        'Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i,60afb1c56ef5b902180aacb8'
    })

    await delay(1000)

    expect(document.body).toMatchSnapshot()
    // dùng để test đoạn code có render ra đúng hay không và nếu có thay đổi sẽ phải kiểm tra lại
  })
})
