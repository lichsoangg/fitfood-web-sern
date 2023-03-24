import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import App from './App'
import AppProvider from './AppProvider'
import path from './constants/path'
import { delay } from './test/utils'
test('renders fit-food-app', async () => {
  await act(async () => {
    render(<App />, { wrapper: AppProvider })
  })
  await delay(2000)
  const products = await screen.findByTestId('products')
  expect(products).toBeInTheDocument()

  await fireEvent.click(screen.getByTestId('button-login'))

  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập - Fitfood')
    },
    { timeout: '5000' }
  )
})

test('Render router login page', async () => {
  await act(async () => {
    window.history.pushState({}, 'Test Page', path.login)
    render(<App />, { wrapper: AppProvider })
  })

  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập - Fitfood')
    },
    { timeout: '5000' }
  )
})
