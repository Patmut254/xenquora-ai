import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

// Apply saved theme immediately on boot
const savedTheme = localStorage.getItem("xenq_theme") || "dark";
const themeBg = { dark: "#050816", midnight: "#000008" };
document.body.style.background = themeBg[savedTheme] || "#050816";
document.documentElement.setAttribute("data-theme", savedTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
