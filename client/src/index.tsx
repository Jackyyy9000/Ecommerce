import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import './app/layout/styles.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
