import { act, render, screen } from '@testing-library/react'
import App from '../../App'
import AppProvider from '../../AppProvider'
import path from '../../constants/path'
import { delay } from '../../test/utils'

test('Snapshot Product Detail', async () => {
  await act(async () => {
    window.history.pushState({}, 'Test Page', `${path.menu}/FITFOOD-JUICE-SWEETIE-i-2`)
    render(<App />, { wrapper: AppProvider })
  })
  await delay(5000)
  const title = await screen.findByText('Thêm vào giỏ hàng')
  expect(title).toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})
