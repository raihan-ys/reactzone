// This file is the bridge between the component you created in the App.tsx file and the web browser.

// React
import { StrictMode } from 'react'
// React’s library to talk to web browsers (React DOM)
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>
)