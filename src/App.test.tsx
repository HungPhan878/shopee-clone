/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { expect, test, describe } from 'vitest'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

// components
import App from './App'
import { logScreen } from './utils/testUtils'

// expect.extend(matchers)

describe('Components App', () => {
  test('render component and direction page', async () => {
    const user = userEvent.setup()

    render(<App />, {
      wrapper: BrowserRouter
      //dùng để bọc quanh app để test không xảy ra lỗi khi useRoute nằm bên ngoài browserRouter khi test app đọc lâp nữa
    })

    // waitfor sẽ run callBack một vài lần
    //cho đến khi time out hết or expect có kết quả là true.
    //default timeout= 1000ms và interval = 50ms
    //số lần run phụ thuoc vào timout và interval 

    // chờ cho component render hết thì mới xuất ra html của app
    // waitFor(() => {
    //   expect(document.querySelector('title')?.textContent).toBe(
    //     'Shopee Clone | Hùng Dev'
    //   )
    // })

    // Chuyển trang và verify đến trang login
    await user.click(screen.getByText(/Đăng Nhập/i))

    // waitFor(() => {
    //   // expect(
    //   //   screen.queryByText('Are you new know to shopee?')
    //   // ).toBeInTheDocument()

    //   expect(document.querySelector('title')?.textContent).toBe(
    //     'Shopee Clone | Đăng Nhập'
    //   )
    // })

    await logScreen()
    //=> ỉn ra đoạn html của app và xem component khi render có những gì
    //tham số 1 lấy ra thẻ parent html bọc quanh body
    //tham số 2 cho số dòng có thẻ hiển thị
  })

  // test chuyển hướng trang lỗi 404
  test('về trang not found', async () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )

    //  waitFor(() => {
    //   expect(
    //     screen.getByText(/The stuff you were looking for does not exist/i)
    //   ).toBeIntheDocument()
    // })

    // screen.debug(document.body.parentElement as HTMLElement, 999999999)

    await logScreen()
  })
})
