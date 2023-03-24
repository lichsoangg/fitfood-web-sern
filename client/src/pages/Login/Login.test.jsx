import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../../App'
import AppProvider from '../../AppProvider'
import path from '../../constants/path'
import { delay } from '../../test/utils'

describe('Login', () => {
  let emailInput, passwordInput, submitButton
  beforeEach(async () => {
    await act(() => {
      window.history.pushState({}, 'Test Page', path.login)
      render(<App />, { wrapper: AppProvider })
    })
    await waitFor(
      () => {
        expect(document.querySelector('.button-accept')?.textContent).toBe('Đăng nhập')
      },
      { timeout: '5000' }
    )
    emailInput = document.querySelector('form input[name="Username"]')
    passwordInput = document.querySelector('form input[name="Password"]')
    submitButton = document.querySelector('.button-accept')
  })

  test('Invalid value', async () => {
    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: 'test@ail'
        }
      })
      fireEvent.submit(submitButton)
    })

    waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).not.toBeInTheDocument()
    })
  })
  test('Username and password is empty', async () => {
    await act(async () => {
      fireEvent.submit(submitButton)
    })
    waitFor(() => {
      expect(screen.queryByText('Email là bắt buộc')).toBeInTheDocument()
      expect(screen.queryByText('Mật khẩu là bắt buộc')).toBeInTheDocument()
    })
  })
  test('Valid Value And Login Success', async () => {
    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: 'test@gmail.com'
        }
      })
      fireEvent.change(passwordInput, {
        target: {
          value: '123123'
        }
      })
    })
    act(() => {
      fireEvent.submit(submitButton)
    })

    await delay(5000)
    const products = await screen.findByTestId('products')
    expect(products).toBeInTheDocument()
  })
})
