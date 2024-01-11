import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './app/AppStore'
import { BrowserRouter } from 'react-router-dom'
// import { App } from '@app/'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </BrowserRouter>

  // </React.StrictMode>
)
