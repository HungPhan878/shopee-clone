/* eslint-disable prettier/prettier */
import { beforeAll, describe, expect, it } from 'vitest'

// components
import { path } from 'src/constants/auth'
import { renderWithHistory } from 'src/utils/testUtils'
import { fireEvent, screen, waitFor } from '@testing-library/react'


describe('Lỗi required từ react hook form', () => {
  let submitButton: HTMLButtonElement
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  // Giúp cho khi gọi test thì render file login một lần duy nhất
  beforeAll(async () => {
    renderWithHistory({ route: path.login })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    })

    // await logScreen()

    submitButton = document.querySelector(
      'form button[type="submit"]'
    ) as HTMLButtonElement
    emailInput = document.querySelector(
      'form input[type="email"]'
    ) as HTMLInputElement
    passwordInput = document.querySelector(
      'form input[type="password"]'
    ) as HTMLInputElement
  })

  it('Lỗi Khi không nhập gì vào form input', async () => {
    const submitButton = document.querySelector(
      'form button[type="submit"]'
    ) as HTMLElement

    // console.log(submitButton)

    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(screen.queryByText('Please Enter To The Email Field')).toBeTruthy()
      expect(
        screen.queryByText('Please Enter To The Password Field')
      ).toBeTruthy()
    })

    // await logScreen()
  })

  it('Lỗi nhập form không đúng định dạng', async () => {
    fireEvent.input(emailInput, {
      target: {
        value: 'test@'
      }
    })

    fireEvent.input(passwordInput, {
      target: {
        value: '123'
      }
    })

    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(screen.queryByText('Invalid Email')).toBeTruthy()
      expect(await screen.findByText('Length over 6 characters')).toBeTruthy()
    })
  })

  it('Không lỗi khi nhập form đúng định dạng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'hungphan@gmail.com'
      }
    })

    fireEvent.change(passwordInput, {
      target: {
        value: '789789'
      }
    })

    await waitFor(async () => {
      expect(screen.queryByText('Invalid Email')).toBeFalsy()
      expect(screen.queryByText('Length over 6 characters')).toBeFalsy()
    })

    fireEvent.submit(submitButton)

    // await logScreen()

    // Khi login thành công và hiên ra title trang chủ thì test ok.
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'Shopee Clone | Trang Chủ'
      )
    })
  })
})
