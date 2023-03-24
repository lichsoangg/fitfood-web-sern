import AppProvider from '../src/AppProvider'
import '../src/scss/import.scss'
import '../src/scss/reset.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => (
    <AppProvider>
      <Story />
    </AppProvider>
  )
]
