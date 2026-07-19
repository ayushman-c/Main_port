import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './styles/index.css'
import App from './App'

// Set default API URL from environment variable (for Netlify/production)
const apiUrl = import.meta.env.VITE_API_URL || ''
axios.defaults.baseURL = apiUrl

// Track page visit (fire-and-forget — never blocks render)
if (import.meta.env.PROD) {
  fetch(`${apiUrl}/api/analytics/visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: window.location.pathname }),
  }).catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
