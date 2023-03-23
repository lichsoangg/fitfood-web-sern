import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import App from './App'
import AppProvider from './AppProvider'
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
  await fireEvent.click(screen.getByTestId('button-shopping'))

  await waitFor(
    () => {
      expect(document.querySelector('title')?.textContent).toBe('Đặt món - Fitfood')
    },
    { timeout: '5000' }
  )
  screen.debug(document.body.parentElement, 999999999)
})
