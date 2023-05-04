import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './components/Util/contentProvider.tsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
     <BrowserRouter>
    <App />
     </BrowserRouter>
     </ContextProvider>
  </React.StrictMode>,
)
