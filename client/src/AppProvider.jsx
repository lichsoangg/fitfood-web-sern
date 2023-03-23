import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

let persistor = persistStore(store)

function AppProvider({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            {children}
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

export default AppProvider
