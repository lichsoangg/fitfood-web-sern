import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import App from './App'
import AppProvider from './AppProvider'
import path from './constants/path'
test('renders fit-food-app', async () => {
  await act(async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
  })

  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ - Fitfood')
    },
    { timeout: '5000' }
  )
  await fireEvent.click(screen.getByTestId('button-login'))

  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập - Fitfood')
    },
    { timeout: '5000' }
  )
})

test('Render router login page', async () => {
  window.history.pushState({}, 'Test Page', path.login)
  render(<App />, { wrapper: AppProvider })
  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập - Fitfood')
    },
    { timeout: '5000' }
  )
})
