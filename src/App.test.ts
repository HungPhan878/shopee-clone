/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { screen, waitFor } from '@testing-library/react'
import { it, describe, expect } from 'vitest'

// components
import { renderWithHistory } from './utils/testUtils'
import { path } from './constants/auth'

describe('Components App', () => {
  it('render component and direction page', async () => {
    const { user } = renderWithHistory()

    // waitfor sẽ run callBack một vài lần
    //cho đến khi time out hết or expect có kết quả là true.
    //default timeout= 1000ms và interval = 50ms
    //số lần run phụ thuoc vào timout và interval

    // Chuyển trang và verify đến trang login
    await user.click(screen.getByText(/Đăng Nhập/i))

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'Shopee Clone | Đăng Nhập'
      )
    })

    // await logScreen()
    //=> ỉn ra đoạn html của app và xem component khi render có những gì
    //tham số 1 lấy ra thẻ parent html bọc quanh body
    //tham số 2 cho số dòng có thẻ hiển thị
  })

  // test chuyển hướng trang lỗi 404
  it('về trang not found', async () => {
    const badRoute = '/some/bad/route'

    renderWithHistory({ route: badRoute })

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'Not Found Page'
      )
    })
    // đã có f logScreen để test app la ok rồi
    // vừa test và render ra để xem luôn nha
    // await logScreen()
  })

  // direction about register page
  it('direction register page', async () => {
    // render thay the cho memoryRouter
    renderWithHistory({ route: path.register })

    // render(
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // )

    // await logScreen()
    waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'shopee Clone | Đăng Ký'
      )
    })
  })
})
