import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Router from './routes'

createRoot(document.getElementById('root')).render(
  <Router/>,
)

