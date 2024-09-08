import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Router from './routes'
import { AuthProvider } from './context/AuthProvider'
console.log("hola")
console.log(import.meta.env.VITE_API_URL);
createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <Router />
  </AuthProvider>,
)

