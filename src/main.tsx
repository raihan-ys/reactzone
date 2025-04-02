import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'

// We could also render this element in a mobile device using React Native library.
// We can use react to develop web, dekstop and mobile application.
createRoot(document.getElementById('root')!).render(
  // The <StrictMode> tag is used to identify potential problems.
  <StrictMode>
    <App />
  </StrictMode>
)
