import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { ThemeProvider } from '@/context/ThemeProvider.tsx'
import {store} from '@/stores/store.ts'

import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
     <Provider store={store}>  
      <App />
     </Provider>
    </ThemeProvider>
  // </React.StrictMode>
)
