import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/** Navbar */}
      <header>
        <h1>NMS</h1>
        <p><strong>David Cañete</strong></p>
      </header>
      <div className='divisor-container'>
          <div className='left-menu'>
              <ul>
                <li>Dashboard</li>
                <li>Cerrar Sesion</li>
              </ul>
              <button className="cerrar-left-menu">
                &lt;
              </button>
          </div>
          <div className="content">
            CONTENIDO
          </div>
      </div>
    </>
  )
}

export default App
